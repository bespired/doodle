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
    protected $varsnames;
    protected $stubs;
    protected $pagedata;

    public function compose($basestubname, $contentname)
    {
        $this->basestubname = $basestubname;
        $this->contentname  = $contentname;

        $this->loadIndex();
        $this->loadContent();
        $this->extractBrostages();
        $this->extractStubNames();
        $this->loadStubs();

        $this->replaceStubs();

        $this->extractBrostages();
        $this->extractFillerNames();

        $this->replaceFillers();

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

        $this->pagedata = [
            'site'   => (array) $website->data,
            'page'   => (array) $content->data,
            'system' => [
                'url'    => config('app.url') . '/' . $this->contentname,
                'date'   => date("Ymd"),
                'time'   => date("H:i:s"),
                'utc'    => time(),
                'random' => strtolower(Str::random(8)),
            ],
        ];

        return $this;
    }

    private function loadStubs()
    {
        $this->stubs = Otml::query()
            ->whereType('stub')
            ->whereStatus('private')
            ->whereIn('name', array_keys($this->stubnames))
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
                $this->stubnames[$brostage] = $locator;
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

        return isset($this->stubs[$stub]) ? trim($this->stubs[$stub]->otml) : '';

    }

    public function getPageData($category, $key)
    {

        if (!isset($this->pagedata[$category])) {
            return '';
        }

        if (!isset($this->pagedata[$category][$key])) {
            return '';
        }

        return $this->pagedata[$category][$key];

    }

}
