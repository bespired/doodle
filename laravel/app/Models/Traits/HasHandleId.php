<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

trait HasHandleId
{
    private static $valid_mac = "([0-9A-F]{2}[:-]){5}([0-9A-F]{2})";

    protected static function bootHasHandleId()
    {

        static::creating(function (Model $model) {
            if ($model->handle) {
                return;
            }

            $model->handle = static::createId($model);

        });

        static::saving(function (Model $model) {
            if ($model->handle == null) {
                $model->handle = static::createId($model);
            }
        });
    }

    public static function createId($model): string
    {

        $reflect = new \ReflectionClass($model);

        list($usec, $sec) = explode(" ", microtime());

        $smllsec = ($usec * 10000) % 999;
        $mac     = self::compressMac();

        $m = strtolower(keepCapital($reflect->getShortName()));
        $c = isset($mac) ? $mac . '-' : '';
        $t = substr(base_convert($sec, 10, 36), -6);
        $r = substr(rand(1000, 9999) . $smllsec, -5);
        $n = substr('000' . ($model->count() + rand(100, 500)) % 999, -3);
        $d = base_convert($r . $n, 10, 36);

        return sprintf('%s%s%s-%s', $c, $m, $t, $d);
    }

    private static function compressMac()
    {
        $mac = self::getCurrentMacAddress();
        if (!$mac) {
            return null;
        }

        $b = explode(":", $mac)[1];
        $c = explode(":", $mac)[3];
        $d = explode(":", $mac)[5];

        return substr(base_convert($b . $c . $d, 16, 36), -3);
    }

    public static function getCurrentMacAddress($interface = 'eth0')
    {
        return Cache::get('mac', function () use ($interface) {
            $ifconfig = self::runCommand("ifconfig {$interface}");
            preg_match("/" . self::$valid_mac . "/i", $ifconfig, $ifconfig);
            if (isset($ifconfig[0])) {
                return trim(strtoupper($ifconfig[0]));
            }
            return false;
        });
    }

    protected static function runCommand($command)
    {
        return shell_exec($command);
    }
}
