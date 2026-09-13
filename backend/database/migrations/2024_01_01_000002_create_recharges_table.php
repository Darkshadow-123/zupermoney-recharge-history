<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recharges', function (Blueprint $table) {
            $table->id();

            // FK + relationship to retailers (see RechargeController/Retailer model).
            $table->foreignId('retailer_id')
                ->constrained('retailers')
                ->cascadeOnDelete();

            $table->string('mobile_number', 15);
            $table->string('operator');
            $table->decimal('amount', 10, 2);

            // Kept as a string enum rather than a separate lookup table —
            // there are only three fixed states and they never grow.
            $table->enum('status', ['success', 'failed', 'pending'])->default('pending');

            $table->timestamps();

            // Composite index: index() speeds up the common
            // filter-by-retailer + sort-by-date query used by GET /api/recharges.
            $table->index(['retailer_id', 'created_at']);
            $table->index('status');
            $table->index('operator');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recharges');
    }
};
