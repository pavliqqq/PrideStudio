<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->optional()->sentence(),
            'image' => fake()->imageUrl(640, 480, 'business', true, 'order'),
            'status' => fake()->randomElement(['new', 'in process', 'ended']),
            'price' => fake()->randomFloat(2, 100, 5000),
        ];
    }
}
