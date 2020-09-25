<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use Browser;

class BrowserController extends Controller
{

    public function me()
    {

        $browser = new Browser();

        echo $browser->getBrowser() . ' - ';
        echo $browser->getVersion() . ' - ';
        echo $browser->getPlatform();

        echo $browser->isMobile() ? ' Mobile' : ' Not Mobile';
        echo $browser->isTablet() ? ' Tablet' : ' Not Tablet';
        echo $browser->isRobot() ? ' Robot' : ' Not a Robot';

    }
}
