<?php

declare(strict_types=1);

namespace OCA\SgdsGrille\Service;

use OCP\IDBConnection;
use OCP\IUserSession;
use Psr\Log\LoggerInterface;

/**
 * Manages the 4-pillar evaluation grid for dossier validation.
 */
class GrilleService
{
    /** Max score per pillar */
    public const MAX_SCORE = 5;

    /** Pillars with their labels and weights */
    public const PILIERS = [
        'opportunite' => ['label' => 'Opportunité', 'weight' => 30, 'description' => "Pertinence, urgence et priorité du document"],
        'conformite' => ['label' => 'Conformité', 'weight' => 30, 'description' => "Respect des textes légaux et réglementaires"],
        'forme' => ['label' => 'Forme', 'weight' => 20, 'description' => "Rédaction, orthographe, structure, protocole"],
        'fond' => ['label' => 'Fond', 'weight' => 20, 'description' => "Exactitude technique, cohérence des données"],
    ];

    public function __construct(
        private IDBConnection $db,
        private LoggerInterface $logger,
        private IUserSession $userSession,
    ) {
    }

    /**
     * Save a grille evaluation
     */
    public function saveEvaluation(
        int $dossierId,
        array $scores,
        array $commentaires,
        string $recommandation
    ): array {
        // Validate scores
        foreach (array_keys(self::PILIERS) as $pilier) {
            if (!isset($scores[$pilier]) || $scores[$pilier] < 0 || $scores[$pilier] > self::MAX_SCORE) {
                throw new \InvalidArgumentException("Score '$pilier' invalide (0-" . self::MAX_SCORE . ")");
            }
            if (empty($commentaires[$pilier] ?? '')) {
                throw new \InvalidArgumentException("Le commentaire pour '$pilier' est obligatoire");
            }
        }

        $user = $this->userSession->getUser();
        $actorId = $user ? $user->getUID() : 'system';

        // Compute weighted score
        $scorePondere = $this->computeWeightedScore($scores);

        $qb = $this->db->getQueryBuilder();
        $qb->insert('sgds_grille_pilier')
            ->values([
                'dossier_id' => $qb->createNamedParameter($dossierId),
                'actor_user_id' => $qb->createNamedParameter($actorId),
                'score_opportunite' => $qb->createNamedParameter($scores['opportunite']),
                'commentaire_opportunite' => $qb->createNamedParameter($commentaires['opportunite']),
                'score_conformite' => $qb->createNamedParameter($scores['conformite']),
                'commentaire_conformite' => $qb->createNamedParameter($commentaires['conformite']),
                'score_forme' => $qb->createNamedParameter($scores['forme']),
                'commentaire_forme' => $qb->createNamedParameter($commentaires['forme']),
                'score_fond' => $qb->createNamedParameter($scores['fond']),
                'commentaire_fond' => $qb->createNamedParameter($commentaires['fond']),
                'recommandation' => $qb->createNamedParameter($recommandation),
            ])
            ->executeStatement();

        $id = $qb->getLastInsertId();

        $this->logger->info("Grille enregistrée: dossier=$dossierId, score=$scorePondere/20, reco=$recommandation");

        return [
            'id' => $id,
            'dossierId' => $dossierId,
            'scores' => $scores,
            'scorePondere' => $scorePondere,
            'recommandation' => $recommandation,
            'actorId' => $actorId,
        ];
    }

    /**
     * Get all evaluations for a dossier
     */
    public function getEvaluations(int $dossierId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from('sgds_grille_pilier')
            ->where($qb->expr()->eq('dossier_id', $qb->createNamedParameter($dossierId)))
            ->orderBy('created_at', 'ASC');

        $result = $qb->executeQuery();
        $rows = $result->fetchAllAssociative();
        $result->closeCursor();

        return array_map(function ($row) {
            $row['score_pondere'] = $this->computeWeightedScore([
                'opportunite' => (int)$row['score_opportunite'],
                'conformite' => (int)$row['score_conformite'],
                'forme' => (int)$row['score_forme'],
                'fond' => (int)$row['score_fond'],
            ]);
            return $row;
        }, $rows);
    }

    /**
     * Compute the weighted score (out of 20)
     */
    public function computeWeightedScore(array $scores): float
    {
        $total = 0;
        $maxTotal = 0;
        foreach (self::PILIERS as $key => $config) {
            $total += ($scores[$key] ?? 0) * $config['weight'];
            $maxTotal += self::MAX_SCORE * $config['weight'];
        }
        return $maxTotal > 0 ? round(($total / $maxTotal) * 20, 1) : 0;
    }
}
