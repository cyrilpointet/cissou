<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\BabyTraits;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    use BabyTraits;

    public function create(Request $request) {
        try {
            $request->validate([
                'text' => 'required|string|min:1|max:255',
            ]);
        } catch (\Exception $e) {
            return response([
                'message' => ['Invalid or missing fields']
            ], 400);
        }

        $user = $request->user();
        $baby = $request->get('baby');
        Comment::create([
            'text' => $request->text,
            'user_id' => $user->id,
            'baby_id' => $baby->id
        ]);

        $baby->refresh();
        return response($this->populateBaby($baby, $request->user()), 201);
    }

    public function read(Request $request, $id, $comment_id) {
        $comment = Comment::find($comment_id);
        if (null === $comment) {
            return response([
                "message" => "Unknown comment"
            ], 404);
        }

        $comment->user;
        $comment->baby;

        return response($comment, 200);
    }

    public function update(Request $request, $id, $comment_id) {
        try {
            $request->validate([
                'text' => 'required|string|min:1|max:255',
            ]);
        } catch (\Exception $e) {
            return response([
                'message' => ['Invalid or missing fields']
            ], 400);
        }

        $comment = Comment::find($comment_id);
        if (null === $comment) {
            return response([
                "message" => "Unknown comment"
            ], 404);
        }

        $comment->text = $request->text;
        $comment->save();
        $comment->user;
        $comment->baby;
        return response($comment, 200);
    }

    public function delete(Request $request, $id, $comment_id) {
        $comment = Comment::find($comment_id);
        if (null === $comment) {
            return response([
                "message" => "Unknown comment"
            ], 404);
        }
        $comment->delete();
        return response([
            'message' => 'Comment deleted'
        ], 200);
    }
}
