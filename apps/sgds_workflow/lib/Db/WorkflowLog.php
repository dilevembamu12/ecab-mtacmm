<?php

declare(strict_types=1);

namespace OCA\SgdsWorkflow\Db;

use OCP\AppFramework\Db\Entity;

/**
 * Audit trail — records every workflow state transition.
 *
 * @method int getId()
 * @method int getDossierId()
 * @method string getFromStatus()
 * @method string getToStatus()
 * @method string getActorUserId()
 * @method string getActorRole()
 * @method string getComment()
 * @method string getGrillePilier()  JSON: scores 4 piliers
 * @method string getCreatedAt()
 */
class WorkflowLog extends Entity
{
    protected int $dossierId = 0;
    protected string $fromStatus = '';
    protected string $toStatus = '';
    protected string $actorUserId = '';
    protected string $actorRole = '';
    protected string $comment = '';
    protected ?string $grillePilier = null;
    protected string $createdAt = '';

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('dossierId', 'integer');
    }

    /**
     * Get grille scores as array: [opportunite, conformite, forme, fond]
     */
    public function getGrilleScores(): array
    {
        if (empty($this->grillePilier)) {
            return [];
        }
        return json_decode($this->grillePilier, true) ?: [];
    }
}
