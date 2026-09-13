<?php

use App\Http\Controllers\Api\RechargeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| These are auto-prefixed with /api by Laravel's RouteServiceProvider,
| so the final endpoints are GET /api/recharges and POST /api/recharges.
*/

Route::get('/recharges', [RechargeController::class, 'index']);
Route::post('/recharges', [RechargeController::class, 'store']);

// A tiny helper endpoint so the frontend's retailer filter dropdown can be
// populated without hardcoding retailer IDs. Not required by the spec but
// keeps the "filter by retailer_id" control usable out of the box.
Route::get('/retailers', function () {
    return \App\Models\Retailer::select('id', 'name')->orderBy('name')->get();
});
