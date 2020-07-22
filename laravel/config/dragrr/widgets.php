<?php

return [
    'templates' => [
        [
            'label'    => 'New widget', 'name' => 'schema',
            'status'   => 'default', 'type'    => 'schema', 'draw' => '',
            'elements' => json_decode(file_get_contents(__DIR__ . '/../../resources/json/widget-title.json')),
        ],
        [
            'label'    => 'Title', 'name' => 'title-1',
            'status'   => 'saved', 'type' => 'template', 'draw' => '',
            'elements' => json_decode(file_get_contents(__DIR__ . '/../../resources/json/widget-title.json')),
        ],
        [
            'label'    => 'Teaser', 'name' => 'teaser-1',
            'status'   => 'saved', 'type'  => 'template', 'draw' => '',
            'elements' => json_decode(file_get_contents(__DIR__ . '/../../resources/json/widget-teaser.json')),
        ],
        [
            'label'    => 'Full Image', 'name' => 'full-image-1',
            'status'   => 'saved', 'type'      => 'template', 'draw' => '',
            'elements' => json_decode(file_get_contents(__DIR__ . '/../../resources/json/widget-full-image.json')),
        ],
    ],
];
