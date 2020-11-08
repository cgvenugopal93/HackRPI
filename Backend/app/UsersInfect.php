<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsersInfect extends Model
{

    protected $table = "users_infected";

    protected $primaryKey = 'users_infected_id';

    protected $fillable = [
        'user', 'created_at','updated_at'
    ];
    
}