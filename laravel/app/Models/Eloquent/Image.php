<?php

namespace App\Models\Eloquent;

use App\Models\Traits\HasHandleId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{

    use HasHandleId;
    use SoftDeletes;

    protected $fillable = [
        'handle', 'folder', 'name', 'label', 'status', 'file', 'mimetype', 'extension',
        'likes', 'width', 'height', 'bytes', 'deletehash',
        'url', 'data',
    ];

    protected $casts = [
        'data' => 'object',
    ];

}
