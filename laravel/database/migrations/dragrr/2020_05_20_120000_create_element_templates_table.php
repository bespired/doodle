<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateElementTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::dropIfExists('templated_elements');

        Schema::create('templated_elements', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('handle', 32);
            $table->char('type', 32)->default('');
            $table->char('status', 16)->default('new');
            $table->char('name', 32)->nullable();
            $table->char('label', 64)->default('No Label');
            $table->char('tag')->nullable();
            $table->char('icon')->nullable();
            $table->longText('otml')->nullable();
            $table->longText('draw')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('templated_elements', function (Blueprint $table) {
            $table->unique(['name', 'deleted_at']);
        });

        Artisan::call('dragrr:config:elements');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('templated_elements');
    }
}
