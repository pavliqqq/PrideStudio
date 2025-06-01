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
        Schema::table('order_worker', function (Blueprint $table) {
            $table->enum('status',['новый','в работе','завершён'])->after('date')->default('новый');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_worker', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
