<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Traits\OtmlHtml;
use App\Models\Eloquent\Otml;

class HtmlController extends Controller
{

    use OtmlHtml;

    const TTL = 60 * 60 * 24;

    public function all()
    {

        $pathslug = pathslug(request()->path());
        $slugkey  = 'url:slug:' . $pathslug;
        $ttl      = 60 * 60 * 24;

        $otml = \Cache::tags(cacheTags('urls', $pathslug))
            ->remember($slugkey, self::TTL, function () use ($pathslug) {

                $record = Otml::query()
                    ->select('otml')
                    ->wherePathslug($pathslug)
                    ->first();

                if (!$record) {
                    abort(404, 'Slug not found:' . $pathslug);
                }

                return $record->otml;
            });

        // first turn otml into html...
        $html = $this->inserts($otml);

        return response($html, 200)
            ->header('Content-Type', 'text/html');

    }

}
