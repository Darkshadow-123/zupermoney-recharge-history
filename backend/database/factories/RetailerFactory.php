<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RetailerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'phone' => $this->faker->numerify('9#########'),
        ];
    }
}
