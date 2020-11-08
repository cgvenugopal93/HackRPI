<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsersTrace extends Model
{

    protected $table = "users_trace";

    protected $primaryKey = 'users_trace_id';

    protected $fillable = [
        'users_trace_id', 'user', 'lat', 'long', 'location', 'created_at','updated_at'
    ];
    
}