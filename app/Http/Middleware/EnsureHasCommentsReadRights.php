<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Traits\BabyTraits;
use App\Models\Baby;
use Closure;
use Illuminate\Http\Request;

class EnsureHasCommentsReadRights
{
    use BabyTraits;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $baby = Baby::find($request->route('id'));
        if (null === $baby) {
            return response([
                "message" => "Unknown baby"
            ], 404);
        }

        $user = $request->user();
        $nanny = $this->getNannyByUserId($baby->id, $user->id);
        if (($user->id !== $baby->parent->id) && (null === $nanny)) {
            return response([
                "message" => "Unauthorized"
            ], 401);
        }

        if ($nanny->comment_rights < 1) {
            return response([
                "message" => "Insuffisant rights"
            ], 401);
        }

        $request->attributes->add(['baby' => $baby]);
        return $next($request);
    }
}
