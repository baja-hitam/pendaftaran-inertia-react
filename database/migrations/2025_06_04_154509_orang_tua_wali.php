<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orang_tua_wali', function (Blueprint $table) {
            $table->unsignedBigInteger('id_orangtua_wali')->primary();
            $table->unsignedBigInteger('no_form');
            // Ayah
            $table->string('nama_ayah')->nullable();
            $table->string('tempat_lahir_ayah')->nullable();
            $table->string('tanggal_lahir_ayah')->nullable();
            $table->string('nik_ayah', 255)->nullable();
            $table->string('agama_ayah')->nullable();
            $table->string('kewarganegaraan_ayah')->nullable();
            $table->string('pendidikan_terakhir_ayah')->nullable();
            $table->string('ijazah_tertinggi_ayah')->nullable();
            $table->string('pekerjaan_ayah')->nullable();
            $table->string('alamat_pekerjaan_ayah')->nullable();
            $table->string('penghasilan_ayah')->nullable();
            $table->string('alamat_rumah_ayah')->nullable();
            $table->string('telp_ayah')->nullable();
            $table->string('status_ayah')->nullable();
            // Ibu
            $table->string('nama_ibu')->nullable();
            $table->string('tempat_lahir_ibu')->nullable();
            $table->string('tanggal_lahir_ibu')->nullable();
            $table->string('nik_ibu', 255)->nullable();
            $table->string('agama_ibu')->nullable();
            $table->string('kewarganegaraan_ibu')->nullable();
            $table->string('pendidikan_terakhir_ibu')->nullable();
            $table->string('ijazah_tertinggi_ibu')->nullable();
            $table->string('pekerjaan_ibu')->nullable();
            $table->string('alamat_pekerjaan_ibu')->nullable();
            $table->string('penghasilan_ibu')->nullable();
            $table->string('alamat_rumah_ibu')->nullable();
            $table->string('telp_ibu')->nullable();
            $table->string('status_ibu')->nullable();
            // Wali
            $table->string('nama_wali')->nullable();
            $table->string('tempat_lahir_wali')->nullable();
            $table->string('tanggal_lahir_wali')->nullable();
            $table->string('nik_wali', 255)->nullable();
            $table->string('agama_wali')->nullable();
            $table->string('kewarganegaraan_wali')->nullable();
            $table->string('hubungan_keluarga_wali')->nullable();
            $table->string('ijazah_tertinggi_wali')->nullable();
            $table->string('pekerjaan_wali')->nullable();
            $table->string('penghasilan_wali')->nullable();
            $table->string('alamat_wali')->nullable();
            $table->string('telp_wali')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orang_tua_wali');
    }
};
