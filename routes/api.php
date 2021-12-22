<?php

use App\Http\Controllers\SignupController;
use App\Http\Controllers\AccoutsController;
use App\Http\Controllers\TodosController;
use App\Http\Controllers\TagsController;
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

Route::get('/todos', [TodosController::class, 'list']);
Route::get('/todos/{id}', [TodosController::class, 'search']);
Route::post('/todos', [TodosController::class, 'create']);
Route::put('/todos/{id}', [TodosController::class, 'update']);
Route::delete('/todos/{id}', [TodosController::class, 'destroy']);

Route::post('/login', [SignupController::class, 'login']);

Route::get('/tags', [TagsController::class, 'list']);
