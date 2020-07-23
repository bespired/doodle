<?php

return [
    'responsiveOptions' => [0, 6, 8, 10, 12],
    'backgroundOptions' => ['image', 'movie', 'color'],
    'fillstyleOptions'  => ['full-width', 'max-width'],
    'mediaOptions'      => ['mobile', 'tablet', 'desktop', 'xlarge'],

    'areaOptions'       => [
        'animation', 'border', 'color', 'font', 'padding-margin', 'size',
    ],

    'googleFonts'       => json_decode(file_get_contents(__DIR__ . '/../../resources/json/googlefonts.json')),

];
