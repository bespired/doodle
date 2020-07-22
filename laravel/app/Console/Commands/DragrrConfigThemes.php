<?php

namespace App\Console\Commands;

use App\Models\Eloquent\TemplatedTheme;
use Illuminate\Console\Command;

class DragrrConfigThemes extends Command
{

    protected $signature = 'dragrr:config:themes';

    protected $description = 'Create themes in database from config';

    public function handle()
    {

        foreach (config('dragrr.themes.templates') as $templated) {

            $template = (object) $templated;

            $name = $template->name;
            $type = $template->type;
            unset($templated['name']);
            unset($templated['type']);

            TemplatedTheme::updateOrCreate(
                [
                    'name' => $name,
                    'type' => $type,
                ],
                $templated
            );

        }

    }

}
