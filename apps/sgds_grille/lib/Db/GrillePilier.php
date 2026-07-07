<?php

declare(strict_types=1);

namespace OCA\SgdsGrille\Db;

use OCP\AppFramework\Db\Entity;

/**
 * Stores the 4-pillar evaluation for a dossier at a workflow step.
 *
 * @method int getId()
 * @method int getDossierId()
 * @method string getActorUserId()
 * @method int getScoreOpportunite()
 * @method string getCommentaireOpportunite()
 * @method int getScoreConformite()
 * @method string getCommentaireConformite()
 * @method int getScoreForme()
 * @method string getCommentaireForme()
 * @method int getScoreFond()
 * @method string getCommentaireFond()
 * @method string getRecommandation()  FAVORABLE|DEFAVORABLE|RESERVE
 * @method string getCreatedAt()
 */
class GrillePilier extends Entity
{
    protected int $dossierId = 0;
    protected string $actorUserId = '';
    protected int $scoreOpportunite = 0;
    protected string $commentaireOpportunite = '';
    protected int $scoreConformite = 0;
    protected string $commentaireConformite = '';
    protected int $scoreForme = 0;
    protected string $commentaireForme = '';
    protected int $scoreFond = 0;
    protected string $commentaireFond = '';
    protected string $recommandation = 'FAVORABLE';
    protected string $createdAt = '';

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('dossierId', 'integer');
        $this->addType('scoreOpportunite', 'integer');
        $this->addType('scoreConformite', 'integer');
        $this->addType('scoreForme', 'integer');
        $this->addType('scoreFond', 'integer');
    }

    public const RECO_FAVORABLE = 'FAVORABLE';
    public const RECO_DEFAVORABLE = 'DEFAVORABLE';
    public const RECO_RESERVE = 'RESERVE';

    /** Weighted average score (out of 20) */
    public function getScorePondere(): float
    {
        $weights = [
            'opportunite' => 3,  // 30%
            'conformite' => 3,   // 30%
            'forme' => 2,        // 20%
            'fond' => 2,         // 20%
        ];
        $total = ($this->scoreOpportunite * $weights['opportunite'])
               + ($this->scoreConformite * $weights['conformite'])
               + ($this->scoreForme * $weights['forme'])
               + ($this->scoreFond * $weights['fond']);
        $maxWeight = array_sum($weights);
        return round(($total / $maxWeight) * 4, 1); // Scale 0-5 to 0-20
    }

    public function getScoresArray(): array
    {
        return [
            'opportunite' => $this->scoreOpportunite,
            'conformite' => $this->scoreConformite,
            'forme' => $this->scoreForme,
            'fond' => $this->scoreFond,
        ];
    }
}
