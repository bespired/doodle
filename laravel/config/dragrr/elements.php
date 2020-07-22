<?php

return [

    'templates' => [
        [
            'name' => 'schema', 'status' => 'default', 'type' => 'schema', 'label'   => 'New element',
            'tag'  => 'p', 'style'       => [], 'icon'        => 'star-full', 'draw' => '', 'otml' => '',
        ],
        [
            'label' => 'Title h1', 'draw'   => '',
            'name'  => 'h1-title', 'status' => 'saved', 'type' => 'template',
            'tag'   => 'h1', 'icon'         => 'text',
            'style' => [], 'otml'           => '<h1 class="[class]">[text]</a>',
        ],
        [
            'label' => 'Subtitle h2', 'draw' => '',
            'name'  => 'h2-title', 'status'  => 'saved', 'type' => 'template',
            'tag'   => 'h2', 'icon'          => 'text',
            'style' => [], 'otml'            => '<h2 class="[class]">[text]</a>',
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
];
