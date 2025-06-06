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
            $table->unsignedBigInteger('id_user');
            $table->string('cperiode',8);
            $table->string('nama_lengkap', 255);
            $table->string('nama_panggilan', 100);
            $table->char('jenis_kelamin', 1);
            $table->string('tempat_lahir', 100);
            $table->date('tanggal_lahir');
            $table->string('agama', 50);
            $table->string('kewarganegaraan', 50);
            $table->char('anak_ke',2);
            $table->char('jumlah_saudara_kandung',2);
            $table->char('jumlah_saudara_tiri',2)->nullable();
            $table->char('jumlah_saudara_angkat',2)->nullable();
            $table->string('status_anak',25)->nullable();
            $table->string('bahasa_sehari_hari', 100);
            $table->text('alamat');
            $table->string('no_kk', 20);
            $table->string('kelurahan', 100);
            $table->string('kecamatan', 100);
            $table->string('kota', 100);
            $table->string('kode_pos', 20);
            $table->string('nomor_telepon', 20);
            $table->char('tempat_alamat', 1);
            $table->string('nama_pemilik_tempat_alamat', 100);
            $table->char('jarak_ke_sekolah',3)->nullable();
            $table->char('metode_transportasi', 1);
            $table->string('golongan_darah', 3)->nullable();
            $table->string('riwayat_rawat', 100)->nullable();
            $table->char('riwayat_penyakit', 1)->nullable();
            $table->string('kelainan_jasmani', 255)->nullable();
            $table->char('tinggi_badan', 3)->nullable();
            $table->char('berat_badan', 3)->nullable();
            $table->string('nama_sekolah_asal', 255)->nullable();
            $table->date('tanggal_ijazah')->nullable();
            $table->string('nomor_ijazah', 100)->nullable();
            $table->date('tanggal_skhun')->nullable();
            $table->string('nomor_skhun', 100)->nullable();
            $table->char('lama_belajar')->nullable();
            $table->string('nisn', 100)->nullable();
            $table->char('tipe_riwayat_sekolah', 1)->nullable();
            $table->string('nama_riwayat_sekolah', 255)->nullable();
            $table->date('tanggal_pindah')->nullable();
            $table->text('alasan_pindah')->nullable();
            $table->string('kesenian', 255)->nullable();
            $table->string('olahraga', 255)->nullable();
            $table->string('organisasi', 255)->nullable();
            $table->string('prestasi_lainnya', 255)->nullable();
            $table->string('hobi')->nullable();
            $table->string('cita_cita')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
