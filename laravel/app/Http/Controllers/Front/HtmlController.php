<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class HtmlController extends Controller
{

    public function all()
    {

        $pathslug = Str::slug(request()->path());

        abort(404, 'Page not found');

    }

}
