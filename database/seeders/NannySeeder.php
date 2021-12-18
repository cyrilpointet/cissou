<?php

namespace Database\Seeders;

use App\Models\Nanny;
use Illuminate\Database\Seeder;

class NannySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Nanny::truncate();

        Nanny::create([
            'comment_rights' => 2,
            'user_id' => 2,
            'baby_id' => 1
        ]);
    }
}
