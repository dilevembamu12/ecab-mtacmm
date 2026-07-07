<?php

declare(strict_types=1);

namespace OCA\SgdsDossier\Db;

use OCP\AppFramework\Db\Entity;

/**
 * Represents a "Dossier Documentaire" — a composite container of related files.
 *
 * @method int getId()
 * @method string getTitle()
 * @method string getDescription()
 * @method string getDocumentType()
 * @method string getStatus()
 * @method string getCreatedBy()
 * @method string getAssignedTo()
 * @method string getCreatedAt()
 * @method string getUpdatedAt()
 */
class Dossier extends Entity
{
    protected string $title = '';
    protected string $description = '';
    protected string $documentType = '';
    protected string $status = 'BROUILLON';
    protected string $createdBy = '';
    protected string $assignedTo = '';
    protected string $createdAt = '';
    protected string $updatedAt = '';

    public function __construct()
    {
        $this->addType('id', 'integer');
    }

    /** Dossier status constants matching workflow states */
    public const STATUS_BROUILLON = 'BROUILLON';
    public const STATUS_SOUMIS = 'SOUMIS';
    public const STATUS_EXAMEN_FORME = 'EXAMEN_FORME';
    public const STATUS_ANALYSE_FOND = 'ANALYSE_FOND';
    public const STATUS_AVIS_FAVORABLE = 'AVIS_FAVORABLE';
    public const STATUS_AVIS_DEFAVORABLE = 'AVIS_DEFAVORABLE';
    public const STATUS_PRET_VISA = 'PRET_VISA';
    public const STATUS_VISE = 'VISE';
    public const STATUS_SIGNE = 'SIGNE';
    public const STATUS_REJETE = 'REJETE';

    public static function getStatusLabels(): array
    {
        return [
            self::STATUS_BROUILLON => 'Brouillon',
            self::STATUS_SOUMIS => 'Soumis',
            self::STATUS_EXAMEN_FORME => 'Examen de Forme',
            self::STATUS_ANALYSE_FOND => 'Analyse de Fond',
            self::STATUS_AVIS_FAVORABLE => 'Avis Favorable',
            self::STATUS_AVIS_DEFAVORABLE => 'Avis Défavorable',
            self::STATUS_PRET_VISA => 'Prêt pour Visa',
            self::STATUS_VISE => 'Visé',
            self::STATUS_SIGNE => 'Signé',
            self::STATUS_REJETE => 'Rejeté',
        ];
    }
}
