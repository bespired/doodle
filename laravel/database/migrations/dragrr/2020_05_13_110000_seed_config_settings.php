<?php

use Illuminate\Database\Migrations\Migration;

class SeedConfigSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Artisan::call('dragrr:config:settings');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
