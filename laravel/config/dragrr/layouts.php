<?php

return [
    'templates' => [
        [
            'name'       => 'schema',
            'status'     => 'default',
            'type'       => 'schema',
            'label'      => 'New Layout',
            'responsive' => 12,
            'draw'       => '',
            'media'      => json_decode(file_get_contents(__DIR__ . '/../../resources/json/layout-hero.json')),
        ],
        [
            'name'       => 'hero-layout',
            'status'     => 'saved',
            'type'       => 'template',
            'label'      => 'Full Width',
            'responsive' => 12,
            'draw'       => '',
            'media'      => json_decode(file_get_contents(__DIR__ . '/../../resources/json/layout-hero.json')),
        ],
        [
            'name'       => '12-layout',
            'status'     => 'saved',
            'type'       => 'template',
            'label'      => 'Responsive 12',
            'responsive' => 12,
            'draw'       => '',
            'media'      => json_decode(file_get_contents(__DIR__ . '/../../resources/json/layout-12.json')),
        ],

    ],
];
