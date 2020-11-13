<?php

namespace App\Console\Commands;

use App\Models\Eloquent\TemplatedElement;
use Illuminate\Console\Command;

class DragrrConfigElements extends Command
{

    protected $signature = 'dragrr:config:elements';

    protected $description = 'Create elements in database from config';

    public function handle()
    {

        foreach (config('dragrr.elements.templates') as $templated) {

            $template = (object) $templated;

            $name = $template->name;
            $type = $template->type;
            unset($templated['name']);
            unset($templated['type']);

            TemplatedElement::updateOrCreate(
                [
                    'name' => $name,
                    'type' => $type,
                ],
                $templated
            );

        }

    }

}
