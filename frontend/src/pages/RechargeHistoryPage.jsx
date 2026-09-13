import { useEffect, useState, useCallback } from 'react';
import { fetchRecharges, fetchRetailers } from '../api/recharges.js';
import RechargeFilters from '../components/RechargeFilters.jsx';
import RechargeTable from '../components/RechargeTable.jsx';
import Pagination from '../components/Pagination.jsx';
import NewRechargeForm from '../components/NewRechargeForm.jsx';

const initialFilters = {
  retailer_id: '',
  status: '',
  operator: '',
  from: '',
  to: '',
};

export default function RechargeHistoryPage() {
  const [retailers, setRetailers] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  const [recharges, setRecharges] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load retailers once, for the filter dropdown + create-form dropdown.
  useEffect(() => {
    fetchRetailers()
      .then(setRetailers)
      .catch(() => {
        // Non-fatal: the page still works, retailer dropdowns are just empty.
        setRetailers([]);
      });
  }, []);

  const loadRecharges = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await fetchRecharges({ ...filters, page });
      setRecharges(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not load recharge history. Please try again.'
      );
      setRecharges([]);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    loadRecharges();
  }, [loadRecharges]);

  function handleFiltersChange(nextFilters) {
    setFilters(nextFilters);
    setPage(1); // any filter change resets pagination to page 1
  }

  function handleResetFilters() {
    setFilters(initialFilters);
    setPage(1);
  }

  function handleRechargeCreated() {
    // Jump back to page 1 so the newly created recharge (most recent
    // first, per the backend's orderByDesc) is visible immediately.
    setPage(1);
    loadRecharges();
  }

  return (
    <div className="recharge-history-page">
      <NewRechargeForm retailers={retailers} onCreated={handleRechargeCreated} />

      <section>
        <RechargeFilters
          filters={filters}
          retailers={retailers}
          onChange={handleFiltersChange}
          onReset={handleResetFilters}
        />

        <RechargeTable recharges={recharges} loading={loading} error={error} />

        <Pagination
          currentPage={meta.current_page}
          lastPage={meta.last_page}
          total={meta.total}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
}
