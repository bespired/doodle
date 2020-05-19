<?php

namespace App\Console\Commands;

use App\Models\Eloquent\Setting;
use Illuminate\Console\Command;

class DoodleConfigSettings extends Command
{

    protected $signature = 'doodle:config:settings';

    protected $description = 'Fill settings in database from config';

    public function handle()
    {

        Setting::updateOrCreate(
            ['type' => 'mainmenu'],
            ['payload' => config('menus.main')]
        );

    }

}
