<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRechargeRequest;
use App\Models\Recharge;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RechargeController extends Controller
{
    /**
     * GET /api/recharges
     *
     * Supports:
     *   retailer_id  - int
     *   status       - success|failed|pending
     *   operator     - Airtel|Jio|Vi|BSNL
     *   from, to     - Y-m-d date range (inclusive), applied to created_at
     *   page         - pagination page number (Laravel's default paginate param)
     */
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'retailer_id' => ['sometimes', 'integer', 'exists:retailers,id'],
            'status' => ['sometimes', 'string', 'in:' . implode(',', Recharge::STATUSES)],
            'operator' => ['sometimes', 'string', 'in:' . implode(',', Recharge::OPERATORS)],
            'from' => ['sometimes', 'date'],
            'to' => ['sometimes', 'date', 'after_or_equal:from'],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
        ]);

        $query = Recharge::query()->with('retailer');

        if (!empty($validated['retailer_id'])) {
            $query->where('retailer_id', $validated['retailer_id']);
        }

        if (!empty($validated['status'])) {
            $query->where('status', $validated['status']);
        }

        if (!empty($validated['operator'])) {
            $query->where('operator', $validated['operator']);
        }

        if (!empty($validated['from'])) {
            $query->whereDate('created_at', '>=', $validated['from']);
        }

        if (!empty($validated['to'])) {
            $query->whereDate('created_at', '<=', $validated['to']);
        }

        $perPage = $validated['per_page'] ?? 10;

        $paginated = $query->orderByDesc('created_at')->paginate($perPage);

        // paginate() already includes total/current_page/last_page etc.,
        // but the payload is shaped explicitly here so the frontend contract
        // doesn't depend on Laravel's internal resource format.
        return response()->json([
            'data' => $paginated->items(),
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => $paginated->lastPage(),
            ],
        ]);
    }

    /**
     * POST /api/recharges
     */
    public function store(StoreRechargeRequest $request): JsonResponse
    {
        $recharge = Recharge::create($request->validated() + [
            // Mock recharges default to "pending" unless a status is explicitly
            // passed (e.g. by a test script simulating an instant result).
            'status' => $request->validated()['status'] ?? 'pending',
        ]);

        $recharge->load('retailer');

        return response()->json([
            'message' => 'Recharge created.',
            'data' => $recharge,
        ], 201);
    }
}
