<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
Route::get('/admincomments', function () {
    return Inertia::render('AdminPages/Admincomments'); 
});
Route::get('/adminanalytics', function () {
    return Inertia::render('AdminPages/Adminanalytics'); 
});
Route::get('/adminrooms', function () {
    return Inertia::render('AdminPages/Adminrooms'); 
});
Route::get('/config', function () {
    return Inertia::render('AdminPages/Config'); 
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
