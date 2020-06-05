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
            LayoutTemplate::updateOrCreate(
                [
                    'name' => $template->name,
                    'type' => 'template',
                ], [
                    'label'      => ucfirst($template->name),
                    'background' => $template->background,
                    'fillstyle'  => $template->fillstyle,
                    'maxwidth'   => $template->maxwidth,
                    'columns'    => $template->columns,
                    'condition'  => $template->condition,
                    'draw'       => $template->draw,
                ]);

        }

    }

}
