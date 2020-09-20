<?php

namespace App\Http\Traits;

trait OtmlHtml
{

    private $otml;
    private $variables;

    public function inserts($otml)
    {
        $this->otml = $otml;

        $this->fetchVariableNames();

        $html = $otml;
        if ($this->variables) {

            foreach ($this->variables as $find => $variable) {

                switch ($variable) {
                    case "csrf-token":
                        $value = csrf_token();
                        break;
                    case "visitor-id":
                        $value = 'vi0';
                        break;

                    default:
                        $value = '';

                }

                $html = str_replace($find, $value, $html);

            }
        }

        return $html;

    }

    public function fetchVariableNames()
    {

        $re = '/\{\[([\s\S]+?)\]\}/m';
        preg_match_all($re, $this->otml, $matches, PREG_SET_ORDER, 0);

        if (count($matches) === 0) {
            return;
        }

        foreach ($matches as $match) {
            $variables[trim($match[0])] = trim($match[1]);
        }

        uksort($variables, function ($a, $b) {
            return strlen($b) - strlen($a);
        });

        $this->variables = $variables;

    }

}
