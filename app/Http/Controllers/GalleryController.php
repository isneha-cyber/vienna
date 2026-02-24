<?php
namespace App\Http\Controllers;

use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    // GET all images
    public function index()
    {
        $images = GalleryImage::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($image) {
                return [
                    'id'         => $image->id,
                    'title'      => $image->title,
                    'category'   => $image->category,
                    'image_url'  => asset('storage/' . $image->image_path),
                    'alt_text'   => $image->alt_text,
                    'sort_order' => $image->sort_order,
                    'created_at' => $image->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return response()->json([
            'success' => true,
            'data'    => $images,
        ]);
    }

    // POST - upload multiple images
    public function store(Request $request)
    {
        $request->validate([
            'images'      => 'required|array|min:1',
            'images.*'    => 'required|image|mimes:jpeg,png,jpg,webp|max:5048',
            'titles'      => 'nullable|array',
            'titles.*'    => 'nullable|string|max:255',
            'categories'  => 'nullable|array',
            'categories.*'=> 'nullable|string|max:100',
            'alt_texts'   => 'nullable|array',
            'alt_texts.*' => 'nullable|string|max:255',
        ]);

        $uploadedImages = [];
        
        foreach ($request->file('images') as $index => $imageFile) {
            $path = $imageFile->store('gallery', 'public');
            
            $title = $request->titles[$index] ?? null;
            $category = $request->categories[$index] ?? null;
            $altText = $request->alt_texts[$index] ?? null;
            
            $galleryImage = GalleryImage::create([
                'image_path' => $path,
                'title'      => $title,
                'category'   => $category,
                'alt_text'   => $altText,
                'sort_order' => 0,
            ]);
            
            $uploadedImages[] = array_merge($galleryImage->toArray(), [
                'image_url' => asset('storage/' . $galleryImage->image_path),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => count($uploadedImages) . ' images uploaded successfully',
            'data'    => $uploadedImages,
        ], 201);
    }

    // POST (with _method=PUT) - update multiple images
    public function updateMultiple(Request $request)
    {
        $request->validate([
            'images_data' => 'required|array',
            'images_data.*.id' => 'required|exists:gallery_images,id',
            'images_data.*.title' => 'nullable|string|max:255',
            'images_data.*.category' => 'nullable|string|max:100',
            'images_data.*.alt_text' => 'nullable|string|max:255',
            'images_data.*.sort_order' => 'nullable|integer',
        ]);

        $updatedImages = [];
        
        foreach ($request->images_data as $imageData) {
            $image = GalleryImage::findOrFail($imageData['id']);
            
            $image->title = $imageData['title'] ?? $image->title;
            $image->category = $imageData['category'] ?? $image->category;
            $image->alt_text = $imageData['alt_text'] ?? $image->alt_text;
            $image->sort_order = $imageData['sort_order'] ?? $image->sort_order;
            $image->save();
            
            $updatedImages[] = array_merge($image->toArray(), [
                'image_url' => asset('storage/' . $image->image_path),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => count($updatedImages) . ' images updated successfully',
            'data'    => $updatedImages,
        ]);
    }

    // DELETE multiple images
    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|exists:gallery_images,id',
        ]);

        $deletedCount = 0;
        
        foreach ($request->ids as $id) {
            $image = GalleryImage::find($id);
            if ($image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
                $deletedCount++;
            }
        }

        return response()->json([
            'success' => true,
            'message' => $deletedCount . ' images deleted successfully',
        ]);
    }

    // Single image update (keep for backward compatibility)
    public function update(Request $request, $id)
    {
        $image = GalleryImage::findOrFail($id);

        $request->validate([
            'image'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5048',
            'title'      => 'nullable|string|max:255',
            'category'   => 'nullable|string|max:100',
            'alt_text'   => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($image->image_path);
            $image->image_path = $request->file('image')->store('gallery', 'public');
        }

        $image->title      = $request->title      ?? $image->title;
        $image->category   = $request->category   ?? $image->category;
        $image->alt_text   = $request->alt_text   ?? $image->alt_text;
        $image->sort_order = $request->sort_order ?? $image->sort_order;
        $image->save();

        return response()->json([
            'success' => true,
            'data'    => array_merge($image->toArray(), [
                'image_url' => asset('storage/' . $image->image_path),
            ]),
        ]);
    }

    // Single image delete (keep for backward compatibility)
    public function destroy($id)
    {
        $image = GalleryImage::findOrFail($id);
        Storage::disk('public')->delete($image->image_path);
        $image->delete();

        return response()->json(['success' => true]);
    }
}