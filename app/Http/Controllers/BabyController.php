<?php

namespace App\Http\Controllers;

use App\Models\Baby;
use Illuminate\Http\Request;

class BabyController extends Controller
{
    public function create(Request $request) {
        try {
            $request->validate([
                'name' => 'required',
                'birth' => 'required',
            ]);
        } catch (\Exception $e) {
            return response([
                'message' => ['Invalid or missing fields']
            ], 400);
        }
        $user = $request->user();
        $baby = Baby::create([
            'name' => $request->name,
            'birth' => $request->birth,
            'user_id' => $user->id
        ]);
        $baby->parent;
        return response($baby, 201);
    }

    public function read($id) {
        $baby = Baby::find($id);
        if (null === $baby) {
            return response([
                "message" => "Unknown baby"
            ], 404);
        }
        $baby->parent;
        return response($baby, 200);
    }

    public function update(Request $request, $id) {
        $baby = Baby::find($id);
        if (null === $baby) {
            return response([
                "message" => "Unknown baby"
            ], 404);
        }
        switch (true) {
            case isset($request->name):
                $baby->name = $request->name;
            case isset($request->birth):
                $baby->birth = $request->birth;
        }
        $baby->save();
        return response($baby, 200);
    }

    public function delete($id) {
        $baby = Baby::find($id);
        if (null === $baby) {
            return response([
                "message" => "Unknown baby"
            ], 404);
        }
        $baby->delete();
        return response([
            'message' => 'Baby deleted'
        ], 200);
    }
}
