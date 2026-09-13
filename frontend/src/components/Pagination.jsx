export default function Pagination({ currentPage, lastPage, total, onPageChange }) {
  if (total === 0) return null;

  return (
    <div className="pagination-bar">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {lastPage} ({total} total)
      </span>

      <button
        type="button"
        disabled={currentPage >= lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
