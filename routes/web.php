<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TagsController;

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

Route::get('tag-setting', [TagsController::class, 'index'])->name('tagSetting');
Route::post('tag-setting', [TagsController::class, 'store']);
Route::delete('tag-setting/{id}', [TagsController::class, 'destroy']);
// Route::get('info', function () {
//     phpinfo();
// });
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
