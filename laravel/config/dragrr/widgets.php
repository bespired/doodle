<?php

return [
    'templates' => [
        [
            'label'    => 'New widget', 'name' => 'schema',
            'status'   => 'default', 'type'    => 'schema', 'draw' => '',
            'elements' => json_decode(file_get_contents(__DIR__ . '/../../resources/json/widget-schema.json')),
        ],
    ],
];
