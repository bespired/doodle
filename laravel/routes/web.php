<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

// Route::get('/_', function () {
//     return view('welcome');
// });

Route::any('/me', 'Back\BrowserController@me');

Route::post('test/upload', 'Back\UploadController@upload');

Route::any('/{any}', 'Front\HtmlController@all')
    ->where('any', '.*');
