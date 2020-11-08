<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserNew extends Model
{

    protected $table = "users_new";

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'created_at','updated_at'
    ];
    
    protected $hidden = [
        'password'
    ];
    
}