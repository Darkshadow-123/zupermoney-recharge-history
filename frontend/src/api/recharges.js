import client from './client.js';

/**
 * Fetch a page of recharges from the backend, applying whichever filters
 * are non-empty. Filtering happens server-side — this just forwards
 * whatever the caller passes as query params.
 *
 * @param {{retailer_id?: string, status?: string, operator?: string, from?: string, to?: string, page?: number}} filters
 */
export async function fetchRecharges(filters = {}) {
  // Strip empty/undefined values so we don't send e.g. ?status= to the API.
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== '' && value !== undefined && value !== null)
  );

  const response = await client.get('/recharges', { params });
  return response.data; // { data: [...], meta: {...} }
}

export async function createRecharge(payload) {
  const response = await client.post('/recharges', payload);
  return response.data; // { message, data }
}

export async function fetchRetailers() {
  const response = await client.get('/retailers');
  // Normalize response whether returned directly as an array or wrapped in a data key
  const res = response.data;
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  return [];
}
