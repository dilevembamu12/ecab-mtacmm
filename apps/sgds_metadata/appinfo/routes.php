<?php

declare(strict_types=1);

/**
 * Routes for SGDS Metadata app
 */

return [
    'routes' => [
        // Main page
        ['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],

        // JSON API
        ['name' => 'metadata#getSchemas', 'url' => '/api/schemas', 'verb' => 'GET'],
        ['name' => 'metadata#getSchema', 'url' => '/api/schemas/{documentType}', 'verb' => 'GET'],
        ['name' => 'metadata#getFileMetadata', 'url' => '/api/file/{fileId}', 'verb' => 'GET'],
        ['name' => 'metadata#saveMetadata', 'url' => '/api/file/{fileId}', 'verb' => 'POST'],
        ['name' => 'metadata#deleteMetadata', 'url' => '/api/file/{fileId}', 'verb' => 'DELETE'],
    ],
];
