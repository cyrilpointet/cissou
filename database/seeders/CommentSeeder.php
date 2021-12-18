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
            'content' => 'comment editable',
            'user_id' => 1,
            'baby_id' => 2
        ]);

        Comment::create([
            'content' => 'comment readonly',
            'user_id' => 1,
            'baby_id' => 3
        ]);

        Comment::create([
            'content' => 'comment invisible',
            'user_id' => 1,
            'baby_id' => 4
        ]);
    }
}
