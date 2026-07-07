<?php declare(strict_types=1);
return ['routes' => [
    ['name' => 'archive#archive', 'url' => '/api/archive/{dossierId}', 'verb' => 'POST'],
    ['name' => 'archive#verify', 'url' => '/api/verify/{dossierId}', 'verb' => 'GET'],
    ['name' => 'archive#export', 'url' => '/api/export/{dossierId}', 'verb' => 'GET'],
    ['name' => 'archive#list', 'url' => '/api/archives', 'verb' => 'GET'],
]];