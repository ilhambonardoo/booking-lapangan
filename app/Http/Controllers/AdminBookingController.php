<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminBookingController extends Controller
{
    // Menampilkan semua booking
    public function index()
    {
        $bookings = Booking::with(['user', 'venue'])
                ->latest()
                ->get();
        
        return Inertia::render('Admin/Dashboard', [
            'bookings' => $bookings
        ]);     
    }

    // Update status booking
    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $booking->update($validated);

        return back()->with('success', 'Status booking berhasil diperbarui!');
    }
}
