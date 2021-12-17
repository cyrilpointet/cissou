<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Nanny extends Pivot
{
    use HasFactory;

    protected $table = 'baby_user';

    protected $fillable = [
        'user_id',
        'baby_id',
        'comment_rights'
    ];
}
