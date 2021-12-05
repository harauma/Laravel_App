<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    public function accont()
    {
        return $this
            ->hasOne(Accout::class)
            ->get();
    }

    protected $casts = [
        'completed' => 'boolean',
    ];

    // public function accont()
    // {
    //     return $this
    //         ->with('accounts')
    //         ->get();
    // }
}
