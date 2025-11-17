<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Flat3\Lodata\Attributes\LodataRelationship;
use App\Models\Catagory;
use App\Models\Seo;

class Blog extends Model implements HasMedia
{
    use HasFactory;
    protected $guarded = [];

    use InteractsWithMedia {
        media as protected trait_media;
    }
    #[LodataRelationship]
    public function category()
    {
        return $this->belongsTo(Catagory::class, 'category_id');
    }

    #[LodataRelationship]
    public function seo()
    {
        return $this->morphOne(Seo::class, 'sectionable');
    }

    #[LodataRelationship]
    public function author() 
    {
        return $this->belongsTo(User::class, 'created_by');
    }
     #[LodataRelationship]
    public function media(): MorphMany
    {
        return $this->trait_media();
    }
}
