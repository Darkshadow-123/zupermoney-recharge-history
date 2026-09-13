<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Recharge extends Model
{
    use HasFactory;

    protected $fillable = [
        'retailer_id',
        'mobile_number',
        'operator',
        'amount',
        'status',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'created_at' => 'datetime',
    ];

    // Fixed list of operators accepted by validation + used to seed fake data.
    public const OPERATORS = ['Airtel', 'Jio', 'Vi', 'BSNL'];

    public const STATUSES = ['success', 'failed', 'pending'];

    public function retailer(): BelongsTo
    {
        return $this->belongsTo(Retailer::class);
    }
}
