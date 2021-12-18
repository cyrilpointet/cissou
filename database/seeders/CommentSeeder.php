<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Comment::truncate();

        Comment::create([
            'text' => 'comment editable',
            'user_id' => 1,
            'baby_id' => 2
        ]);

        Comment::create([
            'text' => 'comment readonly',
            'user_id' => 1,
            'baby_id' => 3
        ]);

        Comment::create([
            'text' => 'comment invisible',
            'user_id' => 1,
            'baby_id' => 4
        ]);
    }
}
