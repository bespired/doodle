<?php

namespace App\Models\Eloquent;

use App\Models\Traits\HasHandleId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WidgetTemplate extends Model
{

    use HasHandleId;
    use SoftDeletes;

    protected $fillable = [
        'handle', 'name', 'label', 'type', 'status',
        'elements', 'draw',
    ];

    protected $casts = [
        'elements' => 'array',
    ];

    public function scopeExclude($query, $value = array())
    {
        return $query->select(array_diff($this->fillable, (array) $value));
    }
}
