<?php

namespace App\Http\Middleware;

use App\Models\Baby;
use Closure;
use Illuminate\Http\Request;

class EnsureIsBabyParent
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        $baby = Baby::find($request->route('id'));
        switch (true) {
            case null === $baby:
                return response([
                    "message" => "Unknown baby"
                ], 404);
            case $user->id !== $baby->parent->id:
                return response([
                    "message" => "Unauthorized"
                ], 401);
        }
        $request->attributes->add(['baby' => $baby]);
        return $next($request);
    }
}
