<?php

namespace App\Http\Traits;

use Illuminate\Support\Str;

class Yamlaar
{

    protected static $lines = [];

    public static function dump($arr)
    {

        foreach ($arr as $key => $value) {

            if (is_array($value)) {

                self::arr($value, $key, 1, 'arr');

            } else {

                self::$lines[] = $key . ': ' . self::quoted($key, $value);

            }
        }

        array_unshift(self::$lines, '---');

        return join("\n", self::$lines);
    }

    private static function quoted($key, $value, $depth = 0)
    {

        if (Str::startsWith($value, '@')) {
            $value = '\\' . $value;
        }

        if (strpos($value, "\n") > -1) {
            $indent = str_repeat(' ', ($depth + 1) * 4);
            return "|\n" . $indent . str_replace("\n", "\n" . $indent, $value);
        }

        return !in_array($key, ['description', 'name', 'label'], true) ? $value : '"' . $value . '"';
    }

    private static function arr($arr, $skey, $depth, $type)
    {
        if (!is_numeric($skey)) {
            self::$lines[] = str_repeat(' ', $depth * 4 - 4) . $skey . ':';
        } else {
            $depth--;
        }
        foreach ($arr as $key => $value) {
            if (is_array($value)) {
                if (is_numeric($key)) {
                    self::$lines[] = str_repeat(' ', $depth * 4 - 4) . '-';
                }
                self::arr($value, $key, $depth + 1, 'arr');
            } else {
                self::$lines[] = str_repeat(' ', $depth * 4) . $key . ': ' . self::quoted($key, $value, $depth);
            }
        }
    }

}
