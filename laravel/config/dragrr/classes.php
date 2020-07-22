<?php

return [
    'templates' => [
        [
            'label'  => 'New class', 'name' => 'schema',
            'status' => 'default', 'type'   => 'schema', 'area' => 'color',
            'draw'   => '',
        ],
        [
            'label'  => 'Helvetica', 'name' => 'font-1',
            'status' => 'saved', 'type'     => 'template', 'draw' => '',
            'area'   => 'font', 'data'      =>
            '[{"helvetica": {"value": "Helvetica", "type" : "sysfont"}} ]',
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
