<?php

namespace App\Console\Commands;

use App\Http\Traits\SimpleIndent;
use App\Models\Eloquent\Dson;
use App\Models\Eloquent\Otml;
use Illuminate\Console\Command;

class DragrrConfigContent extends Command
{

    use SimpleIndent;

    protected $signature = 'dragrr:config:content';

    protected $description = 'Create default content data in database.';

    public function handle()
    {

        $this->folders();
        $this->otmls();
        $this->dsons();
        $this->widgets();

    }

    private function widgets()
    {

        $elementTemplates = TemplatedElement::all()->keyBy('name');

        foreach (config('dragrr.widgets.templates') as $templated) {

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
        $this->info('All Widget rows exist or are created.');
    }

    private function otmls()
    {

        $pattern = sprintf("%s/stubs/*.html", resource_path());
        $stubs   = glob($pattern);

        foreach ($stubs as $stub) {
            $file = pathinfo($stub);

            $otml = file_get_contents($stub);

            Otml::updateOrCreate(
                [
                    'pathslug' => '---' . basename($file['basename']),
                ],
                [
                    'name'     => $file['filename'],
                    'type'     => 'stub',
                    'language' => null,
                    'label'    => ucwords(dekebab($file['filename'])),
                    'status'   => 'private',
                    'otml'     => $this->simpleIndent($otml, 2),
                ]
            );

        }

        Otml::updateOrCreate(
            [
                'pathslug' => '_',
            ],
            [
                'name'     => 'welcome',
                'type'     => 'page',
                'language' => 'en',
                'label'    => 'Laravel Welcome Page',
                'status'   => 'published',
                'otml'     => view('welcome')->render(),
            ]
        );

        Otml::updateOrCreate(
            [
                'pathslug' => 'page',
            ],
            [
                'name'     => 'page',
                'type'     => 'page',
                'language' => 'en',
                'label'    => 'Doodle Welcome Page',
                'status'   => 'private',
                'otml'     => view('base', ['url' => 'http://localhost/page'])->render(),
            ]
        );

        \Cache::tags('urls')->flush();

        $this->info('All Otml rows exist or are created.');
    }

    private function folders()
    {

        $publics = [
            'media',
            'media/fonts',
            'media/images',
        ];

        foreach ($publics as $public) {
            $this->createFolder(public_path($public));
        }

        $this->info('All Draggr folders exist or are created.');

    }

    private function createFolder($folder)
    {
        if (!file_exists($folder)) {
            mkdir($folder);
        }
    }

    private function dsons()
    {
        Dson::updateOrCreate(
            [
                'pathslug' => '---website',
            ],
            [
                'name'     => 'website',
                'type'     => 'website',
                'language' => 'en',
                'label'    => 'Global website data',
                'status'   => 'private',
                'data'     => config('dragrr.contents.website'),
            ]
        );
        Dson::updateOrCreate(
            [
                'pathslug' => 'composed',
            ],
            [
                'name'     => 'composed',
                'type'     => 'page',
                'language' => 'en',
                'label'    => 'Composed test data',
                'status'   => 'private',
                'data'     => config('dragrr.contents.content'),
            ]
        );
        $this->info('All Dson rows exist or are created.');
    }

}
