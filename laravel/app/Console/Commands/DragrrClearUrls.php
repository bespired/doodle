<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DragrrClearUrls extends Command
{

    protected $signature = 'dragrr:clear:urls';

    protected $description = 'Clear Dragger urls in redis cache';

    public function handle()
    {

        \Cache::tags('urls')->flush();
        $this->info('All Draggr slugged urls are removed from redis cache.');

    }

}
