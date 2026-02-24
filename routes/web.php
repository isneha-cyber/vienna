<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BookingController;
use Inertia\Inertia;
use App\Models\Room;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/about', function () {
    return Inertia::render('About'); 
});

Route::get('/winedine', function () {
    return Inertia::render('Winedine'); 
});
Route::get('/wellness', function () {
    return Inertia::render('Wellness'); 
});
Route::get('/celebrate', function () {
    return Inertia::render('Celebrate'); 
});
Route::get('/gallery', function () {
    return Inertia::render('Gallery'); 
});
Route::get('/contact', function () {
    return Inertia::render('Contact'); 
});

Route::get('/crete', function () {
    return Inertia::render('Crete'); 
});
Route::get('/gifts', function () {
    return Inertia::render('Giftcard'); 
});
Route::get('/experiences', function () {
    return Inertia::render('Experience'); 
});
Route::get('/career', function () {
    return Inertia::render('Career'); 
});
Route::get('/loyalty', function () {
    return Inertia::render('Career'); 
});
Route::get('/accomodation', function () {
    return Inertia::render('Accomodation'); 
});
Route::get('/roomdetail', function () {
    return Inertia::render('Roomdetail'); 
});

// routes/web.php
Route::get('/rooms/{slug}', function ($slug) {
    return Inertia::render('Roomdetail', [
        'slug' => $slug,
    ]);
})->name('room.detail');

Route::get('/maindashboard', function () {
    return Inertia::render('Maindashboard'); 
});

// dashboard pages routes
Route::get('/admingallery', function () {
    return Inertia::render('AdminPages/Admingallery'); 
});

Route::get('/adminanalytics', function () {
    return Inertia::render('AdminPages/Adminanalytics'); 
});
Route::get('/adminrooms', function () {
    return Inertia::render('AdminPages/Adminrooms'); 
});
Route::get('/adminusers', function () {
    return Inertia::render('AdminPages/Users'); 
});
Route::get('/adminlogs', function () {
    return Inertia::render('AdminPages/Adminlogs'); 
});



//gallery routes

Route::get('/mygallery', [GalleryController::class, 'index'])->name('mygallery.index');
Route::post('/mygallery', [GalleryController::class, 'store'])->name('mygallery.store');
Route::post('/mygallery/update-multiple', [GalleryController::class, 'updateMultiple'])->name('mygallery.update-multiple');
Route::post('/mygallery/delete-multiple', [GalleryController::class, 'destroyMultiple'])->name('mygallery.delete-multiple');
Route::post('/mygallery/{id}', [GalleryController::class, 'update'])->name('mygallery.update');
Route::delete('/mygallery/{id}', [GalleryController::class, 'destroy'])->name('mygallery.destroy');




// Route::get('/accommodation', function () {
//     $rooms = App\Models\Room::where('is_active', true)
//         ->orderBy('sort_order')
//         ->get()
//         ->map(function ($room) {
//             return [
//                 'id' => $room->id,
//                 'number' => $room->number,
//                 'slug' => $room->slug,
//                 'title' => $room->title,
//                 'area' => $room->area,
//                 'guests' => $room->guests,
//                 'bed_info' => $room->bed_info,
//                 'deck_info' => $room->deck_info,
//                 'description' => $room->description,
//                 'images' => $room->getAllImageUrlsAttribute(),
//                 'amenities' => $room->amenities ?? [],
//                 'price' => $room->price,
//                 'category' => $room->category,
//             ];
//         });
    
//     return Inertia::render('Accomodation1', [
//         'rooms' => $rooms
//     ]);
// })->name('accommodation.index');

Route::get('/accommodation/{slug}', function ($slug) {
    $room = App\Models\Room::where('slug', $slug)
        ->where('is_active', true)
        ->firstOrFail();
    
    return Inertia::render('Roomdetail', [
        'room' => [
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
})->name('accommodation.show');

// API Routes (for data fetching with axios) - FIXED: Separate from admin routes
Route::prefix('api')->group(function () {
    Route::get('/myrooms', [RoomController::class, 'index'])->name('api.rooms.index');
    Route::get('/myrooms/{slug}', [RoomController::class, 'show'])->name('api.rooms.show');
    Route::post('/myrooms', [RoomController::class, 'store'])->name('api.rooms.store');
    // Change this line to accept both POST and PUT
    Route::match(['post', 'put'], '/myrooms/{id}', [RoomController::class, 'update'])->name('api.rooms.update');
    Route::delete('/myrooms/{id}', [RoomController::class, 'destroy'])->name('api.rooms.destroy');
    Route::post('/myrooms/delete-multiple', [RoomController::class, 'destroyMultiple'])->name('api.rooms.destroyMultiple');
});

// Admin routes (for Inertia admin panel) - These should be separate from API routes
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/rooms', function () {
        return Inertia::render('Addroom');
    })->name('admin.rooms.index');

    
    
    // Keep your existing admin routes if needed
    Route::match(['post', 'put'], '/myrooms/{id}', [RoomController::class, 'update'])->name('myrooms.update');
    Route::delete('/myrooms/{id}', [RoomController::class, 'destroy'])->name('myrooms.destroy');
    Route::post('/myrooms/delete-multiple', [RoomController::class, 'destroyMultiple'])->name('myrooms.destroyMultiple');
});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
