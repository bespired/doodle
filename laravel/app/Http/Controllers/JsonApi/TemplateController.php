<?php

namespace App\Http\Controllers\JsonApi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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

    public function save(Request $request, $type)
    {

        $data = (object) $request->all();

        $Model = sprintf('\App\Models\Eloquent\%sTemplate', ucfirst($type));

        $row = $Model::query()
            ->whereHandle($data->handle)
            ->whereType('template')
            ->first();

        if ($type === 'layout') {$row = $this->newLayoutData($row, $data);}

        $row->save();

        return response()->json($row);
    }

    private function newLayoutData($row, $data)
    {
        $row->label      = $data->label;
        $row->responsive = $data->responsive;
        $row->media      = $data->media;
        $row->draw       = $data->draw;
        return $row;
    }

}
