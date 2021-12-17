<?php

use App\Http\Controllers\NannyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BabyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', [UserController::class, 'show']);

    // API route for logout user
    Route::post('/logout', [UserController::class, 'logout']);

    Route::post('baby', [BabyController::class, 'create']);
    Route::get('baby/{id}', [BabyController::class, 'read']);
    Route::put('baby/{id}', [BabyController::class, 'update']);
    Route::delete('baby/{id}', [BabyController::class, 'delete']);

    Route::post('baby/{id}/nanny', [NannyController::class, 'create']);
});
