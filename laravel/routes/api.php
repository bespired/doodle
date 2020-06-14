<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::post('login', 'JwtApi\UserController@authenticate');
Route::get('open', 'JwtApi\DataController@open');

Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('user', 'JwtApi\UserController@getAuthenticatedUser');
    Route::get('closed', 'JwtApi\DataController@closed');
    Route::post('register', 'JwtApi\UserController@register');

    Route::get('templates/{type}/schema', 'JsonApi\TemplateController@schema');
    Route::get('templates/{type}/index', 'JsonApi\TemplateController@index');
    Route::post('templates/{type}/save', 'JsonApi\TemplateController@save');
    Route::post('templates/{type}/delete', 'JsonApi\TemplateController@remove');
    Route::post('templates/{type}/export', 'JsonApi\TemplateController@export');

});

// Route::get('/event/send/{message}', function ($message) {
//     event(new \App\Events\MessageSend($message));
//     return json_encode(['message sent' => $message]);
// });

Route::get('mainmenu', 'JsonApi\SettingController@mainMenu');
Route::get('tenantmenu', 'JsonApi\SettingController@tenantMenu');
Route::get('profilemenu', 'JsonApi\SettingController@profileMenu');
Route::get('usermenu', 'JsonApi\SettingController@userMenu');

Route::get('/', function () {return json_encode(['hi']);});
