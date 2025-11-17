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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->text('title'); // string is usually better for titles
            $table->text('excerpt_title')->nullable();
            $table->longText('description')->nullable();
            
            $table->boolean('is_active')->default(true);
            $table->boolean('is_published')->default(false); // fixed typo
            $table->boolean('is_featured')->default(false);  // fixed typo & default value
            $table->boolean('is_trending')->default(false);  // fixed typo & default value
            
            $table->unsignedBigInteger('category_id')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();

            // Stats
            $table->unsignedBigInteger('likes_count')->default(0);
            $table->unsignedBigInteger('views_count')->default(0);

            $table->string('read_time')->nullable();
            $table->text('tags')->nullable();
            
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
