<?php

use App\Http\Controllers\Api\RechargeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Support both /api/recharges and /recharges directly for maximum compatibility
Route::get('/recharges', [RechargeController::class, 'index']);
Route::post('/recharges', [RechargeController::class, 'store']);
Route::get('/retailers', function () {
    return \App\Models\Retailer::select('id', 'name')->orderBy('name')->get();
});
Route::get('/api/recharges', [RechargeController::class, 'index']);
Route::post('/api/recharges', [RechargeController::class, 'store']);
Route::get('/api/retailers', function () {
    return \App\Models\Retailer::select('id', 'name')->orderBy('name')->get();
});
