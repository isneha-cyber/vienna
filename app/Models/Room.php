<?php
// app/Models/Room.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Room extends Model
{
    use HasFactory;

    protected $table = 'rooms';

    protected $fillable = [
        'number',
        'slug',
        'title',
        'area',
        'guests',
        'bed_info',
        'deck_info',
        'description',
        'images',
        'amenities',
        'price',
        'category',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'images' => 'array',
        'amenities' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($room) {
            if (empty($room->slug)) {
                $room->slug = Str::slug($room->title);
            }
        });

        static::updating(function ($room) {
            if ($room->isDirty('title') && !$room->isDirty('slug')) {
                $room->slug = Str::slug($room->title);
            }
        });
    }

    public function getImageUrlAttribute($index = 0)
    {
        $images = $this->images ?? [];
        if (isset($images[$index])) {
            return asset('storage/' . $images[$index]);
        }
        return null;
    }

    public function getAllImageUrlsAttribute()
    {
        $images = $this->images ?? [];
        return array_map(function ($image) {
            return asset('storage/' . $image);
        }, $images);
    }
}