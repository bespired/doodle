<?php

namespace App\Support;

use App\Models\Eloquent\Scss;
use ScssPhp\ScssPhp\Compiler;

class SassComposer
{

    public $url;

    public function compose($filename = 'stylesheet.css', $path = '/css/')
    {
        $compiledCss = [];
        $filepath    = public_path() . $path . $filename;

        $scssx = Scss::query()
            ->whereType('scss')
            ->ordered();

        $compiler = new Compiler();
        $compiler->setEncoding('UTF-8');

        foreach ($scssx as $scss) {

            // upload fonts?
            $sx = $scss->scss;
            $re = '/(content:[\s]*[\"|\'](\\\\[\S]{1,4})[\"|\'])/m';
            preg_match_all($re, $sx, $matches, PREG_SET_ORDER, 0);

            if (count($matches)) {

                foreach ($matches as $match) {
                    $id      = str_replace('\\', '', $match[2]);
                    $finds[] = $match[0];
                    $reps[]  = 'content: "xxx-' . $id . '-xxx"';
                }
                $sx       = str_replace($finds, $reps, $sx);
                $compiled = $compiler->compile($sx);
                $compiled = str_replace($reps, $finds, $compiled);

            } else {

                $compiled = $compiler->compile($sx);

            }

            $compiledCss[] = $compiled;

        }

        $minimized = $this->minimizeCSSsimple(join("\n", $compiledCss));

        // dd($minimized);

        file_put_contents($filepath, $minimized);

        $this->url = '.' . $path . $filename;

    }

    public function minimizeCSSsimple($css)
    {
        $css = preg_replace('/\/\*((?!\*\/).)*\*\//', '', $css);
        // negative look ahead
        $css = preg_replace('/\s{2,}/', ' ', $css);
        $css = preg_replace('/\s*([:;{}])\s*/', '$1', $css);
        $css = preg_replace('/;}/', '}', $css);
        return $css;
    }

}
