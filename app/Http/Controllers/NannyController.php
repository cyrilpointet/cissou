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
        $baby = Baby::find($id);
        if (null === $baby) {
            return response([
                "message" => "Unknown baby"
            ], 404);
        }
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

        $baby = Baby::find($id);
        $baby->parent;
        $baby->nannies;
        return response($baby, 201);
    }
}
