<?php

use Illuminate\Support\Facades\Route;

// Ensure index.php handles routing gracefully for Nginx fallback
Route::get('/', function () {
    return response()->json(['status' => 'online', 'message' => 'ZuperMoney Recharge History API']);
});

Route::fallback(function () {
    return response()->json(['message' => 'Endpoint not found'], 404);
});
