<?php

namespace App\Console\Commands;

use App\Models\Eloquent\SectionTemplate;
use Illuminate\Console\Command;

class DragrrConfigSections extends Command
{

    protected $signature = 'dragrr:config:sections';

    protected $description = 'Create sections in database from config';

    public function handle()
    {

        foreach (config('dragrr.section-templates') as $templated) {

            $template = (object) $templated;

            $name = $template->name;
            $type = $template->type;
            unset($templated['name']);
            unset($templated['type']);

            SectionTemplate::updateOrCreate(
                [
                    'name' => $name,
                    'type' => $type,
                ],
                $templated
            );

        }

    }

}
