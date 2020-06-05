<?php

return [

    'responsive'       =>
    [
        'responsive' => 12,
        'fillstyle'  => 'max-width',

        'mobile'     => [
            'maxWidth' => 0,
            'min'      => 0,
            'max'      => 640,
            'gutters'  => [
                'row'    => 10,
                'column' => 10,
                'top'    => 10,
                'bottom' => 10,
            ],
        ],
        'tablet'     => [
            'maxWidth' => 0,
            'min'      => 641,
            'max'      => 1007,
            'gutters'  => [
                'row'    => 10,
                'column' => 20,
                'top'    => 30,
                'bottom' => 40,
            ],
        ],
        'desktop'    => [
            'maxWidth' => 960,
            'min'      => 1008,
            'max'      => 1365,
            'gutters'  => [
                'row'    => 30,
                'column' => 20,
                'top'    => 30,
                'bottom' => 40,
            ],
        ],
        'xlarge'     => [
            'maxWidth' => 1140,
            'min'      => 1366,
            'max'      => 9999,
            'gutters'  => [
                'row'    => 30,
                'column' => 20,
                'top'    => 30,
                'bottom' => 40,
            ],
        ],

    ],

    'layout-templates' => [
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
