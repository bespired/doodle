<?php

namespace App\Console\Commands;

use App\Models\Eloquent\Otml;
use Illuminate\Console\Command;

class DragrrConfigOtml extends Command
{

    protected $signature = 'dragrr:config:otml';

    protected $description = 'Create default otml in database.';

    public function handle()
    {

        Otml::updateOrCreate(
            [
                'pathslug' => '_',
            ],
            [
                'name'   => 'welcome',
                'type'   => 'page',
                'label'  => 'Laravel Welcome Page',
                'status' => 'published',
                'otml'   => view('welcome')->render(),
            ]
        );

        Otml::updateOrCreate(
            [
                'pathslug' => 'page',
            ],
            [
                'name'   => 'page',
                'type'   => 'page',
                'label'  => 'Doodle Welcome Page',
                'status' => 'private',
                'otml'   => view('base', ['url' => 'http://localhost/page'])->render(),
            ]
        );

        \Cache::tags('urls')->flush();

    }

}
