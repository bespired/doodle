<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DragrrConfigFolders extends Command
{

    protected $signature = 'dragrr:config:folders';

    protected $description = 'Create folders for public and storage';

    public function handle()
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

}
