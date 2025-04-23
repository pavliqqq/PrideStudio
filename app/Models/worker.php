<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class worker extends Authenticatable
{
    use HasApiTokens;
    protected $guarded = false;
    /** @use HasFactory<\Database\Factories\WorkerFactory> */
    use HasFactory;

    public function orders(){
        return $this->belongsToMany(order::class);
    }
}
