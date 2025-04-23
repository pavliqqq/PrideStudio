<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class order extends Model
{
    protected $guarded = false;
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    public function workers()
    {
        return $this->belongsToMany(worker::class);
    }
}
