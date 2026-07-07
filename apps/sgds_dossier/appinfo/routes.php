<?php declare(strict_types=1);
return ['routes' => [
    ['name' => 'dossier#index', 'url' => '/api/dossiers', 'verb' => 'GET'],
    ['name' => 'dossier#show', 'url' => '/api/dossiers/{id}', 'verb' => 'GET'],
    ['name' => 'dossier#create', 'url' => '/api/dossiers', 'verb' => 'POST'],
    ['name' => 'widget#pending', 'url' => '/widget/pending', 'verb' => 'GET'],
    ['name' => 'widget#quickActions', 'url' => '/widget/actions', 'verb' => 'GET'],
]];