<?php

namespace App\Console\Commands;

use App\Models\Eloquent\WidgetTemplate;
use Illuminate\Console\Command;

class DragrrConfigWidgets extends Command
{

    protected $signature = 'dragrr:config:widgets';

    protected $description = 'Create widgets in database from config';

    public function handle()
    {

        foreach (config('dragrr.widget-templates') as $templated) {

            $template = (object) $templated;

            $name = $template->name;
            $type = $template->type;
            unset($templated['name']);
            unset($templated['type']);

            WidgetTemplate::updateOrCreate(
                [
                    'name' => $name,
                    'type' => $type,
                ],
                $templated
            );

        }

    }

}
