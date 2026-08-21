<?php

use App\Http\Controllers\AdminBookingController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VenueController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// HALAMAN UTAMA / LANDING PAGE (Terbuka untuk siapa saja)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// KATALOG & FORM BOOKING (Bisa diakses GUEST/UMUM agar bisa pesan tanpa login dulu)
Route::get('/katalog', [VenueController::class, 'index'])->name('katalog.index');
Route::get('/booking/{venue}', [BookingController::class, 'create'])->name('booking.create');
Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');



// KHUSUS USER LOGIN (Untuk melihat riwayat & urusan finansial privat)
Route::middleware(['auth', 'verified'])->group(function(){
    Route::get('/history', [HistoryController::class, 'index'])->name('history.index');
    Route::delete('/history/{booking}', [HistoryController::class, 'destroy'])->name('history.destroy');
    Route::post('/booking/{booking}/upload-receipt', [BookingController::class, 'uploadReceipt'])->name('booking.upload_receipt');
    Route::get('/booking/{booking}/receipt-file', [BookingController::class, 'getReceiptFile'])->name('booking.receipt_file');
});


// RUTIN BUAT USER YANG SUDAH LOGIN (Breeze Default)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// PANEL KHUSUS ADMIN (Hanya boleh diakses akun dengan role 'admin')
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function(){
    Route::get('/dashboard', [AdminBookingController::class, 'index'])->name('dashboard');
    Route::patch('/dashboard/{booking}/status', [AdminBookingController::class, 'updateStatus'])->name('booking.status');
});

require __DIR__.'/auth.php';