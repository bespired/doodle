<?php

namespace App\Http\Traits;

trait Decrypt
{

    public static function decrypt($data)
    {

        function unicode_decode($str)
        {
            return preg_replace_callback('/\\\\u([0-9a-fA-F]{4})/', function ($match) {
                return mb_convert_encoding(pack('H*', $match[1]), 'UTF-8', 'UCS-2BE');
            }, $str);
        }

        function deshuffle($string, $key, $lock)
        {
            $out = '';
            foreach (str_split($string) as $char) {
                $idx = strpos($lock, $char);
                $out .= $key[$idx];
            }
            return $out;
        }

        $keys = [
            'ABCDEFGHIJKLM',
            'NOPQRSTUVWXYZ',
            'abcdefghijklm',
            'nopqrstuvwxyz',
            '0123456789+/=',
        ];
        $key = str_split(join('', $keys));

        $d = [
            intval(date('w')) % 12,
            intval(date('j')) % 11,
            intval(date('n')) % 10,
            intval(date('Y')) % 9,
            intval(date('w')) % 8,
        ];

        for ($r = 0; $r < 5; $r++) {
            $keys[$r] = substr($keys[$r], $d[$r]) . substr($keys[$r], 0, $d[$r]);
        }
        $lock = join('', $keys);

        foreach ($data as $label => $value) {
            $encrypted = str_replace('*', '', $value);
            $base64    = deshuffle($encrypted, $key, $lock);
            $entity    = base64_decode($base64);
            $utf       = unicode_decode($entity);

            $decrypted[$label] = $utf;
        }

        return $decrypted;

    }

}
