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

        if (($str === '_') or ($str === '/')) {
            return $str;
        }

        do {
            $key = sprintf('-%s-', slug(Str::random(8)));
        } while (strpos($str, $key) > -1);

        return str_replace($key, '--', slug(str_replace('/', $key, $str)));
    }
}

if (!function_exists('dekebab')) {
    function dekebab($str)
    {
        return str_replace('-', ' ', $str);
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

if (!function_exists('array_fallback')) {
    function array_fallback($arr, $attribute, $fallback)
    {

        if (empty($arr)) {
            return $fallback;
        }

        if (!isset($arr[$attribute])) {
            return $fallback;
        }

        return $arr[$attribute];
    }
}

if (!function_exists('indent')) {
    function indent($file, $amount)
    {
        $rows = [];
        foreach (explode("\n", $file) as $row) {
            $rows[] = str_repeat("    ", $amount) . trim($row);
        }
        return join("\n", $rows);
    }
}

if (!function_exists('device')) {
    function device()
    {
        $browser = new \Browser();

        if ($browser->isMobile()) {
            return 'is-mobile';
        }

        if ($browser->isTablet()) {
            return 'is-tablet';
        }

        if ($browser->isRobot()) {
            return 'is-robot';
        }

        return 'is-desktop';

    }
}
if (!function_exists('uovid')) {
    function uovid()
    {
        $ua     = $_SERVER['HTTP_USER_AGENT'];
        $ip     = $_SERVER['REMOTE_ADDR'];
        $m_time = microtime();

        $unique_id = substr(md5($ip . $ua . $m_time . rand(0, time())), 0, 12);
        $random_id = \Illuminate\Support\Str::random(4);
        $date      = sprintf('%s%0s%s', date('y'), date('z'), date('w'));

        $browser = new \Browser();

        $index = ($browser->isMobile() ? 1 : 0) + ($browser->isTablet() ? 2 : 0);
        $index = $browser->isRobot() ? 3 : $index;

        $agent_id = substr('DMTR', $index, 1);
        $agent_id .= substr($browser->getBrowser(), 0, 1);
        $agent_id .= substr($browser->getPlatform(), 0, 1);
        $agent_id .= substr($browser->getVersion(), 0, 1);

        return strtolower($agent_id . '.' . $unique_id . '.' . $random_id . '.' . $date);

    }
}
