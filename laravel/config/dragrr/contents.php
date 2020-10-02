<?php

return [
    'website' => [
        'google-id'   => '',
        'language'    => 'en',
        'theme-color' => '#3147a5',
    ],
    'content' => [
        'page'       => [
            'language'    => 'en',
            'title'       => 'Test Page',
            'description' => 'This is a test page.',
            'type'        => 'article',
            'image'       => 'http://localhost/img/doodle.png',
            'theme-color' => '#3147a5',
            'body'        => [
                '{! header  !}',
                '{! section--1 !}',
                '{! section--2 !}',
                '{! section--3 !}',
                '{! footer  !}',
            ],
        ],
        'header'     => [
            'class' => "header-class",
        ],
        'section--1' => [
            'class' => "nice-class",
            'title' => "I'm section 1",
        ],
        'section--2' => [
            'class' => "nice-class",
            'title' => "I'm section 2",
        ],
        'section--3' => [
            'class' => "nice-class",
            'title' => "I'm section 3",
        ],
    ],

];
