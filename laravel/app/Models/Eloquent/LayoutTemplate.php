<?php

namespace App\Models\Eloquent;

use App\Models\Traits\HasHandleId;
use Illuminate\Database\Eloquent\Model;

class LayoutTemplate extends Model
{

    use HasHandleId;

    protected $fillable = [
        'handle', 'name', 'label', 'type',
        'background', 'fillstyle', 'maxwidth',
        'columns', 'conditions', 'draw',
    ];

    protected $casts = [
        'columns' => 'array',
    ];

}
