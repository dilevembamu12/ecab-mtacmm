<?php

declare(strict_types=1);

namespace OCA\SgdsMetadata\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\IDBConnection;

/**
 * @extends QBMapper<MetadataSchema>
 */
class MetadataSchemaMapper extends QBMapper
{
    public function __construct(IDBConnection $db)
    {
        parent::__construct($db, 'sgds_metadata_schema', MetadataSchema::class);
    }

    /**
     * Get all schemas for a document type
     *
     * @return MetadataSchema[]
     */
    public function findByDocumentType(string $documentType): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('document_type', $qb->createNamedParameter($documentType)))
            ->orderBy('sort_order', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * Get all schemas grouped by document type
     *
     * @return array<string, MetadataSchema[]>
     */
    public function findAllGrouped(): array
    {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->orderBy('sort_order', 'ASC');

        $schemas = $this->findEntities($qb);
        $grouped = [];
        foreach ($schemas as $schema) {
            $grouped[$schema->getDocumentType()][] = $schema;
        }
        return $grouped;
    }

    /**
     * Delete all schemas for a document type
     */
    public function deleteByDocumentType(string $documentType): int
    {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('document_type', $qb->createNamedParameter($documentType)));

        return $qb->executeStatement();
    }
}
