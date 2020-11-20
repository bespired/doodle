<?php

namespace App\Http\Controllers\JsonApi;

use App\Http\Controllers\Controller;
use App\Jobs\UploadImage;
use App\Models\Eloquent\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ImageController extends Controller
{

    public function url($name)
    {
        $imageDb = Image::where('name', $name)->where('folder', 'doodle')->first();
        if (!$imageDb) {
            return null;
        }
        return response()->json($imageDb);
    }

    public function remove(Request $request)
    {

        $folder = $request->input('folder');
        $name   = $request->input('name');

        // remove folder...
        if (!$name) {

            $imgs = Image::where('folder', $folder)->get();

            foreach ($imgs as $imageDb) {
                $this->deleteImgUr($imageDb);
                $imageDb->delete();
            }

            return response()->json(['removed folder']);
        }

        // remove image...
        $imageDb = Image::where('name', $name)->where('folder', $folder)->first();

        if (!$imageDb) {
            return response()->json(['not found']);
        }

        $this->deleteImgUr($imageDb);
        $imageDb->delete();

        return response()->json(['removed']);

    }

    private function deleteImgUr($imageDb)
    {

        if (!$imageDb) {
            return;
        }

        if ($imageDb->deletehash) {
            $imgur = new \Bespired\Imgur\Imgur();
            $imgur->delete($imageDb->deletehash);
        }

        return;

    }

    // --

    public function upload(Request $request)
    {

        $folder = $request->input('folder');
        $owner  = $request->input('owner');

        $imageName = $request->image->getClientOriginalName();
        $extension = $request->image->extension();
        $baseName  = Str::slug(substr($imageName, 0, -strlen($extension)));
        $imageName = $owner ? Str::slug($owner) . '--' . $baseName : $baseName;

        // if its an owner then it doesnt matter what the name of the image is...
        // the image belongs to the owner. ( an image input field. )

        if ($owner) {
            $imageName = $owner;
            $folder    = 'doodle';

            $imageDb = Image::where('name', $owner)->where('folder', $folder)->first();
            if (!$imageDb) {

                $imageDb = new Image();

            } else {

                // if has deletehash then it's already uploaded
                // and that remote file needs to be deleted

                $this->deleteImgUr($imageDb);

            }

        } else {

            $exists = Image::where('name', $imageName)->where('folder', $folder)->first();

            if ($exists) {
                $short     = base_convert(time(), 10, 36);
                $imageName = $baseName . '--' . $short;
            }

            $imageDb = new Image();

        }

        $filename = $imageName . '.' . $extension;
        $filepath = public_path('images') . '/' . $filename;
        $request->image->move(public_path('images'), $filename);
        $url      = config('app.url') . '/images/' . $filename;
        $bytes    = filesize($filepath);
        $mimetype = mime_content_type($filepath);

        list($width, $height, $type, $attr) = getimagesize($filepath);

        $imageDb->name      = $imageName;
        $imageDb->extension = $extension;
        $imageDb->folder    = $folder;
        $imageDb->url       = $url;
        $imageDb->width     = $width;
        $imageDb->height    = $height;
        $imageDb->mimetype  = $mimetype;
        $imageDb->bytes     = $bytes;
        $imageDb->file      = $filename;
        $imageDb->status    = 'local';
        $imageDb->save();

        $data = [
            'folder' => $folder,
            'image'  => $imageName,
        ];

        UploadImage::dispatch($imageDb->handle)->delay(now()->addMinutes(3));

        return response()->json(['okay' => $imageDb->handle]);

    }

}
