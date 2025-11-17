<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MediaController;

Route::post('login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function () {
  // ==================== authentication ===============================
  Route::get('auth', [AuthController::class, 'auth']);
  Route::post('logout', [AuthController::class, 'logout']);

  // ============== User management =================
  Route::post('add/user', [UserController::class, 'add_user']);
  Route::put('edit/user/{id}', [UserController::class, 'edit_user']);
  Route::get('user/{skip}/{top}', [UserController::class, 'user_list']);
  Route::post('/user/change-password', [UserController::class, 'change_password']);

    // ============================ Media management =====================
  Route::post('image-upload', [MediaController::class, 'uploadMedia']);

});
