<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class RoomController extends Controller
{
    /**
     * Display a listing of the rooms (API).
     */
    public function index()
    {
        try {
            $rooms = Room::where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('number')
                ->get()
                ->map(function ($room) {
                    return [
                        'id' => $room->id,
                        'number' => $room->number,
                        'slug' => $room->slug,
                        'title' => $room->title,
                        'area' => $room->area,
                        'guests' => $room->guests,
                        'bed_info' => $room->bed_info,
                        'deck_info' => $room->deck_info,
                        'description' => $room->description,
                        'images' => $room->getAllImageUrlsAttribute(),
                        'amenities' => $room->amenities ?? [],
                        'price' => $room->price,
                        'category' => $room->category,
                        'sort_order' => $room->sort_order,
                        'created_at' => $room->created_at->format('Y-m-d H:i:s'),
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $rooms
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch rooms',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a single room by slug (API).
     */
    public function show($slug)
    {
        try {
            $room = Room::where('slug', $slug)
                ->where('is_active', true)
                ->first();

            if (!$room) {
                return response()->json([
                    'success' => false,
                    'message' => 'Room not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $room->id,
                    'number' => $room->number,
                    'slug' => $room->slug,
                    'title' => $room->title,
                    'area' => $room->area,
                    'guests' => $room->guests,
                    'bed_info' => $room->bed_info,
                    'deck_info' => $room->deck_info,
                    'description' => $room->description,
                    'images' => $room->getAllImageUrlsAttribute(),
                    'amenities' => $room->amenities ?? [],
                    'price' => $room->price,
                    'category' => $room->category,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch room',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created room.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'number' => 'required|string|unique:rooms,number',
                'title' => 'required|string|max:255',
                'area' => 'nullable|string|max:50',
                'guests' => 'nullable|string|max:100',
                'bed_info' => 'nullable|string|max:255',
                'deck_info' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'price' => 'nullable|string|max:100',
                'category' => 'nullable|string|max:100',
                'sort_order' => 'nullable|integer',
            ]);

            // Handle amenities - they come as individual fields amenities[0], amenities[1], etc.
            $amenities = [];
            foreach ($request->all() as $key => $value) {
                if (preg_match('/^amenities\[\d+\]$/', $key)) {
                    $amenities[] = $value;
                }
            }

            // Handle image uploads
            $imagePaths = [];
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    if ($image->isValid()) {
                        $path = $image->store('rooms', 'public');
                        $imagePaths[] = $path;
                    }
                }
            }

            $room = Room::create([
                'number' => $request->number,
                'slug' => Str::slug($request->title),
                'title' => $request->title,
                'area' => $request->area,
                'guests' => $request->guests,
                'bed_info' => $request->bed_info,
                'deck_info' => $request->deck_info,
                'description' => $request->description,
                'images' => $imagePaths,
                'amenities' => $amenities,
                'price' => $request->price,
                'category' => $request->category,
                'sort_order' => $request->sort_order ?? 0,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Room created successfully',
                'data' => [
                    'id' => $room->id,
                    'number' => $room->number,
                    'slug' => $room->slug,
                    'title' => $room->title,
                    'images' => $room->getAllImageUrlsAttribute(),
                ]
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create room',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified room.
     */
 /**
 * Update the specified room.
 */
public function update(Request $request, $id)
{
    try {
        $room = Room::findOrFail($id);

        $validated = $request->validate([
            'number' => 'required|string|unique:rooms,number,' . $id,
            'title' => 'required|string|max:255',
            'area' => 'nullable|string|max:50',
            'guests' => 'nullable|string|max:100',
            'bed_info' => 'nullable|string|max:255',
            'deck_info' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|string|max:100',
            'category' => 'nullable|string|max:100',
            'sort_order' => 'nullable|integer',
        ]);

        // Handle amenities
        $amenities = [];
        foreach ($request->all() as $key => $value) {
            if (preg_match('/^amenities\[\d+\]$/', $key)) {
                $amenities[] = $value;
            }
        }

        // Handle existing images
        $existingImages = [];
        if ($request->has('existing_images')) {
            $existingImages = $request->input('existing_images');
            if (is_string($existingImages)) {
                $existingImages = json_decode($existingImages, true) ?? [];
            }
        }

        // Delete images that are no longer needed
        if ($room->images) {
            $imagesToDelete = array_diff($room->images, $existingImages);
            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $imagePaths = $existingImages;

        // Handle new image uploads — stored under storage/app/public/rooms/
        // These become accessible via /storage/rooms/filename after storage:link
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                if ($image->isValid()) {
                    $path = $image->store('rooms', 'public'); // ✅ saves to storage/app/public/rooms/
                    $imagePaths[] = $path;                    // ✅ stores relative path e.g. rooms/abc.jpg
                }
            }
        }

        $room->update([
            'number'     => $request->number,
            'title'      => $request->title,
            'area'       => $request->area,
            'guests'     => $request->guests,
            'bed_info'   => $request->bed_info,
            'deck_info'  => $request->deck_info,
            'description'=> $request->description,
            'images'     => $imagePaths,
            'amenities'  => $amenities,
            'price'      => $request->price,
            'category'   => $request->category,
            'sort_order' => $request->sort_order ?? $room->sort_order,
        ]);

        // ✅ CRITICAL: Refresh the model so getAllImageUrlsAttribute()
        // reads the newly saved paths, not the old cached values
        $room->refresh();

        return response()->json([
            'success' => true,
            'message' => 'Room updated successfully',
            'data' => [
                'id'     => $room->id,
                'slug'   => $room->slug,
                'title'  => $room->title,
                'images' => $room->getAllImageUrlsAttribute(), // ✅ now returns correct public URLs
            ]
        ]);

    } catch (ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors'  => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to update room',
            'error'   => $e->getMessage()
        ], 500);
    }
}

    /**
     * Remove the specified room.
     */
    public function destroy($id)
    {
        try {
            $room = Room::findOrFail($id);

            // Delete images from storage
            if ($room->images) {
                foreach ($room->images as $image) {
                    Storage::disk('public')->delete($image);
                }
            }

            $room->delete();

            return response()->json([
                'success' => true,
                'message' => 'Room deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete room',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete multiple rooms.
     */
   public function destroyMultiple(Request $request)
{
    try {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|exists:rooms,id',
        ]);

        $deletedCount = 0;
        foreach ($request->ids as $id) {
            $room = Room::find($id);
            if ($room) {
                // Delete images
                if ($room->images) {
                    foreach ($room->images as $image) {
                        Storage::disk('public')->delete($image);
                    }
                }
                $room->delete();
                $deletedCount++;
            }
        }

        return response()->json([
            'success' => true,
            'message' => $deletedCount . ' rooms deleted successfully'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete rooms',
            'error' => $e->getMessage()
        ], 500);
    }
}
}