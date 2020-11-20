<?php

namespace App\Jobs;

use App\Models\Eloquent\Image;
use Bespired\Imgur\Imgur;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UploadImage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $handle;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($handle)
    {
        $this->handle = $handle;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $imageDb = Image::where('handle', $this->handle)->first();

        if (!$imageDb) {
            \Log::info('no UploadImage found with handle ' . $this->handle);
            return;
        }

        if ($imageDb->status != 'local') {
            \Log::info('image ' . $this->handle . ' is not local.');
            return;
        }

        $fileName = $imageDb->file;
        $filePath = public_path('images') . '/' . $fileName;

        if (!file_exists($filePath)) {
            \Log::info('image file "' . $filePath . '" not found. abort.');
            return;
        }

        $imgur = new Imgur();
        $imgur->upload($filePath, $fileName);

        $imageDb->status     = 'remote';
        $imageDb->width      = $imgur->response->width;
        $imageDb->height     = $imgur->response->height;
        $imageDb->bytes      = $imgur->response->size;
        $imageDb->url        = $imgur->response->link;
        $imageDb->mimetype   = $imgur->response->type;
        $imageDb->deletehash = $imgur->response->deletehash;

        $imageDb->data = $imgur->response;

        $imageDb->save();

        unlink($filePath);

    }
}
