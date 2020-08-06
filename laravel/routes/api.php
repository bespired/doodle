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

    Route::get('templates/{fulltype}/schema', 'JsonApi\TemplateController@schema');

    Route::get('templates/{fulltype}/index', 'JsonApi\TemplateController@index');

    Route::post('templates/{fulltype}/save', 'JsonApi\TemplateController@save');
    Route::post('templates/{fulltype}/delete', 'JsonApi\TemplateController@remove');
    Route::post('templates/{fulltype}/duplicate', 'JsonApi\TemplateController@duplicate');
    Route::post('templates/{fulltype}/export', 'JsonApi\TemplateController@export');

});

// Route::get('/event/send/{message}', function ($message) {
//     event(new \App\Events\MessageSend($message));
//     return json_encode(['message sent' => $message]);
// });

Route::get('mainmenu', 'JsonApi\SettingController@mainMenu');
Route::get('tenantmenu', 'JsonApi\SettingController@tenantMenu');
Route::get('profilemenu', 'JsonApi\SettingController@profileMenu');
Route::get('usermenu', 'JsonApi\SettingController@userMenu');
Route::get('settings/{setting}/index', 'JsonApi\SettingController@setting');

Route::get('/', function () {return json_encode(['hi']);});
