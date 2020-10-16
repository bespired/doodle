<?php

namespace Bespired\Imgur;

use App\Http\Controllers\Controller;
use Bespired\Imgur\Traits\Token;
use Bespired\Imgur\Traits\Upload;

class Imgur extends Controller
{

    public $response;

    use Upload;
    use Token;

}
