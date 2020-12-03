<?php

namespace App\Console\Commands;

use App\Models\Eloquent\TemplatedWidget;
use Illuminate\Console\Command;

class DragrrConfigWidgets extends Command
{

    protected $signature = 'dragrr:config:widgets';

    protected $description = 'Create widgets in database from config';

    public function handle()
    {

        foreach (config('dragrr.widgets.templates') as $templated) {

            $template = (object) $templated;

            TemplatedWidget::updateOrCreate(
                [
                    'name' => $template->name,
                    'type' => $template->type,
                ], [
                    'elements' => $template->elements,
                    'status'   => 'saved',
                ]
            );

        }

    }

}
