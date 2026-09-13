const STATUSES = ['success', 'failed', 'pending'];
const OPERATORS = ['Airtel', 'Jio', 'Vi', 'BSNL'];

/**
 * Purely controlled — the parent owns the filter state and re-fetches
 * from the backend whenever it changes. This component never filters
 * data itself.
 */
export default function RechargeFilters({ filters, retailers, onChange, onReset }) {
  function handleChange(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <div className="filters-bar">
      <div className="filter-field">
        <label htmlFor="retailer">Retailer</label>
        <select
          id="retailer"
          value={filters.retailer_id}
          onChange={(e) => handleChange('retailer_id', e.target.value)}
        >
          <option value="">All retailers</option>
          {retailers.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="operator">Operator</label>
        <select
          id="operator"
          value={filters.operator}
          onChange={(e) => handleChange('operator', e.target.value)}
        >
          <option value="">All operators</option>
          {OPERATORS.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="from">From</label>
        <input
          id="from"
          type="date"
          value={filters.from}
          onChange={(e) => handleChange('from', e.target.value)}
        />
      </div>

      <div className="filter-field">
        <label htmlFor="to">To</label>
        <input
          id="to"
          type="date"
          value={filters.to}
          onChange={(e) => handleChange('to', e.target.value)}
        />
      </div>

      <button type="button" className="btn-secondary" onClick={onReset}>
        Clear filters
      </button>
    </div>
  );
}
