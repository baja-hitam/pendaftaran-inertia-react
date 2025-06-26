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
        Schema::create('detail_ujian', function (Blueprint $table) {
            $table->id('id_detail_ujian');
            $table->unsignedBigInteger('id_ujian');
            $table->string('periode', 8);
            $table->date('tanggal_ujian');
            $table->time('waktu_mulai');
            $table->time('waktu_selesai');
            $table->string('ruang_ujian');
            $table->char('caktif', 1)->default('T'); // A for Active, I for Inactive
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_ujian');
    }
};
