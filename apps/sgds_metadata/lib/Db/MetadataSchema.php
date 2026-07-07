<?php

declare(strict_types=1);

namespace OCA\SgdsMetadata\Db;

use OCP\AppFramework\Db\Entity;

/**
 * Represents a metadata field definition (schema) for a document type.
 *
 * @method int getId()
 * @method void setId(int $id)
 * @method string getDocumentType()
 * @method void setDocumentType(string $type)
 * @method string getFieldName()
 * @method void setFieldName(string $name)
 * @method string getFieldLabel()
 * @method void setFieldLabel(string $label)
 * @method string getFieldType()
 * @method void setFieldType(string $type)
 * @method int getSortOrder()
 * @method void setSortOrder(int $order)
 * @method bool getRequired()
 * @method void setRequired(bool $required)
 * @method string getOptions()
 * @method void setOptions(string $options)
 * @method string getCreatedAt()
 * @method void setCreatedAt(string $date)
 */
class MetadataSchema extends Entity
{
    /** @var string */
    protected $documentType;

    /** @var string */
    protected $fieldName;

    /** @var string */
    protected $fieldLabel;

    /** @var string text|number|date|select|user|boolean */
    protected $fieldType;

    /** @var int */
    protected $sortOrder;

    /** @var bool */
    protected $required;

    /** @var string JSON array for select options */
    protected $options;

    /** @var string */
    protected $createdAt;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('sortOrder', 'integer');
        $this->addType('required', 'boolean');
    }

    /**
     * Document types supported by the ministry:
     * courrier_arrivee, courrier_depart, arrete, note_technique,
     * note_presentation, rapport, contrat, proces_verbal, decision,
     * circulaire, fiche_technique, annexe
     */
    public static function getDocumentTypes(): array
    {
        return [
            'courrier_arrivee' => 'Courrier Arrivée',
            'courrier_depart' => 'Courrier Départ',
            'arrete' => 'Arrêté',
            'note_technique' => 'Note Technique',
            'note_presentation' => 'Note de Présentation',
            'rapport' => 'Rapport',
            'contrat' => 'Contrat',
            'proces_verbal' => 'Procès-Verbal',
            'decision' => 'Décision',
            'circulaire' => 'Circulaire',
            'fiche_technique' => 'Fiche Technique',
            'annexe' => 'Annexe',
        ];
    }

    /**
     * Available field types
     */
    public static function getFieldTypes(): array
    {
        return [
            'text' => 'Texte',
            'number' => 'Nombre',
            'date' => 'Date',
            'select' => 'Liste de choix',
            'user' => 'Utilisateur',
            'boolean' => 'Oui/Non',
        ];
    }

    public function getOptionsArray(): array
    {
        if (empty($this->options)) {
            return [];
        }
        $decoded = json_decode($this->options, true);
        return is_array($decoded) ? $decoded : [];
    }
}
