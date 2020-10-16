<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\Eloquent\Image;
use Bespired\Imgur\Imgur;
use Illuminate\Http\Request;

class UploadController extends Controller
{

    public function upload(Request $request)
    {

        $file = $request->file('source');

        $fileName = $file->getClientOriginalName();
        $filePath = $file->getPathName();
        $fileInfo = (object) pathinfo($fileName);

        $imgur = new Imgur();
        $imgur->upload($filePath, $fileName);

        $image = new Image();

        $image->folder     = '';
        $image->name       = $fileInfo->filename;
        $image->extension  = $fileInfo->extension;
        $image->width      = $imgur->response->width;
        $image->height     = $imgur->response->height;
        $image->bytes      = $imgur->response->size;
        $image->url        = $imgur->response->link;
        $image->mimetype   = $imgur->response->type;
        $image->deletehash = $imgur->response->deletehash;

        $image->data = $imgur->response;

        $image->save();
        return;

    }

    private function uniqFilename($response)
    {
        $filename = $response->image->name;

        $exists = Image::whereName($filename)->count();
        if (!$exists) {return $filename;}

        $existname = sprintf('%s %sx%s', $filename, $response->image->width, $response->image->height);
        $exists    = Image::whereName($existname)->count();
        if (!$exists) {return $existname;}

        $count = 0;
        while ($exists) {
            $count++;
            $existname = sprintf('%s %s', $filename, $count);
            $exists    = Image::whereName($existname)->count();
        }
        return $existname;

    }
}
