import { useState } from 'react';
import { createRecharge } from '../api/recharges.js';

const OPERATORS = ['Airtel', 'Jio', 'Vi', 'BSNL'];

const initialForm = {
  retailer_id: '',
  mobile_number: '',
  operator: '',
  amount: '',
};

export default function NewRechargeForm({ retailers, onCreated }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  // fieldErrors mirrors Laravel's 422 { errors: { field: [msg] } } shape.
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setFieldErrors({});
    setGeneralError('');
    setSuccessMessage('');

    try {
      const result = await createRecharge({
        ...form,
        retailer_id: Number(form.retailer_id),
        amount: Number(form.amount),
      });

      setSuccessMessage('Recharge created successfully.');
      setForm(initialForm);
      onCreated?.(result.data);
    } catch (err) {
      // 422 validation errors from StoreRechargeRequest — show per-field,
      // without crashing the page.
      if (err.response?.status === 422) {
        setFieldErrors(err.response.data.errors || {});
      } else {
        setGeneralError(
          err.response?.data?.message || 'Something went wrong while creating the recharge. Please try again.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="new-recharge-form" onSubmit={handleSubmit}>
      <h2>New Mock Recharge</h2>

      {successMessage && <p className="state-message state-success">{successMessage}</p>}
      {generalError && <p className="state-message state-error">{generalError}</p>}

      <div className="form-row">
        <label htmlFor="new-retailer">Retailer</label>
        <select
          id="new-retailer"
          value={form.retailer_id}
          onChange={(e) => handleChange('retailer_id', e.target.value)}
          required
        >
          <option value="">Select retailer</option>
          {retailers.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        {fieldErrors.retailer_id && <span className="field-error">{fieldErrors.retailer_id[0]}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="new-mobile">Mobile Number</label>
        <input
          id="new-mobile"
          type="text"
          placeholder="9876543210"
          value={form.mobile_number}
          onChange={(e) => handleChange('mobile_number', e.target.value)}
          required
        />
        {fieldErrors.mobile_number && <span className="field-error">{fieldErrors.mobile_number[0]}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="new-operator">Operator</label>
        <select
          id="new-operator"
          value={form.operator}
          onChange={(e) => handleChange('operator', e.target.value)}
          required
        >
          <option value="">Select operator</option>
          {OPERATORS.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
        {fieldErrors.operator && <span className="field-error">{fieldErrors.operator[0]}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="new-amount">Amount (₹)</label>
        <input
          id="new-amount"
          type="number"
          min="1"
          step="0.01"
          value={form.amount}
          onChange={(e) => handleChange('amount', e.target.value)}
          required
        />
        {fieldErrors.amount && <span className="field-error">{fieldErrors.amount[0]}</span>}
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Create Recharge'}
      </button>
    </form>
  );
}
