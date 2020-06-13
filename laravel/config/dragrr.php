<?php

return [

    'menus'             => json_decode(file_get_contents(__DIR__ . '/../resources/json/dragrr-menu.json')),

    'layout-templates'  => [
        [
            'name'       => 'hero-layout',
            'type'       => 'template',
            'label'      => 'Full Width',
            'responsive' => 12,
            'draw'       => '',
            'media'      => json_decode(file_get_contents(__DIR__ . '/../resources/json/layout-hero.json')),
        ],
        [
            'name'       => '12-layout',
            'responsive' => 12,
            'type'       => 'template',
            'label'      => 'Responsive 12',
            'draw'       => '',
            'media'      => json_decode(file_get_contents(__DIR__ . '/../resources/json/layout-12.json')),
        ],

    ],

    'section-templates' => [
        [
            'name'       => 'hero',
            'background' => 'image',
            'fillstyle'  => 'full-width',
            'maxwidth'   => '100%',
            'columns'    => [
                'mobile'  => [100],
                'tablet'  => [100],
                'desktop' => [100],
                'xlarge'  => [100],
            ],
            'condition'  => [],
            'draw'       => '',
        ],
        [
            'name'       => 'example',
            'background' => 'color',
            'fillstyle'  => 'max-width',
            'maxwidth'   => '980px',
            'columns'    => [
                'mobile'  => [100, 100, 100],
                'tablet'  => [100, 50, 50],
                'desktop' => [20, 40, 40],
                'xlarge'  => [20, 40, 40],
            ],
            'condition'  => [],
            'draw'       => '',
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
