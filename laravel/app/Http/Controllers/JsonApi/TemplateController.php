<?php

namespace App\Http\Controllers\JsonApi;

use App\Http\Controllers\Controller;

class TemplateController extends Controller
{

    public function index($type)
    {
        $Model = sprintf('\App\Models\Eloquent\%sTemplate', ucfirst($type));

        $rows = $Model::query()
            ->whereType('template')
            ->get();

        return response()->json($rows);
    }

}
