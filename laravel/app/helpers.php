<?php

use Illuminate\Support\Str;

if (!function_exists('slug')) {
    function slug($str)
    {
        return Str::slug($str);
    }
}
