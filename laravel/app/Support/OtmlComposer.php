<?php

namespace App\Support;

use App\Models\Eloquent\Content;
use App\Models\Eloquent\Otml;
use Illuminate\Support\Str;

class OtmlComposer
{

    protected $basestubname;
    protected $contentname;
    protected $input;
    protected $output;
    protected $brostages;
    protected $stubnames;
    protected $loadnames;
    protected $varsnames;
    protected $stubs;
    protected $pagedata;

    public function compose($basestubname, $contentname)
    {
        $this->basestubname = $basestubname;
        $this->contentname  = $contentname;

        $this->loadIndex();
        $this->loadContent();
        $this->loadStubs();

        $this->extractBrostages();
        $this->extractStubNames();
        $this->replaceStubs();

        $this->extractBrostages();
        $this->extractFillerNames();

        $this->replaceFillers();

        // keep filling untill done...
        $maxDepth = 0;
        $this->extractBrostages();
        while (($maxDepth < 100) && (count($this->brostages) > 0)) {

            $this->extractStubNames();
            $this->replaceStubs();

            $this->extractFillerNames();
            $this->replaceFillers();

            $this->extractBrostages();
        }

        return $this->output;
    }

    /////

    private function loadIndex()
    {
        $this->input = Otml::query()
            ->whereType('stub')
            ->whereStatus('private')
            ->whereName($this->basestubname)
            ->firstOrFail();

        $this->output = $this->input->otml;

        return $this;
    }

    private function loadContent()
    {

        $websitename = 'website';

        $website = Content::query()
            ->whereName($websitename)
            ->whereType('website')
            ->firstOrFail();

        $content = Content::query()
            ->whereName($this->contentname)
            ->whereType('page')
            ->firstOrFail();
        $content = json_decode(json_encode($content->data), true);

        $system = [
            'site'   => (array) $website->data,
            'system' => [
                'url'    => config('app.url') . '/' . $this->contentname,
                'date'   => date("Ymd"),
                'time'   => date("H:i:s"),
                'utc'    => time(),
                'random' => strtolower(Str::random(8)),
            ],
        ];

        $this->pagedata = array_merge($system, $content);

        // dd($this->pagedata);

        return $this;
    }

    private function loadStubs()
    {
        // just load all stubs...
        $this->stubs = Otml::query()
        // ->whereIn('name', $this->loadnames)
            ->whereStatus('private')
            ->whereType('stub')
            ->get()
            ->keyBy('name');

        return $this;

    }

    private function replaceFillers()
    {

        $compose = $this->output;

        foreach ($this->varsnames as $category => $values) {
            foreach ($values as $key => $locator) {
                $compose = str_replace($locator, $this->getPageData($category, $key), $compose);
            }
        }

        $this->output = $compose;

        return $this;
    }

    private function replaceStubs()
    {
        $compose = $this->output;

        foreach ($this->stubnames as $stub => $locator) {
            $compose = str_replace($locator, $this->getStubData($stub), $compose);
        }

        $this->output = $compose;

        return $this;
    }

    public function extractBrostages()
    {
        $this->brostages = [];

        $re = '/\{\!(.+?)[\s]*\/?[\s]*\!\}/i';
        preg_match_all($re, $this->output, $matches, PREG_SET_ORDER, 0);

        if (count($matches) === 0) {
            return $this->brostages;
        }

        foreach ($matches as $match) {
            $this->brostages[trim($match[1])] = $match[0];
        }
        return $this;
    }

    public function extractStubNames()
    {
        foreach ($this->brostages as $brostage => $locator) {
            if (strpos($brostage, ':') === false) {
                $stubname = explode('--', $brostage)[0];

                $this->stubnames[$brostage] = $locator;
                $this->loadnames[$stubname] = $stubname;
            }
        }

        return $this;
    }

    public function extractFillerNames()
    {
        foreach ($this->brostages as $brostage => $locator) {
            if (strpos($brostage, ':') !== false) {

                list($category, $variable) = explode(':', $brostage);

                $this->varsnames[$category][$variable] = $locator;

            }
        }
        return $this;
    }

    public function getStubData($stub)
    {

        // rename instances to root name of the stub
        $stubname = explode('--', $stub)[0];

        if (!isset($this->stubs[$stubname])) {
            return '';
        }

        // rename instances to variables that contain data
        $stubby = trim($this->stubs[$stubname]->otml);

        $find = '{! self:';
        $repl = '{! ' . $stub . ':';

        return str_replace($find, $repl, $stubby);

    }

    public function getPageData($category, $key)
    {

        if (!isset($this->pagedata[$category])) {
            return '';
        }

        if (!isset($this->pagedata[$category][$key])) {
            return '';
        }

        if ($category . ':' . $key === 'page:body') {
            return join("\n        ", $this->pagedata[$category][$key]);
        }

        return $this->pagedata[$category][$key];

    }

}
