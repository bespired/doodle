<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::dropIfExists('images');

        Schema::create('images', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('handle', 32);
            $table->string('url', 1024)->nullable();
            $table->char('name', 255)->nullable();
            $table->char('extension', 16);
            $table->char('label', 64)->default('No Label');
            $table->char('folder', 128)->default('');
            $table->integer('likes')->default(0);
            $table->integer('width');
            $table->integer('height');
            $table->bigInteger('bytes')->default(0);
            $table->char('mimetype', 64);
            $table->char('deletehash', 16);
            $table->longText('data')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('images', function (Blueprint $table) {
            $table->unique(['name', 'deleted_at']);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('images');
    }
}
