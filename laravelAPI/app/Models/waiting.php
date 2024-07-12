<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class waiting extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'waiting';
    protected $fillable = [
        'username',
        'quantity',
        'totalPrice',
        'status',
        'created_at',
        'updated_at',

    ];
}
