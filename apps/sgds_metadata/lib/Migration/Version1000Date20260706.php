<?php

declare(strict_types=1);

namespace OCA\SgdsMetadata\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version1000Date20260706 extends SimpleMigrationStep
{
    /**
     * Create the metadata schema and value tables
     */
    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper
    {
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();

        // Table: sgds_metadata_schema — field definitions per document type
        if (!$schema->hasTable('sgds_metadata_schema')) {
            $table = $schema->createTable('sgds_metadata_schema');
            $table->addColumn('id', Types::BIGINT, [
                'autoincrement' => true,
                'notnull' => true,
                'length' => 20,
                'unsigned' => true,
            ]);
            $table->addColumn('document_type', Types::STRING, [
                'notnull' => true,
                'length' => 64,
            ]);
            $table->addColumn('field_name', Types::STRING, [
                'notnull' => true,
                'length' => 64,
            ]);
            $table->addColumn('field_label', Types::STRING, [
                'notnull' => true,
                'length' => 128,
            ]);
            $table->addColumn('field_type', Types::STRING, [
                'notnull' => true,
                'length' => 16,
                'default' => 'text',
            ]);
            $table->addColumn('sort_order', Types::SMALLINT, [
                'notnull' => true,
                'unsigned' => true,
                'default' => 0,
            ]);
            $table->addColumn('required', Types::BOOLEAN, [
                'notnull' => false,
                'default' => false,
            ]);
            $table->addColumn('options', Types::TEXT, [
                'notnull' => false,
                'default' => null,
            ]);
            $table->addColumn('created_at', Types::DATETIME_MUTABLE, [
                'notnull' => true,
                'default' => 'CURRENT_TIMESTAMP',
            ]);

            $table->setPrimaryKey(['id']);
            $table->addUniqueIndex(['document_type', 'field_name'], 'sgds_meta_schema_unique');
            $table->addIndex(['document_type'], 'sgds_meta_schema_type_idx');
        }

        // Table: sgds_metadata_value — actual metadata values on files
        if (!$schema->hasTable('sgds_metadata_value')) {
            $table = $schema->createTable('sgds_metadata_value');
            $table->addColumn('id', Types::BIGINT, [
                'autoincrement' => true,
                'notnull' => true,
                'length' => 20,
                'unsigned' => true,
            ]);
            $table->addColumn('file_id', Types::BIGINT, [
                'notnull' => true,
                'length' => 20,
                'unsigned' => true,
            ]);
            $table->addColumn('schema_id', Types::BIGINT, [
                'notnull' => true,
                'length' => 20,
                'unsigned' => true,
            ]);
            $table->addColumn('value', Types::TEXT, [
                'notnull' => false,
                'default' => null,
            ]);
            $table->addColumn('updated_at', Types::DATETIME_MUTABLE, [
                'notnull' => true,
                'default' => 'CURRENT_TIMESTAMP',
            ]);

            $table->setPrimaryKey(['id']);
            $table->addUniqueIndex(['file_id', 'schema_id'], 'sgds_meta_value_unique');
            $table->addIndex(['file_id'], 'sgds_meta_value_file_idx');
            $table->addIndex(['schema_id'], 'sgds_meta_value_schema_idx');
            $table->addForeignKeyConstraint(
                $table,
                'sgds_metadata_schema',
                ['schema_id'],
                ['id'],
                ['onDelete' => 'CASCADE']
            );
        }

        return $schema;
    }
}
