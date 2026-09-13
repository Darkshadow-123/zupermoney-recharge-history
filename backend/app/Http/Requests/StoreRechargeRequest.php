<?php

namespace App\Http\Requests;

use App\Models\Recharge;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreRechargeRequest extends FormRequest
{
    public function authorize(): bool
    {
        // No auth system was in scope for this task; left open on purpose.
        // In production this would check the authenticated retailer/user,
        // e.g. $this->user()?->retailer_id === $this->retailer_id.
        return true;
    }

    public function rules(): array
    {
        return [
            'retailer_id' => ['required', 'integer', 'exists:retailers,id'],
            // Indian mobile number: 10 digits, first digit 6-9.
            'mobile_number' => ['required', 'string', 'regex:/^[6-9][0-9]{9}$/'],
            'operator' => ['required', 'string', 'in:' . implode(',', Recharge::OPERATORS)],
            'amount' => ['required', 'numeric', 'gt:0'],
            'status' => ['sometimes', 'string', 'in:' . implode(',', Recharge::STATUSES)],
        ];
    }

    public function messages(): array
    {
        return [
            'mobile_number.regex' => 'Mobile number must be a valid 10-digit Indian number starting with 6-9.',
            'amount.gt' => 'Amount must be greater than 0.',
            'operator.in' => 'Operator must be one of: ' . implode(', ', Recharge::OPERATORS) . '.',
        ];
    }

    /**
     * Return validation errors as JSON (422) instead of Laravel's default
     * redirect-back behaviour, since this is an API-only endpoint.
     */
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Validation failed.',
            'errors' => $validator->errors(),
        ], 422));
    }
}
