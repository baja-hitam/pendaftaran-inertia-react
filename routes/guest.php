<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;

Route::get('/',[AuthController::class, 'index'])->name('login');
Route::get('/admin',[AuthController::class, 'indexAdmin'])->name('login.admin');
Route::post('/admin',[AuthController::class, 'loginAdmin'])->name('login.admin.post');
Route::post('/login',[AuthController::class, 'login'])->name('login.post');
Route::get('/register',[RegisterController::class, 'index'])->name('register');
Route::post('/register-session',[RegisterController::class, 'registerSession'])->name('register.session');
Route::post('/register',[RegisterController::class, 'store'])->name('register.post');
Route::get('/otp',[RegisterController::class, 'otp'])->name('otp');