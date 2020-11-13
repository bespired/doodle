<?php

namespace App\Console\Commands;

use App\Models\Eloquent\TemplatedClass;
use Illuminate\Console\Command;

class DragrrConfigClasses extends Command
{

    protected $signature = 'dragrr:config:classes';

    protected $description = 'Create classes in database from config';

    public function handle()
    {

        foreach (config('dragrr.classes.templates') as $templated) {

            $template = (object) $templated;

            $name = $template->name;
            $type = $template->type;
            unset($templated['name']);
            unset($templated['type']);

            TemplatedClass::updateOrCreate(
                [
                    'name' => $name,
                    'type' => $type,
                ],
                $templated
            );

        }

    }

}
