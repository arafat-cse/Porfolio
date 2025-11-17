<?php

namespace App\Models;
use Flat3\Lodata\Attributes\LodataRelationship;
use App\Models\User;

use Illuminate\Database\Eloquent\Model;

class articale extends Model
{
    //
      #[LodataRelationship]
    public function author() 
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
