<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use Validator;
use App\Models\User;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        $user->babies;
        $user->pupils;

        return response()
            ->json(['user' => $user,'token' => $token, ]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password')))
        {
            return response()
                ->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        $user->babies;
        $user->pupils;

        return response()
            ->json(['user' => $user,'token' => $token, ]);
    }

    // method for user logout and delete token
    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'You have successfully logged out and the token was successfully deleted'
        ];
    }

    public function show(Request $request)
    {
        $user = $request->user();
        $user->babies;
        $user->pupils;
        return response($user, 200);
    }

    public function findByEmail(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required',
            ]);
        } catch (\Exception $e) {
            return response([
                'message' => ['Invalid or missing fields']
            ], 400);
        }
        $user = User::where('email', '=', $request->email)->first();
        return response($user, 200);
    }
}
