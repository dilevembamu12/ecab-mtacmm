<?php

declare(strict_types=1);

namespace OCA\SgdsMetadata\Service;

use OCP\IUserSession;
use Psr\Log\LoggerInterface;
use OCA\SgdsMetadata\Db\MetadataSchema;
use OCA\SgdsMetadata\Db\MetadataSchemaMapper;
use OCA\SgdsMetadata\Db\MetadataValue;
use OCA\SgdsMetadata\Db\MetadataValueMapper;

class MetadataService
{
    public function __construct(
        private MetadataSchemaMapper $schemaMapper,
        private MetadataValueMapper $valueMapper,
        private LoggerInterface $logger,
        private IUserSession $userSession,
    ) {
    }

    /**
     * Get all schema fields for a document type
     *
     * @return MetadataSchema[]
     */
    public function getSchema(string $documentType): array
    {
        return $this->schemaMapper->findByDocumentType($documentType);
    }

    /**
     * Get all schemas grouped by document type
     *
     * @return array<string, MetadataSchema[]>
     */
    public function getAllSchemas(): array
    {
        return $this->schemaMapper->findAllGrouped();
    }

    /**
     * Get all metadata values for a file, merged with schema info
     */
    public function getFileMetadata(int $fileId): array
    {
        $values = $this->valueMapper->findByFileId($fileId);
        $result = [];

        foreach ($values as $value) {
            $result[] = [
                'id' => $value->getId(),
                'fileId' => $value->getFileId(),
                'schemaId' => $value->getSchemaId(),
                'value' => $value->getValue(),
                'fieldName' => $value->getFieldName() ?? '',
                'fieldLabel' => $value->getFieldLabel() ?? '',
                'fieldType' => $value->getFieldType() ?? 'text',
                'documentType' => $value->getDocumentType() ?? '',
                'updatedAt' => $value->getUpdatedAt(),
            ];
        }

        return $result;
    }

    /**
     * Save or update a metadata value for a file
     */
    public function saveValue(int $fileId, int $schemaId, ?string $value): MetadataValue
    {
        $existing = $this->valueMapper->findByFileAndSchema($fileId, $schemaId);

        if ($existing !== null) {
            $existing->setValue($value ?? '');
            $existing->setUpdatedAt(date('Y-m-d H:i:s'));
            return $this->valueMapper->update($existing);
        }

        $metadataValue = new MetadataValue();
        $metadataValue->setFileId($fileId);
        $metadataValue->setSchemaId($schemaId);
        $metadataValue->setValue($value ?? '');
        $metadataValue->setUpdatedAt(date('Y-m-d H:i:s'));
        return $this->valueMapper->insert($metadataValue);
    }

    /**
     * Batch save metadata for a file (from form submission)
     *
     * @param array<int, string> $values [schemaId => value]
     */
    public function saveMultipleValues(int $fileId, array $values): array
    {
        $results = [];
        foreach ($values as $schemaId => $value) {
            $results[] = $this->saveValue($fileId, (int)$schemaId, $value);
        }
        return $results;
    }

    /**
     * Delete all metadata for a file
     */
    public function deleteFileMetadata(int $fileId): void
    {
        $this->valueMapper->deleteByFileId($fileId);
    }

    /**
     * Create a new schema field definition
     */
    public function createSchemaField(
        string $documentType,
        string $fieldName,
        string $fieldLabel,
        string $fieldType = 'text',
        int $sortOrder = 0,
        bool $required = false,
        ?array $options = null,
    ): MetadataSchema {
        $schema = new MetadataSchema();
        $schema->setDocumentType($documentType);
        $schema->setFieldName($fieldName);
        $schema->setFieldLabel($fieldLabel);
        $schema->setFieldType($fieldType);
        $schema->setSortOrder($sortOrder);
        $schema->setRequired($required);
        $schema->setOptions($options ? json_encode($options) : '');
        $schema->setCreatedAt(date('Y-m-d H:i:s'));

        return $this->schemaMapper->insert($schema);
    }

    /**
     * Initialize default schema fields for all document types
     */
    public function initDefaultSchemas(): array
    {
        $results = [];

        // Common fields for ALL document types
        $commonFields = [
            ['numero_enregistrement', 'N° Enregistrement', 'text', true],
            ['date_document', 'Date du Document', 'date', true],
            ['emetteur', 'Émetteur', 'text', true],
            ['destinataire', 'Destinataire', 'text', false],
            ['objet', 'Objet', 'text', true],
            ['priorite', 'Priorité', 'select', true, ['Normale', 'Urgente', 'Très Urgente']],
            ['statut_traitement', 'Statut', 'select', true, ['Brouillon', 'Soumis', 'En Cours', 'Validé', 'Rejeté']],
            ['mots_cles', 'Mots-clés', 'text', false],
        ];

        // Additional fields per document type
        $specificFields = [
            'courrier_arrivee' => [
                ['date_arrivee', "Date d'Arrivée", 'date', true],
                ['reference_expediteur', 'Réf. Expéditeur', 'text', false],
                ['service_destine', 'Service Destinataire', 'select', false, ['Cabinet', 'DEP', 'RLI', 'DIRCOOP', 'DCO', 'CAJ']],
            ],
            'courrier_depart' => [
                ['reference', 'Référence', 'text', true],
                ['signataire', 'Signataire', 'text', true],
            ],
            'arrete' => [
                ['numero_arrete', "N° Arrêté", 'text', true],
                ['date_signature', 'Date Signature', 'date', false],
                ['autorite_signataire', 'Autorité Signataire', 'text', true],
            ],
            'contrat' => [
                ['montant', 'Montant (FCFA)', 'number', false],
                ['date_debut', 'Date Début', 'date', false],
                ['date_fin', 'Date Fin', 'date', false],
                ['cocontractant', 'Cocontractant', 'text', true],
            ],
            'rapport' => [
                ['periode_debut', 'Période Début', 'date', false],
                ['periode_fin', 'Période Fin', 'date', false],
                ['redacteur', 'Rédacteur', 'user', false],
            ],
        ];

        foreach (MetadataSchema::getDocumentTypes() as $typeKey => $typeLabel) {
            $order = 0;

            // Add common fields
            foreach ($commonFields as $field) {
                try {
                    $results[] = $this->createSchemaField(
                        $typeKey, $field[0], $field[1], $field[2],
                        $order++, $field[3], $field[4] ?? null
                    );
                } catch (\Exception $e) {
                    $this->logger->warning('Schema already exists: ' . $field[0] . ' for ' . $typeKey);
                }
            }

            // Add type-specific fields
            if (isset($specificFields[$typeKey])) {
                foreach ($specificFields[$typeKey] as $field) {
                    try {
                        $results[] = $this->createSchemaField(
                            $typeKey, $field[0], $field[1], $field[2],
                            $order++, $field[3], $field[4] ?? null
                        );
                    } catch (\Exception $e) {
                        $this->logger->warning('Schema already exists: ' . $field[0] . ' for ' . $typeKey);
                    }
                }
            }
        }

        return $results;
    }
}
