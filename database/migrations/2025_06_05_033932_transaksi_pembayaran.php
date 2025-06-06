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
            $table->string('cperiode',8);
            $table->date('tanggal_pembayaran');
            $table->string('jumlah_pembayaran');
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
