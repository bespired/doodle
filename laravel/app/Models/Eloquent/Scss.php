<?php

namespace App\Models\Eloquent;

use App\Models\Traits\HasHandleId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Scss extends Model
{

    use HasHandleId;
    use SoftDeletes;

    protected $table = 'scssx';

    protected $fillable = [
        'handle', 'name', 'order', 'label', 'type', 'status',
        'pathslug', 'scss',
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc')->get();
    }

}
