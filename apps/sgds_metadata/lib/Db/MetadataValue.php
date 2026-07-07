<?php

declare(strict_types=1);

namespace OCA\SgdsMetadata\Db;

use OCP\AppFramework\Db\Entity;

/**
 * Represents actual metadata values assigned to a specific file.
 *
 * @method int getId()
 * @method void setId(int $id)
 * @method int getFileId()
 * @method void setFileId(int $fileId)
 * @method int getSchemaId()
 * @method void setSchemaId(int $schemaId)
 * @method string getValue()
 * @method void setValue(string $value)
 * @method string getUpdatedAt()
 * @method void setUpdatedAt(string $date)
 */
class MetadataValue extends Entity
{
    /** @var int */
    protected $fileId;

    /** @var int */
    protected $schemaId;

    /** @var string */
    protected $value;

    /** @var string */
    protected $updatedAt;

    public function __construct()
    {
        $this->addType('id', 'integer');
        $this->addType('fileId', 'integer');
        $this->addType('schemaId', 'integer');
    }
}
