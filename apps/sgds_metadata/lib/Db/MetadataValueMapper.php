<?php

declare(strict_types=1);

namespace OCA\SgdsMetadata\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\IDBConnection;

/**
 * @extends QBMapper<MetadataValue>
 */
class MetadataValueMapper extends QBMapper
{
    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, 'sgds_metadata_value', MetadataValue::class);
    }

    /**
     * Get all metadata values for a file
     *
     * @return MetadataValue[]
     */
    public function findByFileId(int $fileId): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('v.*', 's.field_name', 's.field_label', 's.field_type', 's.document_type')
            ->from($this->getTableName(), 'v')
            ->innerJoin('v', 'sgds_metadata_schema', 's', 'v.schema_id = s.id')
            ->where($qb->expr()->eq('v.file_id', $qb->createNamedParameter($fileId)))
            ->orderBy('s.sort_order', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * Get a single metadata value by file and schema
     */
    public function findByFileAndSchema(int $fileId, int $schemaId): ?MetadataValue
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('file_id', $qb->createNamedParameter($fileId)))
            ->andWhere($qb->expr()->eq('schema_id', $qb->createNamedParameter($schemaId)));

        return $this->findEntity($qb);
    }

    /**
     * Delete all metadata for a file
     */
    public function deleteByFileId(int $fileId): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('file_id', $qb->createNamedParameter($fileId)));

        return $qb->executeStatement();
    }
}
