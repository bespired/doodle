<?php

namespace App\Http\Controllers\JsonApi;

use App\Http\Controllers\Controller;
use App\Http\Traits\Yamlaar;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TemplateController extends Controller
{

    public function schema($fulltype)
    {

        $type = $this->getTypes($fulltype)[0];
        $area = $this->getTypes($fulltype)[1];

        if ($area !== null) {
            return $this->area($type, $area);
        }

        return $this->type($type);

    }

    public function type($type)
    {
        $Model = sprintf('\App\Models\Eloquent\Templated%s', ucfirst($type));

        $count  = $Model::count();
        $schema = $Model::query()
            ->whereType('schema')
            ->exclude(['handle'])
            ->first()
            ->toArray();

        $create         = $Model::create($schema);
        $create->name   = rand(100, 999) . '-' . substr(time(), -9) . '-' . $type . '-' . $count;
        $create->type   = 'template';
        $create->status = 'new';
        $create->save();

        return response()->json($create);
    }

    // public function area($type, $area)
    // {
    //     $Model = sprintf('\App\Models\Eloquent\Templated%s', ucfirst($type));

    //     $count  = $Model::count();
    //     $schema = $Model::query()
    //         ->whereType('schema')
    //         ->whereArea($area)
    //         ->exclude(['handle'])
    //         ->first()
    //         ->toArray();

    //     $create         = $Model::create($schema);
    //     $create->name   = rand(100, 999) . '-' . substr(time(), -9) . '-' . $area . '-' . $count;
    //     $create->type   = 'template';
    //     $create->status = 'new';
    //     $create->save();

    //     return response()->json($create);
    // }

    public function index($fulltype)
    {
        $type = $this->getTypes($fulltype)[0];
        $area = $this->getTypes($fulltype)[1];

        $Model = sprintf('\App\Models\Eloquent\Templated%s', ucfirst($type));

        $query = $Model::query()
            ->whereType('template');

        if ($area !== null) {
            $query = $query->whereArea(Str::singular($area));
        }

        $rows = $query->get();

        return response()->json($rows);
    }

    public function save(Request $request, $fulltype)
    {

        $type = $this->getTypes($fulltype)[0];

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

    public function duplicate(Request $request, $fulltype)
    {
        $type  = $this->getTypes($fulltype)[0];
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

    public function remove(Request $request, $fulltype)
    {
        $type  = $this->getTypes($fulltype)[0];
        $data  = (object) $request->all();
        $Model = sprintf('\App\Models\Eloquent\Templated%s', ucfirst($type));

        $fetch = $Model::query()
            ->whereIn('handle', $data->handles)
            ->delete();

        return response()->json($data->handles);
    }

    public function export(Request $request, $fulltype)
    {
        $exceptions = ['id', 'deleted_at', 'created_at', 'updated_at'];

        $type  = $this->getTypes($fulltype)[0];
        $data  = (object) $request->all();
        $Model = sprintf('\App\Models\Eloquent\Templated%s', ucfirst($type));

        $fetched = $Model::query()
            ->whereIn('handle', $data->handles)
            ->get();

        // relations? widgets also save elements?

        $models = [
            'type' => $type,
            $type  => [],
        ];
        foreach ($fetched->toArray() as $data) {
            $name            = $data['name'];
            $models[$type][] = collect($data)->except($exceptions)->toArray();
        }

        if (!$name) {
            return;
        }

        $filename = sprintf('%s.yaml', $name);

        return response()
            ->streamDownload(function () use ($models) {
                echo Yamlaar::dump($models);
            }, $filename, [
                'Access-Control-Expose-Headers' => 'Content-Disposition,X-Filename',
                'Content-Type'                  => 'text/yaml',
                'X-Filename'                    => $filename,
            ]);

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

    private function getTypes($fulltype)
    {

        if (strpos($fulltype, '--') === false) {
            return [$fulltype, null];
        }

        list($type, $area) = explode('--', $fulltype);

        return [$type, \Illuminate\Support\Str::singular($area)];
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
            $row->tag  = $data->tag;
            $row->icon = $data->icon;
            $row->otml = $data->otml;
        }
        if (isset($data->style)) {
            $row->style = $data->style;
        }
        if (isset($data->rows)) {
            $row->rows = $data->rows;
        }
        if (isset($data->data)) {
            $row->data = $data->data;
        }
        if (isset($data->elements)) {
            $row->elements = $data->elements;
        }
        $row->draw = $data->draw;
        return $row;
    }

}
