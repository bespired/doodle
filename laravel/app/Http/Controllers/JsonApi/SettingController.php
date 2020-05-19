<?php

namespace App\Http\Controllers\JsonApi;

use App\Http\Controllers\Controller;
use App\Models\Eloquent\Setting;

class SettingController extends Controller
{

    public function tenantMenu()
    {
        $data = [
            'client'   => 'Bespired',
            'project'  => 'Doodles',
            'menulist' => [
                ['label' => 'Doodle Design', 'action' => ''],
                ['label' => 'Musicbox', 'action' => ''],
                ['label' => 'Sky Wars', 'action' => ''],
            ],
        ];
        return response()->json($data);
    }

    public function profileMenu()
    {
        $data = [
            ['label' => 'Your Profile', 'action' => ''],
            ['label' => 'Settings', 'action' => ''],
            ['label' => 'Sign-out', 'action' => ''],
        ];
        return response()->json($data);
    }

    public function userMenu()
    {
        $data = ['fullname' => 'Joeri Kassenaar'];
        return response()->json($data);
    }

    public function mainMenu()
    {
        $data = Setting::whereType('mainmenu')->first();
        return $data->payload;
    }

}
