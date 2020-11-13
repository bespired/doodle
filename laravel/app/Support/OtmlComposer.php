<?php

namespace App\Support;

use App\Http\Traits\SimpleIndent;
use App\Models\Eloquent\Dson;
use App\Models\Eloquent\Image;
use App\Models\Eloquent\Otml;
use Illuminate\Mail\Markdown;
use Illuminate\Support\Str;

class OtmlComposer
{

    use SimpleIndent;

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
    protected $repeats;

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

            // dump($this->output);

        }

        $this->convertMarkdown();
        $this->repeaterLabels();

        // try catch for error?
        return $this->simpleIndent($this->output);

        // return $this->output;
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
        $website = Dson::query()
            ->whereName($websitename)
            ->whereType('website')
            ->firstOrFail();

        //
        $content = Dson::query()
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

        // \Log::info('stubnames');
        // \Log::info(json_encode($this->stubnames));
        // \Log::info(json_encode($this->loadnames));

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

        // \Log::info('varsnames');
        // \Log::info(json_encode($this->varsnames));

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

        $collection = Dson::select('name', 'data')
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

    // change <!-- repeat --> into data-repeat=
    private function repeaterLabels()
    {
        $compose = $this->output;

        $res = '/<!-- repeat start : ([\s\S]*?) -->/m';
        $ree = '/<!-- repeat end : ([\s\S]*?) -->/m';

        $re = '/<!-- repeat start [\s\S]*?<!-- repeat end : ([\s\S]*?) -->/m';
        preg_match_all($re, $compose, $matches, PREG_SET_ORDER, 0);

        if (count($matches) == 0) {
            return;
        }

        foreach ($matches as $match) {
            $chars  = str_split($compose);
            $find   = $match[0];
            $repeat = $match[1];

            $replace = preg_replace($res, '', $find);
            $replace = preg_replace($ree, '', $replace);

            // find previous tag to inject the repeat data in.
            $begin = strpos($compose, $find);

            $tagPos = $begin - 1;
            while ($chars[$tagPos] !== '<') {$tagPos--;}
            $prevTag = substr($compose, $tagPos, $begin - $tagPos);
            $tagLen  = strlen($prevTag);

            // inject the repeat in precending tag ( matched 1 so [1][0] )
            $inject  = sprintf(' data-repeat="%s"', $repeat);
            $hookpos = strpos($prevTag, '>');
            $newTag  = substr($prevTag, 0, $hookpos) . $inject . substr($prevTag, $hookpos);

            // cut out old tag, replace with new tag
            // then find repeats and replace with remark removed repeats

            $compose = substr($compose, 0, $tagPos) . $newTag . substr($compose, $tagPos + $tagLen);
            $compose = str_replace($find, trim($replace), $compose);

        }

        $this->output = $compose;

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

        $stubby = $this->editable($stubby, $stub);

        $repl = '{! ' . $stub . ':';

        $finds = ['{! self:', '{! :', '{!self:', '{!:'];
        $repls = [$repl, $repl, $repl, $repl];

        return str_replace($finds, $repls, $stubby);

    }

    private function getPageData($category, $key)
    {

        if (!isset($this->pagedata[$category])) {

            return $this->actions($category, $key);

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

    private function repeat($key)
    {
        // do the repeat creation only once.
        if (isset($this->repeats[$key])) {
            return $this->repeats[$key];
        }

        // figure out how many repeats
        $re = '/\[([0-9\ \,\*]*?)\]/m';
        preg_match_all($re, $key, $matches, PREG_SET_ORDER, 0);

        if (count($matches) == 0) {
            return '';
        }

        $stub = explode('[', $key)[0];
        $ids  = explode(',', $matches[0][1]);

        if ($ids[0] == '*') {

            $repeat = $this->loadIdsOf($stub);

        } else {

            $repeat = [];
            foreach ($ids as $id) {
                $repeat[] = sprintf("{! %s--%s !}\n", $stub, $id);
            }

        }

        $otml[] = "<!-- repeat start : $key --> \n";
        $otml[] = join('', $repeat);
        $otml[] = "<!-- repeat end : $key --> \n";

        $this->repeats[$key] = join('', $otml);

        return join('', $otml);
    }

    private function editable($otml, $stub)
    {

        $name = explode('--', $stub)[0];

        $tags = ['section', 'header', 'footer', 'div', 'li'];

        foreach ($tags as $tag) {

            $ltml       = trim($otml);
            $starthook  = sprintf('<%s>', $tag);
            $startspace = sprintf('<%s ', $tag);
            $slen       = strlen($starthook);
            $chop       = substr($ltml, 0, $slen);
            $repl       = sprintf('<%s data-stub="%s" data-id="%s" ', $tag, $name, $stub);

            if ($chop === $starthook) {
                $start = strpos($otml, $starthook);
                $otml  = substr($otml, 0, $start) . $repl . '>' . substr($otml, $start + $slen);
            }
            if ($chop === $startspace) {
                $start = strpos($otml, $startspace);
                $otml  = substr($otml, 0, $start) . $repl . substr($otml, $start + $slen);
            }
        }

        return $otml;
    }

    private function loadIdsOf($key)
    {
        $repeat = [];
        $loaded = Dson::select('name')
            ->whereType($key)
            ->get();

        foreach ($loaded as $load) {
            $repeat[] = sprintf("{! %s !}\n", $load->name);
        }

        return $repeat;
    }

    private function actions($category, $key)
    {
        $action = $category . ':' . $key;

        if ($action == 'compile:scss') {
            $comp = new \App\Support\SassComposer();
            $comp->compose();

            return $comp->url;
        }

        if ($category === 'repeat') {
            return $this->repeat($key);
        }

        return '';
    }

}
