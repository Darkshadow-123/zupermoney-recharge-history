import StatusBadge from './StatusBadge.jsx';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function RechargeTable({ recharges, loading, error }) {
  if (loading) {
    return <p className="state-message">Loading recharges…</p>;
  }

  if (error) {
    return <p className="state-message state-error">{error}</p>;
  }

  if (recharges.length === 0) {
    return <p className="state-message">No recharges match the selected filters.</p>;
  }

  return (
    <table className="recharge-table">
      <thead>
        <tr>
          <th>Retailer</th>
          <th>Mobile Number</th>
          <th>Operator</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {recharges.map((recharge) => (
          <tr key={recharge.id}>
            <td>{recharge.retailer?.name ?? '—'}</td>
            <td>{recharge.mobile_number}</td>
            <td>{recharge.operator}</td>
            <td>₹{Number(recharge.amount).toFixed(2)}</td>
            <td>
              <StatusBadge status={recharge.status} />
            </td>
            <td>{formatDate(recharge.created_at)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
