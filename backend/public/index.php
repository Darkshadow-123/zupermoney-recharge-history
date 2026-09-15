<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

define('LARAVEL_START', microtime(true));

// Auto-loader fallback for standalone docker container execution
if (file_exists($varRun = '/var/www/html/vendor/autoload.php')) {
    require $varRun;
} elseif (file_exists($vendor = __DIR__.'/../vendor/autoload.php')) {
    require $vendor;
}

$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
)->send();

$kernel->terminate($request, $response);
