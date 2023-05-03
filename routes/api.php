<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/categories', 'CategoryController@listAction');
Route::post('/categories/filter/{category}', 'CategoryController@filter');
Route::post('/categories/tree', 'CategoryController@tree');
Route::post('/products/get/{product}', 'ProductController@get');
Route::post('/products/edit/{product?}', 'ProductController@edit');
Route::post('/categories/add/{category?}', 'CategoryController@addAction');
Route::post('/categories/delete/{category}', 'CategoryController@deleteAction');
