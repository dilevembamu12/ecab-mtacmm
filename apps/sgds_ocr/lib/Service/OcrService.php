<?php

declare(strict_types=1);

namespace OCA\SgdsOcr\Service;

use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\IDBConnection;
use OCP\IUserSession;
use Psr\Log\LoggerInterface;

/**
 * OCR and automatic document indexing service for e-Cabinet MTACMM.
 *
 * Circuit complet :
 * 1. Scan/upload document → OCR extraction texte + métadonnées
 * 2. Classification automatique du type de document
 * 3. Création automatique d'un dossier BROUILLON dans le circuit Pôle 5
 * 4. Indexation plein texte pour recherche
 */
class OcrService
{
    /** Confidence threshold for automatic classification */
    private const MIN_CONFIDENCE = 60;

    /** Patterns for document type detection */
    private const TYPE_PATTERNS = [
        'arrete' => ['/arrêté/i', '/portant nomination/i', '/portant création/i'],
        'courrier_arrivee' => ['/courrier\s+(n°|no)\s*\d/i', '/transmis pour/i', '/soumis à/i'],
        'rapport' => ['/rapport\s+(annuel|d\'activit|final)/i', '/période\s+(du|allant)/i'],
        'contrat' => ['/contrat/i', '/marché\s+public/i', '/montant\s+(de|du\s+marché)/i', '/cocontractant/i'],
        'decision' => ['/décision\s+n°/i', '/le\s+ministre\s+décide/i'],
        'proces_verbal' => ['/procès.verbal/i', '/réunion\s+(du|tenue)/i'],
    ];

