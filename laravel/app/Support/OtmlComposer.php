<?php

namespace App\Support;

use App\Models\Eloquent\Content;
use App\Models\Eloquent\Image;
use App\Models\Eloquent\Otml;
use Illuminate\Mail\Markdown;
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
    protected $missing;
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

        // dd($this->output, $this->pagedata);

        $this->replaceFillers();

        // keep filling untill done...
        $maxDepth = 0;
        $this->extractBrostages();
        while (($maxDepth < 100) && (count($this->brostages) > 0)) {

            $this->extractStubNames();
            $this->replaceStubs();

            $this->extractFillerNames();
            $this->missingFillerNames();
            $this->loadMissingFillers();

            $this->replaceFillers();

            $this->extractBrostages();
        }

        $this->convertMarkdown();

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

        //
        $website = Content::query()
            ->whereName($websitename)
            ->whereType('website')
            ->firstOrFail();

        //
        $content = Content::query()
            ->whereName($this->contentname)
            ->whereType('page')
            ->firstOrFail();

        $content = json_decode(json_encode($content->data), true);

        if (!isset($content['page'])) {
            $content = ['page' => $content];
        }

        //
        $images    = Image::select(['name', 'url'])->get()->keyBy('name');
        $imageurls = $images->map(function ($entry) {return $entry['url'];})->toArray();

        $system = [
            'image'  => $imageurls,
            'site'   => (array) $website->data,
            'system' => [
                'url'    => array_fallback($content, 'slug', config('app.url') . '/' . $this->contentname),
                'date'   => date("Ymd"),
                'time'   => date("H:i:s"),
                'utc'    => time(),
                'random' => strtolower(Str::random(8)),
            ],
        ];

        $this->pagedata = array_merge($system, $content);

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

    private function extractBrostages()
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

    private function extractStubNames()
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

    private function extractFillerNames()
    {
        foreach ($this->brostages as $brostage => $locator) {
            if (strpos($brostage, ':') !== false) {

                list($category, $variable) = explode(':', $brostage);

                $this->varsnames[$category][$variable] = $locator;

            }
        }

        return $this;
    }

    private function missingFillerNames()
    {

        $this->missing = array_diff(
            array_keys($this->varsnames),
            array_keys($this->pagedata)
        );

        return $this;
    }

    private function loadMissingFillers()
    {
        if (count($this->missing) === 0) {
            return;
        }

        $collection = Content::select('name', 'data')
            ->whereIn('name', $this->missing)
            ->get()
            ->keyBy('name');

        $content = $collection->map(function ($entry) {
            return (array) $entry['data'];
        })->toArray();

        $this->pagedata = array_merge($this->pagedata, $content);

        $this->missing = [];
        return $this;
    }

    private function convertMarkdown()
    {
        if (!$this->hasMarkdown()) {
            return;
        }

        $re = '/\<markdown\>([\s\S]*?)\<\/markdown\>/m';
        preg_match_all($re, $this->output, $matches, PREG_SET_ORDER, 0);

        foreach ($matches as $match) {
            $replace  = $match[0];
            $markdown = $match[1];
            $markdown = str_replace('    ', "  \n\n", $markdown);

            $html = Markdown::parse($markdown);

            $this->output = str_replace($replace, $html, $this->output);

        }

    }

    private function hasMarkdown()
    {
        return strpos($this->output, '<markdown>') > 0;
    }

    private function getStubData($stub)
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

    private function getPageData($category, $key)
    {

        if (!isset($this->pagedata[$category])) {
            return '';
        }

        if (!isset($this->pagedata[$category][$key])) {
            return '';
        }

        // if request has past validation we can return the page:body
        if ($category . ':' . $key === 'page:body') {
            return join("\n        ", $this->pagedata['page']['body']);
        }

        return $this->pagedata[$category][$key];

    }

}
