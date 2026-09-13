<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Retailer extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone'];

    public function recharges(): HasMany
    {
        return $this->hasMany(Recharge::class);
    }
}
