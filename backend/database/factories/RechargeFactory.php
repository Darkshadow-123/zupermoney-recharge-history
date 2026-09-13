<?php

namespace Database\Factories;

use App\Models\Recharge;
use App\Models\Retailer;
use Illuminate\Database\Eloquent\Factories\Factory;

class RechargeFactory extends Factory
{
    protected $model = Recharge::class;

    public function definition(): array
    {
        return [
            'retailer_id' => Retailer::factory(),
            // Indian mobile numbers: 10 digits, starting 6-9 (matches the
            // validation regex used in StoreRechargeRequest).
            'mobile_number' => $this->faker->numerify(
                $this->faker->randomElement(['6', '7', '8', '9']) . '#########'
            ),
            'operator' => $this->faker->randomElement(Recharge::OPERATORS),
            'amount' => $this->faker->randomElement([10, 19, 29, 49, 99, 149, 199, 299, 499, 999]),
            'status' => $this->faker->randomElement(Recharge::STATUSES),
            // Spread records across the last 30 days so the date-range filter
            // actually has something interesting to filter.
            'created_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ];
    }
}
