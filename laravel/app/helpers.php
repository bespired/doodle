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
        return Str::slug(str_replace('/', '--', $str));
    }
}
