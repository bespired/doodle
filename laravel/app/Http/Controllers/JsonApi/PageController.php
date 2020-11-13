<?php

namespace App\Http\Controllers\JsonApi;

use App\Http\Controllers\Controller;
use App\Models\Eloquent\Dson;
use App\Models\Eloquent\Otml;
use App\Models\Eloquent\TemplatedWidget;
use App\Models\Eloquent\Widget;

class PageController extends Controller
{

    public function index()
    {
        $selects = ['id', 'handle', 'name', 'label', 'type', 'status', 'pathslug', 'language'];
        $query   = Otml::select($selects)
            ->whereType('page');

        $pages = $query->get();

        return response()->json($pages);
    }

    public function dson($language, $pageslug)
    {
        $dson = Dson::query()
            ->whereLanguage($language)
            ->whereName($pageslug)
            ->first()
        ;

        return response()->json($dson);
    }

    public function widget($pageslug)
    {
        $dson = TemplatedWidget::query()
            ->whereName($pageslug)
            ->first()
        ;

        return response()->json($dson);
    }

}
