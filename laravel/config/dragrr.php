<?php

return [

    'menus'             => json_decode(file_get_contents(__DIR__ . '/../resources/json/dragrr-menu.json')),

    'settings'          => [
        'responsiveOptions' => [0, 6, 8, 10, 12],
        'backgroundOptions' => ['image', 'movie', 'color'],
        'fillstyleOptions'  => ['full-width', 'max-width'],
        'mediaOptions'      => ['mobile', 'tablet', 'desktop', 'xlarge'],
    ],

    'element-templates' => [
        [
            'name' => 'schema', 'status' => 'default', 'type' => 'schema', 'label'   => 'New element',
            'tag'  => 'p', 'style'       => [], 'icon'        => 'star-full', 'draw' => '', 'otml' => '',
        ],
        [
            'label' => 'H1 Title', 'draw'   => '',
            'name'  => 'h1-title', 'status' => 'saved', 'type' => 'template',
            'tag'   => 'h1', 'icon'         => 'text',
            'style' => [], 'otml'           => '<h1 class="[class]">[text]</a>',
        ],
        [
            'label' => 'H2 Title', 'draw'   => '',
            'name'  => 'h2-title', 'status' => 'saved', 'type' => 'template',
            'tag'   => 'h2', 'icon'         => 'text',
            'style' => [], 'otml'           => '<h2 class="[class]">[text]</a>',
        ],
        [
            'label' => 'Paragraph', 'draw'   => '',
            'name'  => 'paragraph', 'status' => 'saved', 'type' => 'template',
            'tag'   => 'p', 'icon'           => 'paragraph',
            'style' => [], 'otml'            => '<p class="[class]">[text]</a>',
        ],
        [
            'label' => 'Link', 'draw'   => '',
            'name'  => 'link', 'status' => 'saved', 'type' => 'template',
            'tag'   => 'a href', 'icon' => 'hyperlink',
            'style' => [], 'otml'       => '<a href="[link]" class="[class]">[text]</a>',
        ],
        [
            'label' => 'Button', 'draw'   => '',
            'name'  => 'button', 'status' => 'saved', 'type' => 'template',
            'tag'   => 'a href', 'icon'   => 'button',
            'style' => [], 'otml'         => '<a href="[link]" class="button [class]">[text]</a>',
        ],
        [
            'label' => 'Image', 'draw'   => '',
            'name'  => 'image', 'status' => 'saved', 'type' => 'template',
            'tag'   => 'img', 'icon'     => 'image',
            'style' => [], 'otml'        => '<img src="[image]" alt="[title]" class="[class]" />',
        ],
    ],

    'widget-templates'  => [
        [
            'name'     => 'schema',
            'status'   => 'default',
            'type'     => 'schema',
            'label'    => 'New widget',
            'elements' => [],
            'draw'     => '',
        ],
    ],

    'layout-templates'  => [
        [
            'name'       => 'schema',
            'status'     => 'default',
            'type'       => 'schema',
            'label'      => 'New Layout',
            'responsive' => 12,
            'draw'       => '',
            'media'      => json_decode(file_get_contents(__DIR__ . '/../resources/json/layout-hero.json')),
        ],
        [
            'name'       => 'hero-layout',
            'status'     => 'saved',
            'type'       => 'template',
            'label'      => 'Full Width',
            'responsive' => 12,
            'draw'       => '',
            'media'      => json_decode(file_get_contents(__DIR__ . '/../resources/json/layout-hero.json')),
        ],
        [
            'name'       => '12-layout',
            'status'     => 'saved',
            'type'       => 'template',
            'label'      => 'Responsive 12',
            'responsive' => 12,
            'draw'       => '',
            'media'      => json_decode(file_get_contents(__DIR__ . '/../resources/json/layout-12.json')),
        ],

    ],

    'section-templates' => [
        [
            'name'   => 'schema',
            'status' => 'default',
            'type'   => 'schema',
            'label'  => 'New Section',
            'rows'   => json_decode(file_get_contents(__DIR__ . '/../resources/json/section-schema.json')),
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

// *** ROW TEMPLATES ***
//
// id:     (#)    // unique in database
// handle: (#-#)  // unique in database
// name:   (slug) // unique per widget
// label:  (text)

// background: (transparent | color | image | movie)
// fill-style: (full-page | full-width | max-width)
// max-width : (px | % | vw | wh)

// columns: {
//     mobile:  { 100, 100, 100 },
//     tablet:  { 100,  50,  50 },
//     desktop: {  20,  40,  40 },
//     xlarge:  {  20,  40,  40 },
// }
