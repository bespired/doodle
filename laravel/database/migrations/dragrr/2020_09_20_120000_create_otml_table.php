<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOtmlTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::dropIfExists('otmls');

        Schema::create('otmls', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('handle', 32);
            $table->string('pathslug')->nullable();
            $table->char('type', 32)->default('');
            $table->char('status', 16)->default('new');
            $table->char('name', 32)->nullable();
            $table->char('label', 64)->default('No Label');
            $table->longText('otml')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('otmls', function (Blueprint $table) {
            $table->unique(['pathslug', 'deleted_at']);
        });

        Artisan::call('dragrr:config:otml');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('otmls');
    }
}
