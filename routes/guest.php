<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;

Route::get('/login',[AuthController::class, 'index'])->name('login');
Route::get('/login/admin',[AuthController::class, 'indexAdmin'])->name('login.admin');
Route::post('/login',[AuthController::class, 'login'])->name('login.post');
Route::get('/register',[RegisterController::class, 'index'])->name('register');
Route::post('/register',[RegisterController::class, 'store'])->name('register.post');