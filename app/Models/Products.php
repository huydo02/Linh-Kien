<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Products extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'products';
    protected $fillable = [
        'name_product',
        'id_company',
        'image',
        'price',
        'price_discount',
        'content',
        'description',
    ];

    // public function setFilenamesAttribute($value)
    // {
    //     $this->attributes['image'] = json_encode($value);
    // }
}