<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    // Tampilan History Booking
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user){
            abort(401);
        }

        $bookings = $user->bookings()
            ->with('venue')
            ->latest()
            ->get();

        return Inertia::render("History/Index", [
            'bookings'=> $bookings
        ]);
    }
}
