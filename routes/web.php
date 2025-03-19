<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\WorkerController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


