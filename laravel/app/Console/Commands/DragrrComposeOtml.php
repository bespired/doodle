<?php

namespace App\Console\Commands;

use App\Models\Eloquent\Otml;
use App\Support\OtmlComposer;
use Illuminate\Console\Command;

class DragrrComposeOtml extends Command
{

    protected $signature = 'dragrr:compose:otml';

    protected $description = 'Create default otml.';

    public function handle()
    {

        $composer = new OtmlComposer();

        $path     = 'composed';
        $pathslug = pathslug($path);

        Otml::updateOrCreate(
            [
                'pathslug' => $path,
            ],
            [
                'name'     => 'composed',
                'type'     => 'page',
                'language' => 'en',
                'label'    => 'Page compose test',
                'status'   => 'published',
                'otml'     => $composer->compose('index', $path),
            ]
        );

        \Cache::tags($pathslug)->flush();

        dd('done');

    }

}
