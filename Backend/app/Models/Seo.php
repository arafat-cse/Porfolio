<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Flat3\Lodata\Attributes\LodataRelationship;

class Seo extends Model implements HasMedia
{
    use HasFactory;
    protected $guarded = [];

    
    use InteractsWithMedia {
        media as protected trait_media;
    }

    public function sectionable()
    {
        return $this->morphTo();
    }

    #[LodataRelationship]
    public function media(): MorphMany
    {
        return $this->trait_media();
    }
}
