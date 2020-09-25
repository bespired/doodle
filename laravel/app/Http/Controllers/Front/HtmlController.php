<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Traits\OtmlHtml;
use App\Http\Traits\OtmlPayload;
use App\Models\Eloquent\Otml;
use Illuminate\Http\Request;

class HtmlController extends Controller
{

    use OtmlHtml;
    use OtmlPayload;

    const TTL = 60 * 60 * 24;

    public function all(Request $request)
    {

        $payload = $this->getPayload();

        // if private then check jwt for role.
        if ($payload->status === 'private') {
            if (!$this->isAllowed()) {
                abort(401);
            }
        }

        // first turn otml into html...
        $html = $this->inserts($payload->otml);

        return response($html, 200)
            ->header('Content-Type', 'text/html');

    }

}
