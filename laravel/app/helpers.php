<?php

if (!function_exists('connectionConfig')) {
    function connectionConfig($stage, $connection)
    {
        return (object) config(sprintf("database.connections.%s_%s", $stage, $connection));
    }
}
