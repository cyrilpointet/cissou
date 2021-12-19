<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\NannyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BabyController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', [UserController::class, 'show']);
    Route::post('/logout', [UserController::class, 'logout']);

    Route::post('baby', [BabyController::class, 'create']);
});

Route::middleware(['auth:sanctum', 'isBabyParentOrNanny'])->group(function () {
    Route::get('baby/{id}', [BabyController::class, 'read']);
});

Route::middleware(['auth:sanctum', 'isBabyParent'])->group(function () {
    Route::put('baby/{id}', [BabyController::class, 'update']);
    Route::delete('baby/{id}', [BabyController::class, 'delete']);

    Route::post('baby/{id}/nanny', [NannyController::class, 'create']);
    Route::put('baby/{id}/nanny/{user_id}', [NannyController::class, 'update']);
    Route::delete('baby/{id}/nanny/{user_id}', [NannyController::class, 'delete']);
});

Route::middleware(['auth:sanctum', 'hasCommentsReadRights'])->group(function () {
    Route::get('baby/{id}/comment', [CommentController::class, 'readAll']);
    Route::get('baby/{id}/comment/{comment_id}', [CommentController::class, 'read']);
});

Route::middleware(['auth:sanctum', 'hasCommentsWriteRights'])->group(function () {
    Route::post('baby/{id}/comment', [CommentController::class, 'create']);
    Route::put('baby/{id}/comment/{comment_id}', [CommentController::class, 'update']);
    Route::delete('baby/{id}/comment/{comment_id}', [CommentController::class, 'delete']);
});
