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
        Schema::create('calon_siswa',function(Blueprint $table){
            $table->unsignedBigInteger('id_calon_siswa')->primary();
            $table->unsignedBigInteger('no_form');
            $table->string('nama_lengkap', 255);
            $table->string('nama_panggilan', 255);
            $table->string('jenis_kelamin', 255);
            $table->string('tempat_lahir', 255);
            $table->string('tanggal_lahir', 255);
            $table->string('agama', 255);
            $table->string('kewarganegaraan', 255);
            $table->string('anak_ke', 255);
            $table->string('jumlah_saudara_kandung', 255);
            $table->string('jumlah_saudara_tiri', 255)->nullable();
            $table->string('jumlah_saudara_angkat', 255)->nullable();
            $table->string('status_anak', 255)->nullable();
            $table->string('bahasa_sehari_hari', 255);
            $table->text('alamat');
            $table->string('no_kk', 255);
            $table->string('kelurahan', 255);
            $table->string('kecamatan', 255);
            $table->string('kota', 255);
            $table->string('kode_pos', 255);
            $table->string('nomor_telepon', 255);
            $table->string('tempat_alamat', 255);
            $table->string('nama_pemilik_tempat_alamat', 255);
            $table->string('jarak_ke_sekolah', 255)->nullable();
            $table->string('metode_transportasi', 255);
            $table->string('golongan_darah', 255)->nullable();
            $table->string('riwayat_rawat', 255)->nullable();
            $table->string('riwayat_penyakit', 255)->nullable();
            $table->string('kelainan_jasmani', 255)->nullable();
            $table->string('tinggi_badan', 255)->nullable();
            $table->string('berat_badan', 255)->nullable();
            $table->string('nama_sekolah_asal', 255)->nullable();
            $table->string('tanggal_ijazah', 255)->nullable();
            $table->string('nomor_ijazah', 255)->nullable();
            $table->string('tanggal_skhun', 255)->nullable();
            $table->string('nomor_skhun', 255)->nullable();
            $table->string('lama_belajar', 255)->nullable();
            $table->string('nisn', 255)->nullable();
            $table->string('tipe_riwayat_sekolah', 255)->nullable();
            $table->string('nama_riwayat_sekolah', 255)->nullable();
            $table->string('tanggal_pindah', 255)->nullable();
            $table->text('alasan_pindah')->nullable();
            $table->string('kesenian', 255)->nullable();
            $table->string('olahraga', 255)->nullable();
            $table->string('organisasi', 255)->nullable();
            $table->string('prestasi_lainnya', 255)->nullable();
            $table->string('hobi', 255)->nullable();
            $table->string('cita_cita', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calon_siswa');
    }
};
