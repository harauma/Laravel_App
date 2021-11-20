<?php

use App\Http\Controllers\AccoutsController;
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

Route::get('/accounts', [AccoutsController::class, 'list']);
Route::get('/accounts/{id}', [AccoutsController::class, 'search']);
Route::post('/accounts', [AccoutsController::class, 'create']);
Route::put('/accounts/{id}', [AccoutsController::class, 'update']);
Route::delete('/accounts/{id}', [AccoutsController::class, 'destroy']);
