<?php

namespace App\Http\Controllers\JsonApi;

use App\Http\Controllers\Controller;
use App\Models\Eloquent\RowTemplate;

class RowTemplateController extends Controller
{

    public function index()
    {
        $rows = RowTemplate::query()
            ->whereType('template')
            ->get();

        return response()->json($rows);
    }

}
