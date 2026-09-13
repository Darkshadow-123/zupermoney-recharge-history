const STATUS_STYLES = {
  success: { background: '#e6f7ec', color: '#1a7f37', border: '#1a7f37' },
  failed: { background: '#fdeceb', color: '#c62828', border: '#c62828' },
  pending: { background: '#fff8e1', color: '#a05a00', border: '#a05a00' },
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.pending;

  return (
    <span
      className="status-badge"
      style={{
        backgroundColor: style.background,
        color: style.color,
        borderColor: style.border,
      }}
    >
      {status}
    </span>
  );
}
