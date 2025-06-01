<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\WorkerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/orders', [OrderController::class, 'index']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/order/{order}', [OrderController::class, 'show']);
    Route::get('/worker/{worker}', [WorkerController::class, 'show']);
    Route::get('/workerOrders/{worker}', [WorkerController::class, 'showOrders']);
    Route::get('/worker/tasks/week', [WorkerController::class, 'weekTasks']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/orders/create', [OrderController::class, 'store']);
    Route::patch('/orders/{order}', [OrderController::class, 'update']);
    Route::delete('/orders/{order}', [OrderController::class, 'destroy']);


    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);

    Route::post('/workers/create', [WorkerController::class, 'store']);
    Route::patch('/workers/{worker}', [WorkerController::class, 'update']);
    Route::delete('/workers/{worker}', [WorkerController::class, 'destroy']);


    Route::get('/workers', [WorkerController::class, 'index']);
    Route::get('/workers/all', [WorkerController::class, 'getAll']);
});
