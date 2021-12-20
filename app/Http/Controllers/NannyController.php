<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\BabyTraits;
use App\Models\Baby;
use App\Models\Nanny;
use Illuminate\Http\Request;

class NannyController extends Controller
{
    use BabyTraits;

    public function create(Request $request) {
        try {
            $request->validate([
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
            'comment_rights' => 0,
            'user_id' => $request->user_id,
            'baby_id' => $baby->id
        ]);

        $baby->refresh();
        $baby->nannies;
        $newNanny = null;
        foreach ($baby->nannies as $nanny) {
            if ($nanny->pivot->user_id === $request->user_id && $nanny->pivot->baby_id === $baby->id) {
                $newNanny = $nanny;
            }
        }
        return response($newNanny, 201);
    }

    public function update(Request $request, $id, $user_id) {
        $baby = $request->get('baby');
        $nanny = $this->getNannyByUserId($baby->id, intval($user_id));
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

        return response($this->populateBaby($baby, $request->user()), 200);
    }

    public function delete(Request $request, $id, $user_id) {
        $baby = $request->get('baby');
        $nanny = $this->getNannyByUserId($baby->id, intval($user_id));
        if (null === $nanny) {
            return response([
                "message" => "Unknown nanny"
            ], 404);
        }
        $baby->nannies()->detach($user_id);

        return response($this->populateBaby($baby, $request->user()), 200);
    }
}
