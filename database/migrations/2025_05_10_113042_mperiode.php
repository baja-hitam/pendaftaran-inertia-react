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
        Schema::create('Mperiode', function (Blueprint $table) {
            $table->string('periode',8)->primary();
            $table->date('start_date');
            $table->date('end_date');
            $table->string('aktif',1)->default('T');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Mperiode');
    }
};
