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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', function () {
    return json_encode(['hi']);
});

Route::get('/event/send/{message}', function ($message) {
    event(new \App\Events\MessageSend($message));
    return json_encode(['message sent' => $message]);
});

Route::post('_/auth/v1/login', function () {
    return json_encode(['hi']);
});
