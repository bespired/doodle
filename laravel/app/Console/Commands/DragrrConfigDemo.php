<?php

namespace App\Console\Commands;

use App\Exceptions\JsonErrorException;
use App\Http\Traits\SimpleIndent;
use App\Models\Eloquent\Dson;
use App\Models\Eloquent\Image;
use App\Models\Eloquent\Otml;
use App\Models\Eloquent\Scss;
use App\Models\Eloquent\TemplatedWidget;
use Bespired\Imgur\Imgur;
use Illuminate\Console\Command;

class DragrrConfigDemo extends Command
{

    use SimpleIndent;

    protected $signature = 'dragrr:config:demo';

    protected $description = 'Create default demo in database.';

    protected $cssfonts = 10;
    protected $csshtml  = 100;
    protected $cssmain  = 200;

    public function handle()
    {
        $this->widgets();
        $this->otmls();
        $this->jsons();
        $this->scssx();
        $this->assets();
        $this->statics();

        $this->pages();
    }

    private function pages()
    {
        \Cache::tags('urls')->flush();
    }

    private function statics()
    {
        $pattern = sprintf("%s/demo/public/*", resource_path());
        $stats   = glob($pattern);
        foreach ($stats as $stat) {
            $file = pathinfo($stat);

            $srcname = $file['basename'];
            $ext     = $file['extension'];
            $parts   = explode('--', $srcname);
            $dstname = count($parts) > 1 ? $parts[1] : $srcname;

            $dst = $ext === 'js' ? 'js' : 'css';

            $fromPath = sprintf("%s/demo/public/%s", resource_path(), $srcname);
            $toPath   = sprintf("%s/%s/%s", public_path(), $dst, $dstname);

            if (file_exists($fromPath)) {
                copy($fromPath, $toPath);
                $this->addToStubs($ext, $dstname);
            }

        }
        $this->msg('Created statics.');
    }

    private function assets()
    {
        $pattern = sprintf("%s/demo/asset/*", resource_path());
        $imgs    = glob($pattern);
        foreach ($imgs as $img) {
            $this->createAsset($img);
        }
        $this->msg('Created assets.');
    }

