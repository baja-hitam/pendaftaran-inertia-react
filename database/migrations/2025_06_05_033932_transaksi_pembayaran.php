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
        Schema::create('transaksi_pembayaran', function (Blueprint $table) {
            $table->id('id_transaksi_pembayaran');
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_pembayaran');
            $table->string('nama_entry_admin',100)->nullable();
            $table->string('periode',8);
            $table->date('tanggal_dibayar')->nullable();
            $table->string('jumlah_hrsbayar');
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
