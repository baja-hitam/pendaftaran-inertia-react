<?php

use Inertia\Inertia;
use App\Http\Controllers\Ujian;
use App\Http\Middleware\AuthSession;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\NilaiController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\PendaftaranSiswa;
use App\Http\Controllers\PeriodeController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TransaksiPembayaran;
use App\Http\Controllers\PembayaranController;



Route::middleware(AuthSession::class)->group(function () {
    Route::get('/dashboard',[Dashboard::class,'index'])->name('dashboard');
    Route::get('/pendaftaran',[PendaftaranSiswa::class,'index'])->name('pendaftaran');
    Route::post('/pendaftaran/siswa/store', [PendaftaranSiswa::class, 'store'])->name('pendaftaran.store');
    Route::post('/pendaftaran/siswa/update', [PendaftaranSiswa::class, 'update'])->name('pendaftaran.update');
    Route::post('/pendaftaran/ortu/store', [PendaftaranSiswa::class, 'store_ortu'])->name('pendaftaran.store.ortu');
    Route::post('/pendaftaran/ortu/update', [PendaftaranSiswa::class, 'update_ortu'])->name('pendaftaran.update.ortu');
    Route::post('/kartu-peserta/cetak', [PendaftaranSiswa::class, 'cetak_kartu_peserta'])->name('kartu.peserta.cetak');
    Route::get('/riwayat-pembayaran', [TransaksiPembayaran::class, 'riwayat_pembayaran'])->name('riwayat.pembayaran');
    Route::post('/create-kwitansi', [TransaksiPembayaran::class, 'create_kwitansi'])->name('create.kwitansi');
    Route::post('/buat-angsuran',[TransaksiPembayaran::class,'storeAngsuran'])->name('create.angsuran');
    Route::post('/upload-bukti', [TransaksiPembayaran::class, 'upload_bukti'])->name('upload.bukti');
    Route::get('/riwayat-pembayaran/detail', [TransaksiPembayaran::class, 'detail_riwayat_pembayaran'])->name('detail.riwayat.pembayaran');
});
Route::middleware(AdminMiddleware::class)->group(function () {
    Route::get('/admin/dashboard', [Dashboard::class, 'admin_index'])->name('admin.dashboard');
    Route::get('/admin/periode', [PeriodeController::class,'index'])->name('admin.periode');
    Route::post('/admin/periode/store',[PeriodeController::class,'store'])->name('admin.periode.store');
    Route::post('/admin/periode/update',[PeriodeController::class,'update'])->name('admin.periode.update');
    Route::post('/admin/periode/delete',[PeriodeController::class,'delete'])->name('admin.periode.delete');
    Route::get('/admin/pembayaran',[PembayaranController::class,'index'])->name('admin.pembayaran');
    Route::post('/admin/pembayaran/store', [PembayaranController::class, 'store'])->name('admin.pembayaran.store');
    Route::post('/admin/pembayaran/update', [PembayaranController::class, 'update'])->name('admin.pembayaran.update');
    Route::post('/admin/pembayaran/delete', [PembayaranController::class, 'destroy'])->name('admin.pembayaran.delete');
    Route::get('/admin/transaksi-pembayaran',[TransaksiPembayaran::class,'index'])->name('admin.transaksi-pembayaran');
    Route::get('/admin/transaksi-pembayaran/search',[TransaksiPembayaran::class,'search'])->name('admin.transaksi-pembayaran.search');
    Route::post('/admin/transaksi-pembayaran/store',[TransaksiPembayaran::class,'store'])->name('admin.transaksi-pembayaran.store');
    Route::post('/admin/transaksi-pembayaran/konfirmasi',[TransaksiPembayaran::class,'konfirmasi_pembayaran'])->name('admin.transaksi-pembayaran.konfirmasi');
    Route::post('/admin/transaksi-pembayaran/batal-konfirmasi',[TransaksiPembayaran::class,'konfirmasi_batal_pembayaran'])->name('admin.transaksi-pembayaran.konfirmasi.batal');
    Route::post('/admin/transaksi-pembayaran/update',[TransaksiPembayaran::class,'update'])->name('admin.transaksi-pembayaran.update');
    Route::post('/admin/transaksi-pembayaran/delete',[TransaksiPembayaran::class,'destroy'])->name('admin.transaksi-pembayaran.delete');
    Route::get('/admin/calon-siswa',[PendaftaranSiswa::class,'get_daftar_calon_siswa'])->name('admin.daftar.calon-siswa');
    Route::get('/admin/calon-siswa/detail',[PendaftaranSiswa::class,'detail_calon_siswa'])->name('admin.detail.calon-siswa');
    Route::get('/admin/calon-siswa/cetak',[PendaftaranSiswa::class,'cetak_calon_siswa'])->name('admin.cetak.calon-siswa');
    Route::post('/admin/calon-siswa/verif',[PendaftaranSiswa::class,'verif_calon_siswa'])->name('admin.verif.calon-siswa');
    Route::post('/admin/calon-siswa/batal-verif',[PendaftaranSiswa::class,'batal_verif_calon_siswa'])->name('admin.batal-verif.calon-siswa');
    Route::get('/admin/ujian', [Ujian::class, 'index'])->name('admin.ujian');
    Route::post('/admin/ujian/store', [Ujian::class, 'store'])->name('admin.ujian.store');
    Route::post('/admin/ujian/update', [Ujian::class, 'update'])->name('admin.ujian.update');
    Route::post('/admin/ujian/destroy', [Ujian::class, 'destroy'])->name('admin.ujian.destroy');
    Route::post('/admin/ujian/detail/store', [ujian::class, 'store_detail_ujian'])->name('admin.ujian.detail.store');
    Route::post('/admin/ujian/detail/update', [ujian::class, 'update_detail_ujian'])->name('admin.ujian.detail.update');
    Route::post('/admin/ujian/detail/destroy', [ujian::class, 'destroy_detail_ujian'])->name('admin.ujian.detail.destroy');
    Route::get('/admin/nilai',[NilaiController::class,'index'])->name('admin.nilai');
    Route::get('/admin/nilai/detail',[NilaiController::class,'detail'])->name('admin.nilai.detail');
    Route::post('/admin/nilai/store',[NilaiController::class,'store'])->name('admin.nilai.store');
    Route::post('/admin/nilai/update',[NilaiController::class,'update'])->name('admin.nilai.update');
    Route::post('/admin/nilai/delete',[NilaiController::class,'destroy'])->name('admin.nilai.delete');
});
