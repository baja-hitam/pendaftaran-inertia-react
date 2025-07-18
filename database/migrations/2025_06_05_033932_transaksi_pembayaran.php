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
            $table->unsignedBigInteger('id_user')->nullable();
            $table->unsignedBigInteger('no_form')->nullable();
            $table->unsignedBigInteger('verif_by')->nullable();
            $table->unsignedBigInteger('id_pembayaran');
            $table->string('periode',8);
            $table->date('tanggal_dibayar')->nullable();
            $table->date('verif_date')->nullable();
            $table->string('jumlah_hrsbayar');
            $table->string('path_bukti')->nullable();
            $table->string('nama_bukti')->nullable();
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
