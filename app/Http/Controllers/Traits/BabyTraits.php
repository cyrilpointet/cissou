<?php

namespace App\Http\Controllers\Traits;

use App\Models\Nanny;

trait BabyTraits {
    private function populateBaby($baby, $user) {
        $baby->parent;
        $baby->nannies;

        $isParent = $user->id === $baby->parent->id;
        $nanny = $this->getNannyByUserId($baby->id, $user->id);
        switch (true) {
            case $isParent || $nanny->comment_rights > 0:
                $baby->comments;
        }

        return $baby;
    }

    private function getNannyByUserId($babyId, $userId) {
        return Nanny::where('user_id', '=', $userId)
            ->where('baby_id', '=', $babyId)
            ->first();
    }
}
