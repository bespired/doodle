<?php

namespace App\Http\Traits;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Token;

trait OtmlPayload
{

    private $otml;
    private $variables = [];
    private $payload;

    public function getPayload()
    {

        $pathslug = pathslug(request()->path());
        $slugkey  = 'url:slug:' . $pathslug;
        $ttl      = 60 * 60 * 24;

        return \Cache::tags(cacheTags('urls', $pathslug))
            ->remember($slugkey, self::TTL, function () use ($pathslug) {

                $record = Otml::query()
                    ->select('otml', 'status')
                    ->wherePathslug($pathslug)
                    ->first();

                if (!$record) {
                    abort(404, 'Slug not found:' . $pathslug);
                }

                return $record;
            });

    }

    public function isAllowed()
    {

        if (!isset($_COOKIE['token'])) {
            return false;
        }

        $cookie  = $_COOKIE['token'];
        $token   = new Token($cookie);
        $payload = JWTAuth::decode($token);

        return in_array($payload['role'], ['admin', 'server']);

    }

}
