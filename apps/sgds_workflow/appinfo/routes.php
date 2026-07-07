<?php declare(strict_types=1);
return ['routes' => [
    ['name' => 'workflow#transition', 'url' => '/api/transition', 'verb' => 'POST'],
    ['name' => 'workflow#nextStates', 'url' => '/api/next-states/{dossierId}', 'verb' => 'GET'],
    ['name' => 'widget#circuit', 'url' => '/widget/circuit', 'verb' => 'GET'],
]];