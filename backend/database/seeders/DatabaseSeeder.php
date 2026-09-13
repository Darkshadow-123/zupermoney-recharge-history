<?php

namespace Database\Seeders;

use App\Models\Recharge;
use App\Models\Retailer;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 4 mock retailers, as requested (3-4 range).
        $retailers = Retailer::factory()->count(4)->create();

        // 40+ recharges spread randomly across those retailers.
        Recharge::factory()
            ->count(48)
            ->make()
            ->each(function (Recharge $recharge) use ($retailers) {
                $recharge->retailer_id = $retailers->random()->id;
                $recharge->save();
            });
    }
}
