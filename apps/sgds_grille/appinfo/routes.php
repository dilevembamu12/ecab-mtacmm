<?php declare(strict_types=1);
return ['routes' => [
    ['name' => 'grille#save', 'url' => '/api/evaluate', 'verb' => 'POST'],
    ['name' => 'grille#get', 'url' => '/api/evaluations/{dossierId}', 'verb' => 'GET'],
    ['name' => 'grille#pillars', 'url' => '/api/pillars', 'verb' => 'GET'],
]];