<?php

use Illuminate\Support\Str;

if (!function_exists('slug')) {
    function slug($str)
    {
        return Str::slug($str);
    }
}

if (!function_exists('pathslug')) {
    function pathslug($str)
    {
        // I want to keep --
        // and slug doesnt allow me...

        do {
            $key = sprintf('-%s-', slug(Str::random(8)));
        } while (strpos($str, $key) > -1);

        return str_replace($key, '--', slug(str_replace('/', $key, $str)));
    }
}
