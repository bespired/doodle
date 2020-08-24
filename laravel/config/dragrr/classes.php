<?php

return [
    'templates' => [
        [
            'label'  => 'New font class', 'name' => 'font-schema',
            'status' => 'default', 'type'        => 'schema', 'area' => 'font',
            'draw'   => '', 'data'               =>
            json_decode(file_get_contents(__DIR__ . '/../../resources/json/font-class-schema.json')),
        ],
        [
            'label'  => 'New color class', 'name' => 'color-schema',
            'status' => 'default', 'type'         => 'schema', 'area' => 'color',
            'draw'   => '', 'data'                =>
            '',
        ], [
            'label'  => 'New border class', 'name' => 'border-schema',
            'status' => 'default', 'type'          => 'schema', 'area' => 'border',
            'draw'   => '', 'data'                 =>
            '',
        ], [
            'label'  => 'New animation class', 'name' => 'animation-schema',
            'status' => 'default', 'type'             => 'schema', 'area' => 'animation',
            'draw'   => '', 'data'                    =>
            '',
        ], [
            'label'  => 'New size class', 'name' => 'size-schema',
            'status' => 'default', 'type'        => 'schema', 'area' => 'size',
            'draw'   => '', 'data'               =>
            '',
        ], [
            'label'  => 'New margin class', 'name' => 'padding-margin-schema',
            'status' => 'default', 'type'          => 'schema', 'area' => 'padding-margin',
            'draw'   => '', 'data'                 =>
            '',
        ],

        [
            'label'  => 'Open Sans', 'name' => 'font-1',
            'status' => 'saved', 'type'     => 'template', 'draw' => '',
            'area'   => 'font', 'data'      =>
            json_decode(file_get_contents(__DIR__ . '/../../resources/json/font-class-schema.json')),
        ],
        [
            'label'  => 'Blue', 'name'  => 'color-1',
            'status' => 'saved', 'type' => 'template', 'draw' => '',
            'area'   => 'color', 'data' =>
            '[{"blue": {"value": "#0000FF", "type" : "hexrgb"}}]',
        ],
        [
            'label'  => '2em', 'name'   => 'size-1',
            'status' => 'saved', 'type' => 'template', 'draw' => '',
            'area'   => 'size', 'data'  =>
            '[{"h1": {"value": "2", "unit"=>"em", "type" : "fontsize"}}]',
        ],
        [
            'label'  => 'Fade In', 'name'   => 'animation-1',
            'status' => 'saved', 'type'     => 'template', 'draw' => '',
            'area'   => 'animation', 'data' => '[]',
        ],
        [
            'label'  => 'Border', 'name' => 'border-1',
            'status' => 'saved', 'type'  => 'template', 'draw' => '',
            'area'   => 'border', 'data' => '[]',
        ],
        [
            'label'  => 'Spacing', 'name'        => 'padding-1',
            'status' => 'saved', 'type'          => 'template', 'draw' => '',
            'area'   => 'padding-margin', 'data' => '[]',
        ],
    ],
];
