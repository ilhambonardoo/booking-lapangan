<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookingController extends Controller
{
    // Tampilan form booking dengan data yang terpilih
    public function create(Venue $venue)
    {
        return Inertia::render('Booking/Create', [
            'venue' => $venue
        ]);
    }

    // Logic simpan booking
    public function store(StoreBookingRequest $request)
    {
        return DB::transaction(function () use ($request){
            $venue = Venue::where('id', $request->venue_id)->lockForUpdate()->firstOrFail();

            if (!Auth::check()){
                $user = User::where('email', $request->email)->first();

                if(!$user){
                    $user = User::create([
                        'name' => $request->name,
                        'email' => $request->email,
                        'password' => Hash::make(Str::random(16)),
                        'role' => 'user',
                    ]);
                }

                Auth::login($user);

            } else {
                $user = Auth::user();
            }
            
            $isConflict = Booking::where('venue_id', $venue->id)
                ->where('booking_date', $request->booking_date)
                ->where('status', '!=', 'cancelled')
                ->where(function ($query) use ($request){
                    $query->where(function ($q) use ($request){
                        $q->where('start_time', '<', $request->end_time)
                        ->where('end_time', '>', $request->start_time);
                    });
                })
                ->exists();

            if($isConflict){
                return back()->withErrors([
                    'start_time' => 'Maaf, lapangan sudah dipesan pada jam dan tanggal tersebut!'
                ]);
            }

            $start = strtotime($request->start_time);
            $end = strtotime($request->end_time);
            $hours = ($end - $start) / 3600;

            $totalPrice = $hours * $venue->price_per_hour;



            $user->bookings()->create([
                'venue_id' => $venue->id,
                'booking_date' => $request->booking_date,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'total_price' => $totalPrice,
                'status' => 'pending'
            ]);

            return redirect()->route('history.index')->with('success', 'Booking berhasil! Silahkan lakukan pembayaran.');
        });
    }
}
