// In-memory storage
let transactions = global.transactions || [];
let accounts = global.accounts || new Set();

// Initialize global storage if needed
if (!global.transactions) {
  global.transactions = [];
}
if (!global.accounts) {
  global.accounts = new Set();
}

const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export default function handler(req, res) {
  const { account_id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!account_id || !isValidUUID(account_id)) {
    return res.status(400).json({ error: 'Invalid account_id format' });
  }

  // Check if account exists by looking for any transactions with this account_id
  const hasTransactions = transactions.some(t => t.account_id === account_id);
  
  if (!hasTransactions) {
    return res.status(404).json({ error: 'Account not found' });
  }

  // Calculate balance for this account
  const balance = transactions
    .filter(t => t.account_id === account_id)
    .reduce((sum, t) => sum + t.amount, 0);

  res.status(200).json({
    account_id,
    balance
  });
}