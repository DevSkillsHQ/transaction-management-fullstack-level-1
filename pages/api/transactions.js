// In-memory storage - use global variables to persist across requests
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
  if (req.method === 'POST') {
    // Check content type for 415 error
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(415).json({ error: 'Content-Type must be application/json' });
    }

    const { account_id, amount } = req.body;

    // Validate required fields
    if (!account_id || typeof account_id !== 'string' || !isValidUUID(account_id)) {
      return res.status(400).json({ error: 'Invalid account_id format' });
    }

    if (typeof amount !== 'number' || !Number.isInteger(amount)) {
      return res.status(400).json({ error: 'Invalid amount format' });
    }

    // Generate transaction ID
    const transaction_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    const timestamp = new Date().toISOString();

    // Add to accounts set
    global.accounts.add(account_id);

    // Create transaction
    const transaction = {
      transaction_id,
      account_id,
      amount,
      created_at: timestamp
    };

    // Add to transactions
    global.transactions.push(transaction);

    // Calculate current balance for the account
    const currentBalance = global.transactions
      .filter(t => t.account_id === account_id)
      .reduce((sum, t) => sum + t.amount, 0);

    // Return transaction with balance
    res.status(201).json({
      ...transaction,
      balance: currentBalance
    });
  } else if (req.method === 'GET') {
    // Return all transactions, newest first
    res.status(200).json([...global.transactions].reverse());
  } else if (req.method === 'PUT' || req.method === 'DELETE' || req.method === 'PATCH') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(415).json({ error: 'Content-Type must be application/json' });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}