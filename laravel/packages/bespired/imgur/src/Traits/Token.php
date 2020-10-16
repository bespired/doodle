<?php

namespace Bespired\Imgur\Traits;

use Illuminate\Cache\Cache;

trait Token
{

    public function tokens()
    {
        $curl = curl_init();

        $clientId     = env("IMGUR_CLIENT_ID", null);
        $clientSecret = env("IMGUR_CLIENT_SECRET", null);
        $refreshToken = env("IMGUR_REFRESH_TOKEN", null);

        if (!$clientId or $clientId == '') {
            throw new ApiKeyNotFoundException('No Client Id found or empty.');
        }
        if (!$clientSecret or $clientSecret == '') {
            throw new ApiKeyNotFoundException('No Client Secret found or empty.');
        }
        if (!$refreshToken or $refreshToken == '') {
            throw new ApiKeyNotFoundException('No Refresh Token found or empty.');
        }

        //--- *** ---//

        $postfields = [
            'refresh_token' => $refreshToken,
            'client_id'     => $clientId,
            'client_secret' => $clientSecret,
            'grant_type'    => 'refresh_token',
        ];
        $headers = [
            "Authorization: Client-ID $clientId",
        ];

        curl_setopt_array($curl, [
            CURLOPT_URL            => "https://api.imgur.com/oauth2/token",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => "",
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => "POST",
            CURLOPT_POSTFIELDS     => $postfields,
            // CURLOPT_HTTPHEADER     => $headers,
        ]);

        $response = curl_exec($curl);

        curl_close($curl);

        $tokens = json_decode($response);

        \Cache::put('imgur_refresh_token', json_encode($tokens), 300000000);

        return $tokens;
    }

}
