<?php

namespace Database\Seeders;

use App\Models\Baby;
use Illuminate\Database\Seeder;

class BabySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Baby::truncate();

        Baby::create([
            'name' => 'Baby Test',
            'birth' => '2021-06-30 11:21:50',
            'user_id' => 1
        ]);
    }
}
