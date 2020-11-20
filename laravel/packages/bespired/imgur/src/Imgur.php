<?php

namespace Bespired\Imgur;

use Bespired\Imgur\Traits\Delete;
use Bespired\Imgur\Traits\Token;
use Bespired\Imgur\Traits\Upload;

class Imgur
{

    public $response;

    use Upload;
    use Delete;
    use Token;

}
