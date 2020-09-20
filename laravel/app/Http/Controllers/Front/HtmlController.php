<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;

class HtmlController extends Controller
{

    public function all()
    {

        $pathslug = pathslug(request()->path());

        dd($pathslug);
        abort(404, 'Slug not found:' . $pathslug);

    }

}
