<?php

use App\Http\Middleware\AuthSession;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PeriodeController;
use App\Http\Controllers\RegisterController;
use App\Http\Middleware\LevelGuard;
use Inertia\Inertia;



Route::middleware(AuthSession::class)->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/pendaftaran', function () {
        return Inertia::render('Pendaftaran');
    })->name('pendaftaran');
    Route::middleware(LevelGuard::class)->group(function () {
        Route::get('/admin/periode', [PeriodeController::class,'index'])->name('admin.periode');
        Route::get('/admin/periode/Periode/create', function () {
            return Inertia::render('admin/PeriodeCreate');
        })->name('admin.periode.create');
        Route::get('/admin/periode/Periode/edit/{id}', function ($id) {
            return Inertia::render('admin/PeriodeEdit', ['id' => $id]);
        })->name('admin.periode.edit');
    });
});
