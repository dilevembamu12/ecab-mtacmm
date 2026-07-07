<?php

declare(strict_types=1);

namespace OCA\SgdsDossier\Db;

use OCP\AppFramework\Db\Entity;

/**
 * Links a file to a dossier with a specific role.
 *
 * @method int getId()
 * @method int getDossierId()
 * @method int getFileId()
 * @method string getRole()
 * @method int getSortOrder()
 */
class DossierFile extends Entity
{
    protected int $dossierId = 0;
    protected int $fileId = 0;
    protected string $role = 'ANNEXE';
    protected int $sortOrder = 0;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('dossierId', 'integer');
        $this->addType('fileId', 'integer');
        $this->addType('sortOrder', 'integer');
    }

    /** File roles within a dossier */
    public const ROLE_PRINCIPAL = 'DOCUMENT_PRINCIPAL';
    public const ROLE_NOTE_PRESENTATION = 'NOTE_PRESENTATION';
    public const ROLE_FICHE_TECHNIQUE = 'FICHE_TECHNIQUE';
    public const ROLE_ANNEXE = 'ANNEXE';
    public const ROLE_AVIS = 'AVIS';
    public const ROLE_SYNTHESE = 'SYNTHESE';

    public static function getRoleLabels(): array
    {
        return [
            self::ROLE_PRINCIPAL => 'Document Principal',
            self::ROLE_NOTE_PRESENTATION => 'Note de Présentation',
            self::ROLE_FICHE_TECHNIQUE => 'Fiche Technique',
            self::ROLE_ANNEXE => 'Annexe',
            self::ROLE_AVIS => 'Avis',
            self::ROLE_SYNTHESE => 'Fiche de Synthèse',
        ];
    }
}
