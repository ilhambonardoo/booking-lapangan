<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VenueController extends Controller
{
    // Halaman katalog venue
    public function index()
    {
        $venues = Venue::all();

        return Inertia::render('Katalog/Index', [
            'venues' => $venues
        ]);
    }
}
