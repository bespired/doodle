<?php

namespace App\Http\Controllers\JsonApi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TemplateController extends Controller
{

    public function schema($type)
    {
        $Model = sprintf('\App\Models\Eloquent\Templated%s', ucfirst($type));

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
        $Model = sprintf('\App\Models\Eloquent\Templated%s', ucfirst($type));

        $rows = $Model::query()
            ->whereType('template')
            ->get();

        return response()->json($rows);
    }

    public function save(Request $request, $type)
    {

        $data = (object) $request->all();

        $Model = sprintf('\App\Models\Eloquent\Templated%s', ucfirst($type));
        $row   = $Model::query()
            ->whereHandle($data->handle)
            ->whereType('template')
            ->first();

        $row = $this->fillTemplateData($row, $data);

        $row->save();

        return response()->json($row);
    }

    public function duplicate(Request $request, $type)
    {
        $data  = (object) $request->all();
        $Model = sprintf('\App\Models\Eloquent\Templated%s', ucfirst($type));

        $fetched = $Model::query()
            ->whereIn('handle', $data->handles)
            ->get();

        foreach ($fetched as $instance) {
            $instance->handle = null;
            $instance->status = "new";
            $instance->label  = 'Copy of ' . str_replace('Copy of ', '', $instance->label);
            $instance->name   = $this->copyName($instance->name, $Model);
            $clone            = (array) clone ((object) $instance->toArray());
            $create           = $Model::create($clone);
        }

        return response()->json($data->handles);
    }

    public function remove(Request $request, $type)
    {
        $data  = (object) $request->all();
        $Model = sprintf('\App\Models\Eloquent\Templated%s', ucfirst($type));

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

    private function copyName($name, $Model)
    {
        $name   = str_replace('cp-', '', $name);
        $parts  = explode('-', $name);
        $last   = end($parts);
        $number = intval($last);

        do {
            $number++;
            $newname = sprintf('cp-%s-%s', $name, $number);
            $exists  = $Model::where('name', $newname)->first();
        } while ($exists);

        return $newname;
    }

    private function fillTemplateData($row, $data)
    {
        if ($data->status === 'new') {
            $row->name = $this->uniqueName($row, $data);
        }
        $row->status = 'saved';
        $row->label  = $data->label;

        if (isset($data->responsive)) {
            $row->responsive = $data->responsive;
            $row->media      = $data->media;
        }
        if (isset($data->tag)) {
            $row->tag   = $data->tag;
            $row->style = $data->style;
            $row->icon  = $data->icon;
            $row->otml  = $data->otml;
        }
        if (isset($data->rows)) {
            $row->rows = $data->rows;
        }
        if (isset($data->elements)) {
            $row->elements = $data->elements;
        }
        $row->draw = $data->draw;
        return $row;
    }

}
