<?php

namespace App\Console\Commands;

use App\Models\Eloquent\LayoutTemplate;
use Illuminate\Console\Command;

class DragrrConfigLayouts extends Command
{

    protected $signature = 'dragrr:config:layouts';

    protected $description = 'Fill rows in database from config';

    public function handle()
    {

        foreach (config('dragrr.layout-templates') as $templated) {

            $template = (object) $templated;

            $name = $template->name;
            $type = $template->type;
            unset($templated['name']);
            unset($templated['type']);

            LayoutTemplate::updateOrCreate(
                [
                    'name' => $name,
                    'type' => $type,
                ],
                $templated
            );

        }

    }

}
