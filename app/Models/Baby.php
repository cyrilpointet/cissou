<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Baby extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'birth',
        'user_id'
    ];

    public function parent()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function nannies()
    {
        return $this->belongsToMany(User::class)
            ->using(Nanny::class)
            ->withPivot('comment_rights');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
