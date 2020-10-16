<?php

namespace Bespired\Imgur\Traits;

trait Upload
{

    public function upload($filePath, $fileName = null)
    {

        $tokens = json_decode(\Cache::get('imgur_refresh_token'));
        if (!$tokens) {
            $tokens = $this->tokens();
        }
        $accessToken = $tokens->access_token;

        $fileInfo = (object) pathinfo($filePath);

        $fileName = $fileName ?? $fileInfo->filename;
        $fileMime = mime_content_type($filePath);

        $curl = curl_init();

        //--- *** ---//

        $postfields = [
            'image' => base64_encode(file_get_contents($filePath)),
            'name'  => $fileInfo->filename,
        ];
        $headers = [
            "Authorization: Bearer $accessToken",
        ];

        curl_setopt_array($curl, [
            CURLOPT_URL            => "https://api.imgur.com/3/image",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => "",
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => "POST",
            CURLOPT_POSTFIELDS     => $postfields,
            CURLOPT_HTTPHEADER     => $headers,
        ]);

        $response = curl_exec($curl);

        curl_close($curl);

        $json = json_decode($response);

        $this->response = $json->data;

    }
}
