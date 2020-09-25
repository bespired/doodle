<?php

namespace App\Http\Traits;

trait SimpleIndent
{

    public function simpleIndent($lines, $amount = 0)
    {
        $rows    = [];
        $indents = [];

        foreach (explode("\n", $lines) as $row) {
            $rows[] = trim($row);
        }

        if ($rows[0] === '<!doctype html>') {
            $amount = 0;
        }

        $ref = '/<(.+?)[\s]*\/?[\s]*>/i';
        $rep = '/<!--(.+?)-->/i';

        foreach ($rows as $idx => $row) {

            $indents[$idx] = 0;
            // remove single line remarks for counting indent
            $row = preg_replace($rep, '', $row, 1);

            preg_match_all($ref, $row, $matches, PREG_SET_ORDER, 0);
            if (count($matches) === 0) {
                continue;
            }

            $nextIndent = 0;
            foreach ($matches as $match) {
                $tag = strtolower($match[0]);

                $open   = substr($tag, 0, 2) !== '</';
                $closed = substr($tag, 0, 2) === '</';
                $single = substr($tag, 0, -2) === '/>';
                $meta   = (!$single) && (substr($tag, 0, 5) === '<meta');
                $meta |= (!$single) && (substr($tag, 0, 5) === '<link');
                $meta |= (!$single) && (substr($tag, 0, 3) === '<br');
                $meta |= (!$single) && (substr($tag, 0, 4) === '<img');
                $meta |= (!$single) && (substr($tag, 0, 9) === '<!doctype');

                if ($open) {
                    $nextIndent++;
                }
                if ($closed || $single || $meta) {
                    $nextIndent--;
                }

                $indents[$idx] = $nextIndent;

            }

        }

        $indent = $amount;
        foreach ($rows as $idx => $row) {

            if ($indents[$idx] < 0) {
                $indent += $indents[$idx];
            }

            $rows[$idx] = str_repeat('    ', $indent) . $row;

            if ($indents[$idx] > 0) {
                $indent += $indents[$idx];
            }

            // echo "- " . $indents[$idx] . $rows[$idx] . "\n";
        }

        return join("\n", $rows);
    }
}
