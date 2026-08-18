<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Venue extends Model
{
    /** @use HasFactory<\Database\Factories\VenueFactory> */
    use HasFactory;

    protected $fillable = ['name', 'type', 'price_per_hour', 'description', 'image_path'];

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
