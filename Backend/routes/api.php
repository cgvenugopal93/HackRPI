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

#hackathon
#login authenticate
Route::post('log','HackApiController@login');
Route::post('signup','HackApiController@signup');
#News Feed API
Route::post('feed','HackApiController@postFeed');
Route::get('feed','HackApiController@getFeeds');
#API for infected latlong position
Route::get('latlong','HackApiController@getInfectedLatLong');

Route::get('safepass/{user_id}','HackApiController@getSafePassDetails');
