<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'venue_id' => 'required|exists:venues,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',

            'name' => [
                Rule::requiredIf(fn () => !$this->user()),
                'nullable',
                'string',
                'max:255'
            ],
            'email' => [
                Rule::requiredIf(fn() => !$this->user()),
                'nullable',
                'string',
                'max:255'
            ],
            'phone' => [
                Rule::requiredIf(fn() => !$this->user()),
                'nullable',
                'string',
                'max:20'
            ]
        ];
    }
}
