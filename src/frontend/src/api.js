const API_BASE = 'http://localhost:3001';

/**
 * POST /transactions
 * @param {string} account_id - UUID v4
 * @param {number} amount     - integer (positive or negative)
 * @returns {Promise<{transaction_id: string, account_id: string, amount: number, created_at: string}>}
 */
export async function createTransaction(account_id, amount) {
  const response = await fetch(`${API_BASE}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ account_id, amount }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * GET /accounts/:account_id
 * @param {string} account_id - UUID v4
 * @returns {Promise<{account_id: string, balance: number}>}
 */
export async function getAccountBalance(account_id) {
  const response = await fetch(`${API_BASE}/accounts/${account_id}`);

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${response.status}`);
  }

  return response.json();
}

