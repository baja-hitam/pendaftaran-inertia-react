<?php

use App\Http\Controllers\TransaksiPembayaran;
use App\Http\Middleware\AuthSession;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PeriodeController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PendaftaranSiswa;
use App\Http\Controllers\RegisterController;
use App\Http\Middleware\AdminMiddleware;
use Inertia\Inertia;



Route::middleware(AuthSession::class)->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/pendaftaran',[PendaftaranSiswa::class,'index'])->name('pendaftaran');
    Route::post('/pendaftaran/store', [PendaftaranSiswa::class, 'store'])->name('pendaftaran.store');
    Route::post('/pendaftaran/update', [PendaftaranSiswa::class, 'update'])->name('pendaftaran.update');
    Route::get('/riwayat-pembayaran', [TransaksiPembayaran::class, 'riwayat_pembayaran'])->name('riwayat.pembayaran');
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
    Route::get('/admin/transaksi-pembayaran',[TransaksiPembayaran::class,'index'])->name('admin.transaksi-pembayaran');
    Route::post('/admin/transaksi-pembayaran/store',[TransaksiPembayaran::class,'store'])->name('admin.transaksi-pembayaran.store');
    Route::post('/admin/transaksi-pembayaran/update',[TransaksiPembayaran::class,'update'])->name('admin.transaksi-pembayaran.update');
    Route::post('/admin/transaksi-pembayaran/delete',[TransaksiPembayaran::class,'destroy'])->name('admin.transaksi-pembayaran.delete');
    Route::get('/admin/calon-siswa',[PendaftaranSiswa::class,'get_daftar_calon_siswa'])->name('admin.daftar.calon-siswa');
    Route::post('/admin/calon-siswa/detail',[PendaftaranSiswa::class,'detail_calon_siswa'])->name('admin.detail.calon-siswa');
});
