<?php

declare(strict_types=1);

namespace OCA\SgdsMetadata\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IRequest;
use OCA\SgdsMetadata\Service\MetadataService;

class MetadataController extends Controller
{
    public function __construct(
        IRequest $request,
        private MetadataService $metadataService,
    ) {
        parent::__construct('sgds_metadata', $request);
    }

    /**
     * Main admin page for managing metadata schemas
     */
    #[NoAdminRequired]
    #[NoCSRFRequired]
    public function index(): TemplateResponse
    {
        return new TemplateResponse('sgds_metadata', 'index', [
            'schemas' => $this->metadataService->getAllSchemas(),
            'documentTypes' => \SgdsMetadata\Db\MetadataSchema::getDocumentTypes(),
        ]);
    }

    /**
     * Get all schemas (JSON API)
     */
    #[NoAdminRequired]
    public function getSchemas(): DataResponse
    {
        return new DataResponse($this->metadataService->getAllSchemas());
    }

    /**
     * Get schema for a specific document type
     */
    #[NoAdminRequired]
    public function getSchema(string $documentType): DataResponse
    {
        $schemas = $this->metadataService->getSchema($documentType);
        return new DataResponse(array_map(function ($s) {
            return [
                'id' => $s->getId(),
                'fieldName' => $s->getFieldName(),
                'fieldLabel' => $s->getFieldLabel(),
                'fieldType' => $s->getFieldType(),
                'sortOrder' => $s->getSortOrder(),
                'required' => $s->getRequired(),
                'options' => $s->getOptionsArray(),
            ];
        }, $schemas));
    }

    /**
     * Get metadata for a file
     */
    #[NoAdminRequired]
    public function getFileMetadata(int $fileId): DataResponse
    {
        return new DataResponse($this->metadataService->getFileMetadata($fileId));
    }

    /**
     * Save metadata values for a file
     */
    #[NoAdminRequired]
    public function saveMetadata(int $fileId, array $values): DataResponse
    {
        try {
            $result = $this->metadataService->saveMultipleValues($fileId, $values);
            return new DataResponse(['status' => 'ok', 'count' => count($result)]);
        } catch (\Exception $e) {
            return new DataResponse(
                ['status' => 'error', 'message' => $e->getMessage()],
                Http::STATUS_BAD_REQUEST
            );
        }
    }

    /**
     * Delete metadata for a file
     */
    #[NoAdminRequired]
    public function deleteMetadata(int $fileId): DataResponse
    {
        $this->metadataService->deleteFileMetadata($fileId);
        return new DataResponse(['status' => 'ok']);
    }
}
