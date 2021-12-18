<?php

namespace App\Http\Controllers;

use App\Models\Baby;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\BabyTraits;

class BabyController extends Controller
{
    use BabyTraits;

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

        return response($this->populateBaby($baby, $request->user()), 201);
    }

    public function read(Request $request) {
        $baby = $request->get('baby');
        return response($this->populateBaby($baby, $request->user()), 200);
    }

    public function update(Request $request) {
        $baby = $request->get('baby');

        switch (true) {
            case isset($request->name):
                $baby->name = $request->name;
            case isset($request->birth):
                $baby->birth = $request->birth;
        }
        $baby->save();

        return response($this->populateBaby($baby, $request->user()), 200);
    }

    public function delete(Request $request) {
        $baby = $request->get('baby');
        $baby->delete();
        return response([
            'message' => 'Baby deleted'
        ], 200);
    }
}
