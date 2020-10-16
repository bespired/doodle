<?php

namespace App\Console\Commands;

use App\Models\Eloquent\Content;
use App\Models\Eloquent\Otml;
use App\Support\OtmlComposer;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;

class DragrrComposePage extends Command
{

    protected $signature = 'dragrr:compose:page {--page=*}';

    protected $description = 'Create otml pages.';

    protected $pagesContents;

    public function handle()
    {

        $pages = $this->getPageNames();

        $composer = new OtmlComposer();

        foreach ($pages as $page) {

            Otml::updateOrCreate(
                [
                    'pathslug' => $page, // needs: read slug from page data
                ],
                [
                    'name'     => $page,
                    'type'     => 'page',
                    'language' => 'en',
                    'label'    => 'Page ' . dekebab($page),
                    'status'   => 'published',
                    'otml'     => $composer->compose('index', $page),
                ]
            );

            \Cache::tags($page)->flush();

        }

        dd('done');

    }

    private function getPageNames()
    {
        $options = $this->option('page');

        if ($options) {
            return $options;
        }

        return Arr::flatten(Content::select('name')
                ->whereType('page')
                ->get()
                ->toArray());
    }

}
