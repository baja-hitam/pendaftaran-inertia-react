<?php

use App\Http\Middleware\AuthSession;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PeriodeController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\RegisterController;
use App\Http\Middleware\AdminMiddleware;
use Inertia\Inertia;



Route::middleware(AuthSession::class)->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/pendaftaran', function () {
        return Inertia::render('Pendaftaran');
    })->name('pendaftaran');
});
Route::middleware(AdminMiddleware::class)->group(function () {
    Route::get('/admin/periode', [PeriodeController::class,'index'])->name('admin.periode');
    Route::post('/admin/periode/store',[PeriodeController::class,'store'])->name('admin.periode.store');
    Route::post('/admin/periode/update',[PeriodeController::class,'update'])->name('admin.periode.update');
    Route::post('/admin/periode/delete',[PeriodeController::class,'delete'])->name('admin.periode.delete');
    Route::get('/admin/pembayaran',[PembayaranController::class,'index'])->name('admin.pembayaran');
    Route::post('/admin/pembayaran/store', [PembayaranController::class, 'store'])->name('admin.pembayaran.store');
    Route::post('/admin/pembayaran/update', [PembayaranController::class, 'update'])->name('admin.pembayaran.update');
    Route::post('/admin/pembayaran/delete', [PembayaranController::class, 'destroy'])->name('admin.pembayaran.delete');
});
