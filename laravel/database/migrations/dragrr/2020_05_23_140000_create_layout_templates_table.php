<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLayoutTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('layout_templates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('handle', 32);
            $table->char('type', 32)->default('');
            $table->char('name', 32)->nullable()->unique();
            $table->char('label', 64)->default('No Label');
            $table->char('background', 64)->nullable();
            $table->char('fillstyle', 64)->nullable();
            $table->char('maxwidth', 64)->nullable();
            $table->longText('columns')->nullable();
            $table->longText('conditions')->nullable();
            $table->longText('draw')->nullable();
            $table->timestamps();
        });

        Artisan::call('dragrr:config:layouts');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('layout_templates');
    }
}
