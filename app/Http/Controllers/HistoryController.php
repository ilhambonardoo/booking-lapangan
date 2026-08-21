<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    // Tampilan History Booking
    public function index(Request $request)
    {
        abort_unless($request->user()->role === 'user', 403);
        
        $user = $request->user();
        if (!$user){
            abort(401);
        }

        $bookings = Booking::where('user_id', $request->user()->id)
            ->with('venue')
            ->latest()
            ->get();

        return Inertia::render("History/Index", [
            'bookings'=> $bookings
        ]);
    }

    public function destroy(Request $request, Booking $booking)
    {
        abort_unless($request->user()->role === 'user', 403);
        abort_unless($booking->user_id === $request->user()->id, 403);

        if(in_array($booking->status, ['cancelled', 'rejected'])){
            $booking->delete();
            return redirect()->back()->with('success', 'Data history usang berhasil dihapus permanen!');
        }

        return redirect()->back()->with('error', 'Tidak dapat menghapus pesanan yang aktif / pending');
    }
}
