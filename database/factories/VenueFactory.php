<?php

namespace Database\Factories;

use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Venue>
 */
class VenueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company() . 'Arena',
            'type' => $this->faker->randomElement(['futsal', 'basket', 'padel']),
            'price_per_hour' => $this->faker->randomElement([100000, 150000, 200000, 250000]),
            'description' => 'Fasilitas: Ruang ganti, tempat parkir luas, dan lampu penerangan malam malam.',
            'image_path' => null,
        ];
    }
}
