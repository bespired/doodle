<?php

namespace App\Http\Traits;

trait OtmlHtml
{

    private $otml;
    private $variables = [];
    private $payload;

    public function inserts($otml)
    {
        $this->otml = $otml;

        $this->pagePayload();

        $this->fetchVariableNames();

        $html = $otml;
        foreach ($this->variables as $find => $variable) {
            $value = !isset($this->payload[$variable]) ? '' : $this->payload[$variable];
            $html  = str_replace($find, $value, $html);
        }

        return $html;

    }

    public function pagePayload()
    {

        // Add Laravel CSRF just in case
        $this->payload['csrf-token'] = csrf_token();

        // if request has a Ovid cookie then use that.
        // if not then create an ovid
        $ovid = isset($_COOKIE['ovid']) ? $_COOKIE['ovid'] : uovid();

        $this->payload['visitor-id'] = $ovid;

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
