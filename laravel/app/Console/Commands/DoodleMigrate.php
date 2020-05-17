<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class DoodleMigrate extends Command
{

    protected $signature = 'doodle:migrate';

    protected $description = 'Wait on DB if not ready';

    public function handle()
    {

        if ($this->canConnect()) {

            echo sprintf("Yes! successfully connected to DB: %s \n", DB::connection()->getDatabaseName());

        } else {

            echo sprintf("No cannot connect to DB:%s \n", DB::connection()->getDatabaseName());

            $retry        = 0;
            $notConnected = true;

            while ($notConnected) {
                echo ".";

                sleep(2);
                $retry++;
                $notConnected = !$this->canConnect();
                if ($retry == 20) {
                    echo "\nGiving up.\n";
                    exit;
                }

            }
            echo "\n";
        }

        Artisan::call('migrate', ['--force' => true]);
        echo "Artisan migrate force.\n";

    }

    private function canConnect()
    {
        try {
            DB::connection()->getPdo();
        } catch (\Exception $e) {
            return false;
            // die("Could not connect to the database.  Please check your configuration. error:" . $e);
        }
        return true;
    }

}