    public function __construct(
        private IDBConnection $db,
        private IRootFolder $rootFolder,
        private IUserSession $userSession,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Process a file with OCR and extract metadata.
     *
     * @param int $fileId The Nextcloud file ID
     * @param string $userId Owner of the file
     * @return array OCR results with extracted metadata
     */
    public function processFile(int $fileId, string $userId): array
    {
        $userFolder = $this->rootFolder->getUserFolder($userId);

        try {
            $nodes = $userFolder->getById($fileId);
            if (empty($nodes)) {
                throw new NotFoundException("File #$fileId not found");
            }
            $file = $nodes[0];
        } catch (NotFoundException $e) {
            throw new \RuntimeException("Fichier #$fileId introuvable: " . $e->getMessage());
        }

        $mimeType = $file->getMimeType();
        $path = $file->getStorage()->getLocalFile($file->getInternalPath());

        if (!$path || !file_exists($path)) {
            throw new \RuntimeException("Fichier inaccessible: " . $file->getName());
        }

        // Extract text via OCR
        $extractedText = $this->runOcr($path, $mimeType);

        if (empty($extractedText)) {
            return ['status' => 'no_text', 'fileId' => $fileId, 'message' => 'Aucun texte extractible'];
        }

        // Extract metadata from text
        $metadata = $this->extractMetadata($extractedText);

        // Auto-classify document type
        $documentType = $this->classifyDocument($extractedText);

        // Save extracted metadata
        $this->saveOcrResult($fileId, $extractedText, $metadata, $documentType);

        // e-Cabinet: Auto-create dossier BROUILLON in the Pôle 5 circuit
        $dossierId = $this->autoCreateDossier($fileId, $userId, $file, $metadata, $documentType);

        $this->logger->info("OCR processed file #$fileId — type: $documentType — dossier #$dossierId");

        return [
            'status' => 'ok',
            'fileId' => $fileId,
            'fileName' => $file->getName(),
            'documentType' => $documentType,
            'dossierId' => $dossierId,
            'confidence' => $metadata['confidence'] ?? 0,
            'extracted' => $metadata,
            'textLength' => mb_strlen($extractedText),
        ];
    }

    /**
     * Run OCR on a file using Tesseract.
     */
    private function runOcr(string $path, string $mimeType): string
    {
        // For PDFs, convert to images first
        if ($mimeType === 'application/pdf') {
            return $this->ocrPdf($path);
        }

        // For images, run Tesseract directly
        if (str_starts_with($mimeType, 'image/')) {
            return $this->ocrImage($path);
        }

        // For text-based files, read directly
        return file_get_contents($path) ?: '';
    }

    private function ocrImage(string $imagePath): string
    {
        $outputFile = tempnam(sys_get_temp_dir(), 'ocr_') . '.txt';

        // Tesseract with French language
        $cmd = sprintf(
            'tesseract %s %s -l fra 2>/dev/null',
            escapeshellarg($imagePath),
            escapeshellarg(str_replace('.txt', '', $outputFile))
        );

        exec($cmd, $output, $exitCode);

        if ($exitCode !== 0 || !file_exists($outputFile)) {
            return '';
        }

        $text = file_get_contents($outputFile) ?: '';
        @unlink($outputFile);
        @unlink(str_replace('.txt', '.txt', $outputFile) . '.pdf'); // Tesseract sometimes creates a PDF too

        return trim($text);
    }

    private function ocrPdf(string $pdfPath): string
    {
        $text = '';
        $tmpDir = sys_get_temp_dir() . '/ocr_pdf_' . uniqid();
        @mkdir($tmpDir, 0777, true);

        // Convert PDF pages to images using pdftoppm (poppler-utils)
        $cmd = sprintf(
            'pdftoppm -png -r 300 %s %s/page 2>/dev/null',
            escapeshellarg($pdfPath),
            escapeshellarg($tmpDir)
        );
        exec($cmd, $output, $exitCode);

        $images = glob($tmpDir . '/page-*.png');
        if (empty($images)) {
            // Fallback: try with different naming
            $images = glob($tmpDir . '/page*.png');
        }

        foreach ($images as $image) {
            $pageText = $this->ocrImage($image);
            if ($pageText) {
                $text .= $pageText . "\n";
            }
            @unlink($image);
        }

        @rmdir($tmpDir);
        return trim($text);
    }

    /**
     * Extract structured metadata from OCR'd text.
     */
    private function extractMetadata(string $text): array
    {
        $metadata = [];
        $confidence = 0;
        $matches = 0;

        // Extract N° enregistrement
        if (preg_match('/(?:N°|Numéro|Ref)\s*(?:d\'enregistrement)?\s*[:.]?\s*([A-Z0-9\/-]{3,30})/i', $text, $m)) {
            $metadata['numero_enregistrement'] = trim($m[1]);
            $matches++;
        }

        // Extract date
        if (preg_match('/(\d{1,2}\s+(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+\d{4})/i', $text, $m)) {
            $metadata['date_document'] = $m[1];
            $matches++;
        } elseif (preg_match('/(\d{2}\/\d{2}\/\d{4})/', $text, $m)) {
            $metadata['date_document'] = $m[1];
            $matches++;
        }

        // Extract expéditeur/émetteur
        if (preg_match('/(?:Émetteur|Expéditeur|De|From)\s*[:.]?\s*([A-ZÉÈÊËÀÂÎÏÔÖÙÛÜÇ][\w\séèêëàâîïôöùûüç\'\-]{5,60})/i', $text, $m)) {
            $metadata['emetteur'] = trim($m[1]);
            $matches++;
        }

        // Extract objet
        if (preg_match('/(?:Objet|Concerne)\s*[:.]?\s*(.{10,200})/i', $text, $m)) {
            $metadata['objet'] = trim($m[1]);
            $matches++;
        }

        // Extract montant (for contracts)
        if (preg_match('/(?:Montant|Budget)\s*[:.]?\s*(\d[\d\s]*)\s*(FCFA|XAF|€)?/i', $text, $m)) {
            $metadata['montant'] = trim(str_replace(' ', '', $m[1])) . ($m[2] ?? '');
            $matches++;
        }

        // Extract N° arrêté
        if (preg_match('/(?:Arrêté)\s*(?:N°|n°|no)\s*(\d{2,6}\s*\/\s*[A-Z]{2,6})/i', $text, $m)) {
            $metadata['numero_arrete'] = trim($m[1]);
            $matches++;
        }

        // Extract référence
        if (preg_match('/(?:Réf|Référence|V\/Réf)\s*[:.]?\s*([A-Z0-9\/-]{5,30})/i', $text, $m)) {
            $metadata['reference'] = trim($m[1]);
            $matches++;
        }

        $confidence = min(100, $matches * 25);

        $metadata['confidence'] = $confidence;
        $metadata['mots_cles'] = $this->extractKeywords($text);

        return $metadata;
    }

    /**
     * Auto-classify document type based on text patterns.
     */
    private function classifyDocument(string $text): string
    {
        $bestType = 'courrier_arrivee';
        $bestScore = 0;

        foreach (self::TYPE_PATTERNS as $type => $patterns) {
            $score = 0;
            foreach ($patterns as $pattern) {
                if (preg_match($pattern, $text)) {
                    $score += 1;
                }
            }
            if ($score > $bestScore) {
                $bestScore = $score;
                $bestType = $type;
            }
        }

        return $bestType;
    }

    /**
     * Extract keywords from text.
     */
    private function extractKeywords(string $text): string
    {
        // Stop words in French
        $stopWords = ['le', 'la', 'les', 'de', 'du', 'des', 'et', 'un', 'une', 'à', 'au', 'aux',
            'pour', 'par', 'dans', 'sur', 'avec', 'sans', 'est', 'sont', 'que', 'qui', 'pas', 'ce',
            'en', 'se', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'leur', 'leurs'];

        $words = preg_split('/\s+/', mb_strtolower($text));
        $words = array_filter($words, fn($w) => mb_strlen($w) > 3 && !in_array($w, $stopWords));
        $freq = array_count_values($words);
        arsort($freq);

        return implode(', ', array_slice(array_keys($freq), 0, 10));
    }

    /**
     * Save OCR results to database.
     */
    private function saveOcrResult(int $fileId, string $extractedText, array $metadata, string $documentType): void
    {
        $qb = $this->db->getQueryBuilder();

        // Check if an OCR result already exists
        $qb->select('id')->from('sgds_ocr_results')
            ->where($qb->expr()->eq('file_id', $qb->createNamedParameter($fileId)));
        $existing = $qb->executeQuery()->fetchOne();

        if ($existing) {
            $qb = $this->db->getQueryBuilder();
            $qb->update('sgds_ocr_results')
                ->set('extracted_text', $qb->createNamedParameter($extractedText))
                ->set('metadata_json', $qb->createNamedParameter(json_encode($metadata, JSON_UNESCAPED_UNICODE)))
                ->set('document_type', $qb->createNamedParameter($documentType))
                ->set('confidence', $qb->createNamedParameter($metadata['confidence'] ?? 0))
                ->where($qb->expr()->eq('id', $qb->createNamedParameter($existing)))
                ->executeStatement();
        } else {
            $qb = $this->db->getQueryBuilder();
            $qb->insert('sgds_ocr_results')->values([
                'file_id' => $qb->createNamedParameter($fileId),
                'extracted_text' => $qb->createNamedParameter($extractedText),
                'metadata_json' => $qb->createNamedParameter(json_encode($metadata, JSON_UNESCAPED_UNICODE)),
                'document_type' => $qb->createNamedParameter($documentType),
                'confidence' => $qb->createNamedParameter($metadata['confidence'] ?? 0),
            ])->executeStatement();
        }
    }

    /**
     * e-Cabinet: Crée automatiquement un dossier BROUILLON dans le circuit Pôle 5.
     *
     * Utilise le service sgds_dossier pour créer un dossier avec le document OCR.
     */
    private function autoCreateDossier(int $fileId, string $userId, $file, array $metadata, string $documentType): int
    {
        try {
            // Build dossier title from OCR metadata
            $titre = $metadata['objet'] 
                ?? $metadata['numero_enregistrement'] 
                ?? $file->getName();
            
            // Map OCR document type to dossier category
            $categories = [
                'arrete' => 'Arrêté',
                'courrier_arrivee' => 'Courrier arrivée',
                'rapport' => 'Rapport',
                'contrat' => 'Marché/Contrat',
                'decision' => 'Décision',
                'proces_verbal' => 'Procès-verbal',
            ];
            $categorie = $categories[$documentType] ?? 'Courrier arrivée';

            // Build description from extracted metadata
            $descriptionParts = [];
            if (!empty($metadata['emetteur'])) {
                $descriptionParts[] = "Émetteur : {$metadata['emetteur']}";
            }
            if (!empty($metadata['date_document'])) {
                $descriptionParts[] = "Date : {$metadata['date_document']}";
            }
            if (!empty($metadata['numero_enregistrement'])) {
                $descriptionParts[] = "N° enregistrement : {$metadata['numero_enregistrement']}";
            }
            if (!empty($metadata['montant'])) {
                $descriptionParts[] = "Montant : {$metadata['montant']}";
            }
            $description = !empty($descriptionParts) 
                ? implode(" | ", $descriptionParts) 
                : "Document indexé automatiquement via OCR";

            // Create dossier via direct DB insert (sgds_dossier table)
            $dossierId = $this->createDossierInDb($titre, $categorie, $description, $userId, $fileId);

            $this->logger->info("e-Cabinet: Dossier BROUILLON #$dossierId créé automatiquement pour le fichier #$fileId");
            
            return $dossierId;
        } catch (\Throwable $e) {
            $this->logger->error("e-Cabinet: Échec création auto dossier: " . $e->getMessage(), ['exception' => $e]);
            return 0;
        }
    }

    /**
     * Insert a new dossier directly into the sgds_dossier database table.
     */
    private function createDossierInDb(string $titre, string $categorie, string $description, string $userId, int $fileId): int
    {
        $now = (new \DateTime())->format('Y-m-d H:i:s');
        $numeroDossier = 'SGDS-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -6));

        $qb = $this->db->getQueryBuilder();
        $qb->insert('sgds_dossier')->values([
            'numero_dossier' => $qb->createNamedParameter($numeroDossier),
            'titre' => $qb->createNamedParameter($titre),
            'categorie' => $qb->createNamedParameter($categorie),
            'description' => $qb->createNamedParameter($description),
            'statut' => $qb->createNamedParameter('BROUILLON'),
            'createur_id' => $qb->createNamedParameter($userId),
            'date_creation' => $qb->createNamedParameter($now),
            'date_modification' => $qb->createNamedParameter($now),
        ])->executeStatement();

        $dossierId = (int) $qb->getConnection()->lastInsertId();

        // Link file to dossier
        $qb = $this->db->getQueryBuilder();
        $qb->insert('sgds_dossier_file')->values([
            'dossier_id' => $qb->createNamedParameter($dossierId),
            'file_id' => $qb->createNamedParameter($fileId),
            'role' => $qb->createNamedParameter('DOCUMENT_PRINCIPAL'),
        ])->executeStatement();

        return $dossierId;
    }
}
