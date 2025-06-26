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
        Schema::create('kartu_peserta', function (Blueprint $table) {
            $table->id('id_kartu_peserta');
            $table->unsignedBigInteger('no_form');
            $table->string('no_peserta', 12)->unique();
            $table->string('keterangan', 10)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kartu_peserta');
    }
};
