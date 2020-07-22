<?php

return [
    'templates' => [
        [
            'name'   => 'schema',
            'status' => 'default',
            'type'   => 'schema',
            'label'  => 'New Section',
            'rows'   => json_decode(file_get_contents(__DIR__ . '/../../resources/json/section-schema.json')),
            'draw'   => '...',
        ],
        [
            'name'   => 'featured',
            'status' => 'saved',
            'type'   => 'template',
            'label'  => 'Featured',
            'rows'   => [
                [
                    'layout' => '12-layout',
                    'repeat' => 1,
                    'spaces' => [
                        [
                            'widget'  => 'title',
                            'content' => 'fixed',
                            'widths'  => ['100%', '100%', '100%', '100%'],
                        ],
                    ],
                ],
                [
                    'layout' => '12-layout',
                    'repeat' => 1,
                    'spaces' => [
                        [
                            'widget'  => 'notice',
                            'content' => 'fixed',
                            'widths'  => ['100%', '50%', '50%', '50%'],
                            // 'mobile'  => '100%', 'tablet'  => '50%', 'desktop' => '25%', 'xlarge'  => '25%',
                        ],
                        [
                            'widget'  => 'image',
                            'content' => 'fixed',
                            'widths'  => ['100%', '50%', '50%', '50%'],
                        ],
                    ],
                ],
            ],
        ],
        [
            'name'   => 'horizons',
            'status' => 'saved',
            'type'   => 'template',
            'label'  => 'Horizons',

            'rows'   => [
                [
                    'layout' => '12-layout',
                    'repeat' => 1,
                    'spaces' => [
                        [
                            'widget'  => 'title',
                            'content' => 'fixed',
                            'widths'  => ['100%', '100%', '100%', '100%'],
                        ],
                    ],
                ],
                [
                    'layout' => '12-layout',
                    'repeat' => 1,
                    'spaces' => [
                        [
                            'widget'  => 'teaser',
                            'content' => 'fixed',
                            'widths'  => ['100%', '50%', '25%', '25%'],
                        ],
                        [
                            'widget'  => 'teaser',
                            'content' => 'magnet',
                            'widths'  => ['100%', '50%', '25%', '25%'],
                        ],
                        [
                            'widget'  => 'teaser',
                            'content' => 'collection',
                            'widths'  => ['100%', '50%', '25%', '25%'],
                        ],
                        [
                            'widget'  => 'teaser',
                            'content' => 'segment',
                            'widths'  => ['100%', '50%', '25%', '25%'],
                        ],
                    ],
                ],
            ],
        ],
    ],
];
