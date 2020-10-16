<?php

namespace App\Console\Commands;

use App\Http\Traits\SimpleIndent;
use App\Models\Eloquent\Content;
use App\Models\Eloquent\Image;
use App\Models\Eloquent\Otml;
use Bespired\Imgur\Imgur;
use Illuminate\Console\Command;

class DragrrConfigDemo extends Command
{

    use SimpleIndent;

    protected $signature = 'dragrr:config:demo';

    protected $description = 'Create default demo in database.';

    public function handle()
    {

        $this->otmls();
        $this->jsons();
        $this->assets();

        $this->pages();
    }

    private function pages()
    {
        \Cache::tags('urls')->flush();
    }

    private function assets()
    {
        $pattern = sprintf("%s/demo/assets/*", resource_path());
        $imgs    = glob($pattern);
        foreach ($imgs as $img) {
            $this->createAsset($img);
        }
    }

    private function otmls()
    {
        $pattern = sprintf("%s/demo/*.otml", resource_path());
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
    }

    private function jsons()
    {

        $pattern = sprintf("%s/demo/*.json", resource_path());
        $jsons   = glob($pattern);

        foreach ($jsons as $json) {
            $file = pathinfo($json);

            $payload = json_decode(file_get_contents($json));
            // dd($payload);

            Content::updateOrCreate(
                [
                    'pathslug' => '---' . $payload->loader->name,
                ],
                [
                    'status'   => 'private',
                    'name'     => $payload->loader->name,
                    'type'     => $payload->loader->type,
                    'language' => $payload->loader->language,
                    'label'    => $payload->loader->label,
                    'data'     => $payload->{$payload->loader->name},
                ]
            );
        }
    }

    private function createAsset($filePath)
    {

        $fileInfo = (object) pathinfo($filePath);
        $fileName = $fileInfo->filename;

        $image = Image::where('name', $fileName)->first();

        if ($image) {
            if (app()->runningInConsole()) {
                $this->info('Skipping asset ' . $fileName . ' it already exists in database.');
            }
            return;
        }

        // --- Create if non exists

        $imgur = new Imgur();
        $imgur->upload($filePath, $fileName);

        $image = new Image();

        $image->folder     = 'demo';
        $image->name       = $fileName;
        $image->extension  = $fileInfo->extension;
        $image->width      = $imgur->response->width;
        $image->height     = $imgur->response->height;
        $image->bytes      = $imgur->response->size;
        $image->url        = $imgur->response->link;
        $image->mimetype   = $imgur->response->type;
        $image->deletehash = $imgur->response->deletehash;

        $image->data = $imgur->response;

        $image->save();

        if (app()->runningInConsole()) {
            $this->info('Created asset ' . $fileName);
        }

        return;
    }

}
