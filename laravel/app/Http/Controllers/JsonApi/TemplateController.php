<?php

namespace App\Http\Controllers\JsonApi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TemplateController extends Controller
{

    public function schema($type)
    {
        $Model = sprintf('\App\Models\Eloquent\%sTemplate', ucfirst($type));

        $count  = $Model::count();
        $schema = $Model::query()
            ->whereType('schema')
            ->exclude(['handle'])
            ->first()
            ->toArray();

        $create         = $Model::create($schema);
        $create->name   = $count . time();
        $create->type   = 'template';
        $create->status = 'new';
        $create->save();

        return response()->json($create);
    }

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
        $row   = $Model::query()
            ->whereHandle($data->handle)
            ->whereType('template')
            ->first();

        if ($type === 'layout') {$row = $this->fillLayoutData($row, $data);}

        $row->save();

        return response()->json($row);
    }

    public function remove(Request $request, $type)
    {
        $data  = (object) $request->all();
        $Model = sprintf('\App\Models\Eloquent\%sTemplate', ucfirst($type));

        $fetch = $Model::query()
            ->whereIn('handle', $data->handles)
            ->delete();

        return response()->json($data->handles);
    }

    public function export(Request $request, $type)
    {
        return response()->json('yay');
    }

    private function uniqueName($row, $data)
    {
        // figure out model by row

        $slug  = slug($data->label);
        $Model = get_class($row);

        $models = $Model::where('name', $slug)->get();

        if (count($models) === 0) {
            return $slug;
        }

        $count = count($models);
        while (count($models) > 0) {
            $check  = sprintf('%s-%s', $slug, $count);
            $models = $Model::where('name', $check)->get();
            $count++;
        }
        return $check;

    }

    private function fillLayoutData($row, $data)
    {
        if ($data->status === 'new') {
            $row->name = $this->uniqueName($row, $data);
        }
        $row->status     = 'saved';
        $row->label      = $data->label;
        $row->responsive = $data->responsive;
        $row->media      = $data->media;
        $row->draw       = $data->draw;
        return $row;
    }

}
