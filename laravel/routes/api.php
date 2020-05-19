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

Route::post('login', 'UserController@authenticate');
Route::get('open', 'DataController@open');

Route::get('/', function () {return json_encode(['hi']);});

Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('user', 'UserController@getAuthenticatedUser');
    Route::get('closed', 'DataController@closed');
    Route::post('register', 'UserController@register');
});

// Route::get('/event/send/{message}', function ($message) {
//     event(new \App\Events\MessageSend($message));
//     return json_encode(['message sent' => $message]);
// });
