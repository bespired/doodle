<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWidgetTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::dropIfExists('widget_templates');

        Schema::create('widget_templates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('handle', 32);
            $table->char('type', 32)->default('');
            $table->char('status', 16)->default('new');
            $table->char('name', 32)->nullable();
            $table->char('label', 64)->default('No Label');
            $table->longText('elements')->nullable();
            $table->longText('draw')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('widget_templates', function (Blueprint $table) {
            $table->unique(['name', 'deleted_at']);
        });

        Artisan::call('dragrr:config:widgets');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('widget_templates');
    }
}
