<?php

declare(strict_types=1);

namespace OCA\SgdsMetadata\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\Settings\ISettings;
use OCA\SgdsMetadata\Db\MetadataSchema;
use OCA\SgdsMetadata\Service\MetadataService;

class AdminSettings implements ISettings
{
    public function __construct(
        private MetadataService $metadataService,
    ) {
    }

    public function getForm(): TemplateResponse
    {
        return new TemplateResponse('sgds_metadata', 'admin', [
            'schemas' => $this->metadataService->getAllSchemas(),
            'documentTypes' => MetadataSchema::getDocumentTypes(),
            'fieldTypes' => MetadataSchema::getFieldTypes(),
        ]);
    }

    public function getSection(): string
    {
        return 'sgds';
    }

    public function getPriority(): int
    {
        return 10;
    }
}
