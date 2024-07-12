<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class card extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'card';
    protected $fillable = [
        'name_user',
        'name_card',
        'name_company_card',
        'brand_card',
        'quantity',
        'price',
        'name_auth',


    ];
}
