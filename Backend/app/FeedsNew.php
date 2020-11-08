<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FeedsNew extends Model
{

    protected $table = "feeds_new";

    protected $primaryKey = 'feed_id';

    protected $fillable = [
        'user', 'comment', 'is_danger', 'is_anonymous', 'created_at','updated_at'
    ];
    
}