<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        dump('create setting table');

        Schema::create('settings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('handle', 32);
            $table->char('type', 32);
            $table->longText('payload')->nullable();
            $table->timestamps();
        });

        dump('doodle:config:settings');

        Artisan::call('doodle:config:settings');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
