<?php

namespace App\Http\Controllers;

use App\Models\Baby;
use App\Models\Nanny;
use Illuminate\Http\Request;

class NannyController extends Controller
{
    public function create(Request $request, $id) {
        try {
            $request->validate([
                'comment_rights' => 'required',
                'user_id' => 'required'
            ]);
        } catch (\Exception $e) {
            return response([
                'message' => ['Invalid or missing fields']
            ], 400);
        }

        $user = $request->user();
        if ($user->id === $request->user_id) {
            return response([
                "message" => "You cannot be a nanny of your own baby"
            ], 400);
        }

        $baby = $request->get('baby');
        $nannies = $baby->nannies;
        foreach ($nannies as $nanny) {
            if ($nanny->pivot->user_id === $request->user_id) {
                return response([
                    "message" => "Already nanny"
                ], 400);
            }
        }

        Nanny::create([
            'comment_rights' => $request->comment_rights,
            'user_id' => $request->user_id,
            'baby_id' => $baby->id
        ]);

        $baby->refresh();
        $baby->parent;
        $baby->nannies;
        return response($baby, 201);
    }

    public function read(Request $request, $user_id) {
        $baby = $request->get('baby');
        $nanny = Nanny::where('user_id', '=', intval($user_id))
            ->where('baby_id', '=', $baby->id)
            ->first();
        if (null === $nanny) {
            return response([
                "message" => "Unknown nanny"
            ], 404);
        }
        return response($nanny, 200);
    }

    public function update(Request $request, $id, $user_id) {
        $baby = $request->get('baby');
        $nanny = Nanny::where('user_id', '=', intval($user_id))
            ->where('baby_id', '=', $baby->id)
            ->first();
        if (null === $nanny) {
            return response([
                "message" => 'unknown nanny'
            ], 404);
        }

        $attributes = [];
        switch (true) {
            case isset($request->comment_rights):
                $attributes['comment_rights'] = $request->comment_rights;
        }
        $baby->nannies()->updateExistingPivot(intval($user_id), $attributes);

        $baby->parent;
        $baby->nannies;

        return response($baby, 200);
    }

    public function delete(Request $request, $id, $user_id) {
        $baby = $request->get('baby');
        $nanny = Nanny::where('user_id', '=', intval($user_id))
            ->where('baby_id', '=', $baby->id)
            ->first();
        if (null === $nanny) {
            return response([
                "message" => "Unknown nanny"
            ], 404);
        }
        $baby->nannies()->detach($user_id);

        $baby->parent;
        $baby->nannies;

        return response($baby, 200);
    }
}
