<?php

namespace App\Console\Commands;

use App\Http\Traits\SimpleIndent;
use App\Models\Eloquent\Content;
use Illuminate\Console\Command;

class DragrrConfigContent extends Command
{

    use SimpleIndent;

    protected $signature = 'dragrr:config:content';

    protected $description = 'Create default content data in database.';

    public function handle()
    {

        Content::updateOrCreate(
            [
                'pathslug' => '---website',
            ],
            [
                'name'     => 'website',
                'type'     => 'website',
                'language' => 'en',
                'label'    => 'Global website data',
                'status'   => 'private',
                'data'     => config('dragrr.contents.website'),
            ]
        );
        Content::updateOrCreate(
            [
                'pathslug' => 'composed',
            ],
            [
                'name'     => 'composed',
                'type'     => 'page',
                'language' => 'en',
                'label'    => 'Composed test data',
                'status'   => 'private',
                'data'     => config('dragrr.contents.content'),
            ]
        );

    }

}
