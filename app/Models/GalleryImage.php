<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    protected $fillable = [
        'title', 'category', 'image_path', 'alt_text', 'sort_order', 'is_active'
    ];
}