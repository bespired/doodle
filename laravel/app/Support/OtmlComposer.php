<?php

namespace App\Support;

use App\Models\Eloquent\Otml;

class OtmlComposer
{

    protected $basestubname;
    protected $input;
    protected $output;
    protected $brostages;
    protected $stubnames;
    protected $stubs;

    public function compose($basestubname)
    {
        $this->basestubname = $basestubname;

        $this->load();
        $this->extractBrostages();
        $this->extractStubNames();
        $this->loadStubs();

        $this->replaceStubs();
        // recursive or flatten untill every brostage is replaced?
        // latter sounds more memory friendly

        return $this->output;
    }

    /////

    private function load()
    {
        $this->input = Otml::query()
            ->whereType('stub')
            ->whereStatus('private')
            ->whereName($this->basestubname)
            ->firstOrFail();

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

    private function replaceStubs()
    {
        $compose = $this->input->otml;

        foreach ($this->stubnames as $stub => $locator) {
            $otml    = isset($this->stubs[$stub]) ? trim($this->stubs[$stub]->otml) : '';
            $compose = str_replace($locator, $otml, $compose);
        }

        $this->output = $compose;

        return $this;
    }

    public function extractBrostages()
    {
        $this->brostages = [];

        $re = '/\{\!(.+?)[\s]*\/?[\s]*\!\}/i';
        preg_match_all($re, $this->input, $matches, PREG_SET_ORDER, 0);

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

}
