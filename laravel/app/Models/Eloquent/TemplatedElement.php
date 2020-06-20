<?php

namespace App\Models\Eloquent;

use App\Models\Traits\HasHandleId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TemplatedElement extends Model
{

    use HasHandleId;
    use SoftDeletes;

    protected $fillable = [
        'handle', 'name', 'label', 'type', 'status',
        'tag', 'icon', 'otml', 'draw',
    ];

    protected $casts = [
        // 'style' => 'array',
    ];

    public function scopeExclude($query, $value = array())
    {
        return $query->select(array_diff($this->fillable, (array) $value));
    }
}
