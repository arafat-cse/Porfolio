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
        Schema::create('hobbies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('icon')->nullable(); // lucide-react icon name
            $table->string('image')->nullable(); // main image (if not using MediaLibrary)
            $table->string('color_from')->nullable(); // e.g. '#3b82f6'
            $table->string('color_to')->nullable();   // e.g. '#06b6d4'
            $table->string('emoji')->nullable();
            $table->string('stats_label')->nullable();
            $table->string('stats_value')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hobbies');
    }
};
