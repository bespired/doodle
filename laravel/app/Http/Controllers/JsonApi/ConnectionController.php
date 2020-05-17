<?php

namespace App\Http\Controllers\JsonApi;

use App\Http\Controllers\Controller;

class ConnectionController extends Controller
{

    public function test()
    {

        $succes = [];

        $connections = array_keys(config('database.connections'));

        foreach (config('database.connections') as $connection => $data) {

            try {

                \DB::connection($connection)->getPdo();
                $succes[$connection] = [
                    "status" => true,
                    "config" => $data,
                ];

            } catch (\Exception $e) {

                $succes[$connection] = [
                    "status" => false,
                    "config" => $data,
                ];

            }

        }

        return json_encode($succes);

    }

}
