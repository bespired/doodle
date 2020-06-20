<?php

namespace App\Console\Commands;

use App\Models\Eloquent\TemplatedElement;
use App\Models\Eloquent\TemplatedWidget;
use Illuminate\Console\Command;

class DragrrConfigWidgets extends Command
{

    protected $signature = 'dragrr:config:widgets';

    protected $description = 'Create widgets in database from config';

    public function handle()
    {

        $elementTemplates = TemplatedElement::all()->keyBy('name');

        foreach (config('dragrr.widget-templates') as $templated) {

            $template = (object) $templated;

            $name = $template->name;
            $type = $template->type;
            unset($templated['name']);
            unset($templated['type']);

            $elements = [];
            foreach ($template->elements as $idx => $element) {

                $chunks = explode('-', $elementTemplates[$element->name]->handle);
                $handle = sprintf('%s-%s-%s%s', $chunks[0], $chunks[1], substr($chunks[2], 0, 4), $idx);

                $elements[] = (object) [
                    "id"      => $idx,
                    "handle"  => $handle,
                    "name"    => $element->name,
                    "element" => $elementTemplates[$element->name]->handle,
                    "label"   => $elementTemplates[$element->name]->label,
                ];
            }

            $templated['elements'] = $elements;

            TemplatedWidget::updateOrCreate(
                [
                    'name' => $name,
                    'type' => $type,
                ],
                $templated
            );

        }

    }

}
