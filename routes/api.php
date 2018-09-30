<?php

use Illuminate\Http\Request;

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



Route::group([
    'middleware' => ['api']
    ], function ($router) {

    /** POST Routes */
    Route::post('register', 'UserController@create');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('me', 'AuthController@me');
    Route::post('add_timezone', 'TimezoneController@store');

    /** GET Routes */
    Route::get('refresh', 'AuthController@refresh');
    Route::get('users', 'UserController@index');
    Route::get('timezone/{id}', 'TimezoneController@show');
    Route::get('timezones', 'TimezoneController@index');
    Route::get('cities/{user}', 'CitiesController@index');
});
