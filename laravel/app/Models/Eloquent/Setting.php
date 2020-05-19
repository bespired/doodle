<?php

namespace App\Models\Eloquent;

use App\Models\Traits\HasHandleId;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{

    use HasHandleId;

    protected $fillable = [
        'handle', 'type', 'payload',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'payload' => 'array',
    ];

}
