<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BabyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });

    // API route for logout user
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('baby', [BabyController::class, 'create']);
    Route::get('baby/{id}', [BabyController::class, 'read']);
    Route::put('baby/{id}', [BabyController::class, 'update']);
    Route::delete('baby/{id}', [BabyController::class, 'delete']);
});
