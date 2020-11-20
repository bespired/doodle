<?php

namespace Bespired\Imgur\Traits;

trait Delete
{

    public function delete($deleteHash)
    {

        $tokens = json_decode(\Cache::get('imgur_refresh_token'));
        if (!$tokens) {
            $tokens = $this->tokens();
        }
        $accessToken = $tokens->access_token;

        $curl = curl_init();

        //--- *** ---//

        $headers = [
            "Authorization: Bearer $accessToken",
        ];

        curl_setopt_array($curl, [
            CURLOPT_URL            => "https://api.imgur.com/3/image/$deleteHash",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => "",
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => "DELETE",
            CURLOPT_HTTPHEADER     => $headers,
        ]);

        $response = curl_exec($curl);

        curl_close($curl);

        $json = json_decode($response);
        if (json_last_error()) {
            dd(json_last_error());
        }

        $this->response = $json->data;

    }
}
