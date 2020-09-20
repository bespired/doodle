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

        if ($str === '_') {
            return '_';
        }

        do {
            $key = sprintf('-%s-', slug(Str::random(8)));
        } while (strpos($str, $key) > -1);

        return str_replace($key, '--', slug(str_replace('/', $key, $str)));
    }
}

if (!function_exists('tagCombi')) {
    function tagCombi($str1, $str2)
    {
        return sprintf(':%s::%s:', $str1, $str2);
    }
}

if (!function_exists('cacheTags')) {
    function cacheTags($tag1, $tag2)
    {
        return [$tag1, $tag2, tagCombi($tag1, $tag2)];
    }
}
