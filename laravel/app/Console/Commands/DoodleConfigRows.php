<?php

namespace App\Console\Commands;

use App\Models\Eloquent\RowTemplate;
use Illuminate\Console\Command;

class DoodleConfigRows extends Command
{

    protected $signature = 'doodle:config:rows';

    protected $description = 'Fill rows in database from config';

    public function handle()
    {

        foreach (config('seeds.rowtemplates') as $templated) {

            $template = (object) $templated;
            RowTemplate::updateOrCreate(
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
