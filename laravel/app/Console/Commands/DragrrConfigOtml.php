<?php

namespace App\Console\Commands;

use App\Http\Traits\SimpleIndent;
use App\Models\Eloquent\Otml;
use Illuminate\Console\Command;

class DragrrConfigOtml extends Command
{

    use SimpleIndent;

    protected $signature = 'dragrr:config:otml';

    protected $description = 'Create default otml in database.';

    public function handle()
    {

        $pattern = sprintf("%s/stubs/*.html", resource_path());
        $stubs   = glob($pattern);

        foreach ($stubs as $stub) {
            $file = pathinfo($stub);

            $otml = file_get_contents($stub);

            Otml::updateOrCreate(
                [
                    'pathslug' => '---' . basename($file['basename']),
                ],
                [
                    'name'   => $file['filename'],
                    'type'   => 'stub',
                    'label'  => ucwords(dekebab($file['filename'])),
                    'status' => 'private',
                    'otml'   => $this->simpleIndent($otml, 2),
                ]
            );

        }

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
