<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::dropIfExists('templated_classes');

        Schema::create('templated_classes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('handle', 32);
            $table->char('type', 32)->default('');
            $table->char('area', 32)->default('')->comment('sub type: font, padding, color, ...');
            $table->char('status', 16)->default('new');
            $table->char('name', 32)->nullable();
            $table->char('label', 64)->default('No Label');
            $table->longText('data')->nullable();
            $table->longText('draw')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('templated_classes', function (Blueprint $table) {
            $table->unique(['name', 'deleted_at']);
        });

        Artisan::call('dragrr:config:classes');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('templated_classes');
    }
}
