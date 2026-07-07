<?php

declare(strict_types=1);

namespace OCA\SgdsWorkflow\Service;

use OCA\SgdsDossier\Db\Dossier;
use OCP\IUserSession;
use Psr\Log\LoggerInterface;

/**
 * Workflow engine — manages the state machine for dossier validation.
 *
 * States:
 *   BROUILLON → SOUMIS → EXAMEN_FORME → ANALYSE_FOND → AVIS_FAVORABLE/AVIS_DEFAVORABLE
 *   → PRET_VISA → VISE → SIGNE
 */
class WorkflowService
{
    /** Maps each state to the actor (Pôle 5 role) responsible for the next action */
    private const STATE_ACTORS = [
        Dossier::STATUS_SOUMIS => 'assistante.cab',
        Dossier::STATUS_EXAMEN_FORME => 'attache.cab',
        Dossier::STATUS_ANALYSE_FOND => 'conseiller.caj',
        Dossier::STATUS_AVIS_FAVORABLE => 'dircab',
        Dossier::STATUS_AVIS_DEFAVORABLE => 'dircab',
        Dossier::STATUS_PRET_VISA => 'dircab',
        Dossier::STATUS_VISE => 'ministre',
    ];

    /** Allowed transitions from each state */
    private const TRANSITIONS = [
        Dossier::STATUS_BROUILLON => [Dossier::STATUS_SOUMIS],
        Dossier::STATUS_SOUMIS => [Dossier::STATUS_EXAMEN_FORME, Dossier::STATUS_REJETE],
        Dossier::STATUS_EXAMEN_FORME => [Dossier::STATUS_ANALYSE_FOND, Dossier::STATUS_REJETE],
        Dossier::STATUS_ANALYSE_FOND => [Dossier::STATUS_AVIS_FAVORABLE, Dossier::STATUS_AVIS_DEFAVORABLE, Dossier::STATUS_REJETE],
        Dossier::STATUS_AVIS_FAVORABLE => [Dossier::STATUS_PRET_VISA, Dossier::STATUS_REJETE],
        Dossier::STATUS_AVIS_DEFAVORABLE => [Dossier::STATUS_BROUILLON, Dossier::STATUS_REJETE],
        Dossier::STATUS_PRET_VISA => [Dossier::STATUS_VISE, Dossier::STATUS_REJETE],
        Dossier::STATUS_VISE => [Dossier::STATUS_SIGNE, Dossier::STATUS_REJETE],
    ];

    /** The 4 pillars of the validation grid */
    public const PILIERS = ['opportunite', 'conformite', 'forme', 'fond'];

    public function __construct(
        private LoggerInterface $logger,
        private IUserSession $userSession,
    ) {
    }

    /**
     * Transition a dossier to a new status
     *
     * @param array|object $dossier Associative array or Dossier entity
     * @throws \InvalidArgumentException if the transition is not allowed
     */
    public function transition(array|object $dossier, string $newStatus, string $comment = '', ?array $grilleScores = null): array
    {
        $fromStatus = is_array($dossier) ? ($dossier['status'] ?? '') : $dossier->getStatus();

        // Validate transition
        if (!$this->isTransitionAllowed($fromStatus, $newStatus)) {
            throw new \InvalidArgumentException(
                "Transition non autorisée: $fromStatus → $newStatus"
            );
        }

        // Validate grille for AVIS_FORME and ANALYSE_FOND steps
        if (in_array($newStatus, [Dossier::STATUS_AVIS_FAVORABLE, Dossier::STATUS_AVIS_DEFAVORABLE])) {
            if ($grilleScores === null) {
                throw new \InvalidArgumentException('La grille des 4 piliers est obligatoire pour émettre un avis');
            }
            foreach (self::PILIERS as $pilier) {
                if (!isset($grilleScores[$pilier])) {
                    throw new \InvalidArgumentException("Le pilier '$pilier' est requis");
                }
            }
        }

        $user = $this->userSession->getUser();
        $actorId = $user ? $user->getUID() : 'system';

        return [
            'dossierId' => is_array($dossier) ? ($dossier['id'] ?? 0) : $dossier->getId(),
            'fromStatus' => $fromStatus,
            'toStatus' => $newStatus,
            'actorUserId' => $actorId,
            'comment' => $comment,
            'grilleScores' => $grilleScores,
            'timestamp' => date('c'),
        ];
    }

    /**
     * Check if a transition is allowed
     */
    public function isTransitionAllowed(string $fromStatus, string $toStatus): bool
    {
        return isset(self::TRANSITIONS[$fromStatus])
            && in_array($toStatus, self::TRANSITIONS[$fromStatus], true);
    }

    /**
     * Get the next possible states from a given state
     */
    public function getNextStates(string $currentStatus): array
    {
        return self::TRANSITIONS[$currentStatus] ?? [];
    }

    /**
     * Get the actor responsible for a given state
     */
    public function getActorForState(string $status): ?string
    {
        return self::STATE_ACTORS[$status] ?? null;
    }

    /**
     * Get all states with their labels
     */
    public function getAllStates(): array
    {
        return Dossier::getStatusLabels();
    }
}
