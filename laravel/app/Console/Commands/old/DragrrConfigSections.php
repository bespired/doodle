<?php

namespace App\Console\Commands;

use App\Models\Eloquent\TemplatedSection;
use Illuminate\Console\Command;

class DragrrConfigSections extends Command
{

    protected $signature = 'dragrr:config:sections';

    protected $description = 'Create sections in database from config';

    public function handle()
    {

        foreach (config('dragrr.sections.templates') as $templated) {

            $template = (object) $templated;

            $name = $template->name;
            $type = $template->type;
            unset($templated['name']);
            unset($templated['type']);

            TemplatedSection::updateOrCreate(
                [
                    'name' => $name,
                    'type' => $type,
                ],
                $templated
            );

        }

    }

}