    private function otmls()
    {
        $pattern = sprintf("%s/demo/otml/*.otml", resource_path());
        $stubs   = glob($pattern);

        foreach ($stubs as $stub) {
            $file = pathinfo($stub);

            $otml = file_get_contents($stub);

            // todo: strip off style...

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

        $this->msg('Created otmls.');
    }

    private function widgets()
    {
        $pattern = sprintf("%s/demo/widgets/*.json", resource_path());
        $widgets = glob($pattern);

        foreach ($widgets as $widget) {
            $file = pathinfo($widget);

            $payload = json_decode(file_get_contents($widget));

            if (!$payload) {
                throw new JsonErrorException("Error in " . $widget);
            }

            TemplatedWidget::updateOrCreate(
                [
                    'name' => $payload->name,
                ],
                [
                    'type'     => 'template',
                    'label'    => $payload->label,
                    'status'   => 'saved',
                    'elements' => $payload->data,
                ]
            );
        }

        $this->msg('Created widgets.');
    }

    private function scssx()
    {

        $pattern = sprintf("%s/demo/scss/*.scss", resource_path());
        $scsses  = glob($pattern);

        $order = 100;

        foreach ($scsses as $scss) {
            $file = pathinfo($scss);

            $content = file_get_contents($scss);
            $data    = $this->uploadFonts($content);

            Scss::updateOrCreate(
                [
                    'pathslug' => '---' . basename($file['basename']),
                ],
                [
                    'name'   => $file['filename'],
                    'type'   => 'scss',
                    'order'  => $this->getOrder($data, $order),
                    'label'  => ucwords(dekebab($file['filename'])),
                    'status' => 'demo',
                    'scss'   => $data,
                ]
            );

        }

        $this->msg('Created scss.');
    }

    private function jsons()
    {

        $pattern = sprintf("%s/demo/json/*.json", resource_path());
        $jsons   = glob($pattern);

        foreach ($jsons as $json) {
            $file = pathinfo($json);

            $payload = json_decode(file_get_contents($json));

            if (!$payload) {
                throw new JsonErrorException("Error in " . $json);
            }

            if (isset($payload->loaders)) {

                foreach ($payload->loaders as $loader) {
                    $this->setContent(
                        $loader->name,
                        $loader->type,
                        $loader->language,
                        $loader->label,
                        $payload->{$loader->name}
                    );
                }

            } else {

                if (isset($payload->repeat)) {
                    foreach (array_reverse($payload->repeat) as $idx => $entry) {
                        $this->setContent(
                            sprintf('%s--%s', $payload->loader->name, $idx + 1),
                            $payload->loader->type,
                            $payload->loader->language,
                            sprintf('%s %s', $payload->loader->label, $idx + 1),
                            $entry
                        );
                    }

                } else {

                    $this->setContent(
                        $payload->loader->name,
                        $payload->loader->type,
                        $payload->loader->language,
                        $payload->loader->label,
                        $payload->{$payload->loader->name}
                    );

                }
            }
        }
        $this->msg('Created jsons.');
    }

    private function createAsset($filePath)
    {

        $fileInfo = (object) pathinfo($filePath);
        $fileName = $fileInfo->filename;

        $image = Image::where('name', $fileName)->first();

        if ($image) {
            $this->msg('Skipping asset ' . $fileName . ' it already exists in database.');
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

        $this->msg('Created asset ' . $fileName);

        return;
    }

    private function setContent($name, $type, $language, $label, $data)
    {
        Dson::updateOrCreate(
            [
                'pathslug' => '---' . $name,
            ],
            [
                'status'   => 'private',
                'name'     => $name,
                'type'     => $type,
                'language' => $language,
                'label'    => $label,
                'data'     => $data,
            ]
        );
    }

    private function uploadFonts($css)
    {

        $toDir = sprintf("%s/font", public_path());
        if (!file_exists($toDir)) {
            mkdir($toDir);
        }

        if (strpos($css, '@font-face') === false) {
            return $css;
        }

        $mre = '/@font-face[\s\S]*?}/m';
        $sre = '/url\(([\s\S]*?)\)/m';

        preg_match_all($mre, $css, $matches, PREG_SET_ORDER, 0);

        foreach ($matches as $match) {

            preg_match_all($sre, $match[0], $files, PREG_SET_ORDER, 0);
            foreach ($files as $file) {
                $filename = str_replace("'", '', $file[1]);

                $fromPath = sprintf("%s/demo/font/%s", resource_path(), $filename);
                $toPath   = sprintf("%s/font/%s", public_path(), $filename);

                if (file_exists($fromPath)) {
                    copy($fromPath, $toPath);
                }

                // fix path in css...
                $url = sprintf('url(../font/%s)', $filename);
                $css = str_replace($file[0], $url, $css);

                $this->msg('Copied font ' . $filename);

            }
        }
        return $css;

    }

    private function addToStubs($ext, $name)
    {

        switch ($ext) {

            case "js":
                $stub = Otml::query()->where('type', 'stub')->where('name', 'post-scripts')->first();
                $add  = "\n" . sprintf('        <script type="text/javascript" src="js/%s"></script>', $name);

                if (!(strpos($stub->otml, $name) > 0)) {
                    $stub->otml .= $add;
                    $stub->save();
                }
                break;

            case "css":
                $stub = Otml::query()->where('type', 'stub')->where('name', 'stylesheets')->first();
                $add  = "\n" . sprintf('        <link rel="stylesheet" href="css/%s" >', $name);
                dump($stub->otml, $name, strpos($stub->otml, $name));

                if (!(strpos($stub->otml, $name) > 0)) {
                    $stub->otml .= $add;
                    $stub->save();
                }
                break;

        }

    }

    private function getOrder($data, $order)
    {

        $check = strtolower(str_replace(' ', '', $data));

        if (strpos($check, '@font-face') > -1) {
            return $this->cssfonts++;
        }
        if ((strpos($check, 'html{') > -1) or (strpos($check, '*{') > -1)) {
            return $this->csshtml++;
        }

        return $this->cssmain++;
    }

    private function msg($text)
    {
        if (app()->runningInConsole()) {
            $this->info($text);
        }
    }

}
