const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

// ---------------------------------------------------------------------------
// In-memory store
// ---------------------------------------------------------------------------
const transactions = {}; // { [transaction_id]: Transaction }
const accountBalances = {}; // { [account_id]: number }

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors());

// 415 guard — must be before express.json()
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    const ct = req.headers['content-type'] || '';
    if (!ct.includes('application/json')) {
      return res.status(415).json({ error: 'Content-Type must be application/json' });
    }
  }
  next();
});

app.use(express.json());

// ---------------------------------------------------------------------------
// UUID validation
// ---------------------------------------------------------------------------
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isValidUUID = (str) => UUID_RE.test(str);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// GET /ping — healthcheck
app.get('/ping', (_req, res) => {
  res.status(200).send('OK');
});

// POST /transactions — create a transaction
app.post('/transactions', (req, res) => {
  const { account_id, amount } = req.body ?? {};

  if (account_id === undefined || account_id === null || amount === undefined || amount === null) {
    return res.status(400).json({ error: 'account_id and amount are required' });
  }

  if (!isValidUUID(String(account_id))) {
    return res.status(400).json({ error: 'account_id must be a valid UUID v4' });
  }

  if (!Number.isInteger(amount)) {
    return res.status(400).json({ error: 'amount must be an integer' });
  }

  if (amount === 0) {
    return res.status(400).json({ error: 'amount must not be zero' });
  }

  if (amount > 1_000_000 || amount < -1_000_000) {
    return res.status(400).json({ error: 'amount must be between -1,000,000 and 1,000,000' });
  }

  const currentBalance = accountBalances[account_id] ?? 0;

  const transaction_id = uuidv4();
  const created_at = new Date().toISOString();
  const transaction = { transaction_id, account_id, amount, created_at };

  transactions[transaction_id] = transaction;
  accountBalances[account_id] = currentBalance + amount;

  return res.status(201).json(transaction);
});

// GET /transactions — return all transactions
app.get('/transactions', (_req, res) => {
  res.status(200).json(Object.values(transactions));
});

// GET /transactions/:transaction_id — return single transaction
app.get('/transactions/:transaction_id', (req, res) => {
  const { transaction_id } = req.params;

  if (!isValidUUID(transaction_id)) {
    return res.status(400).json({ error: 'transaction_id must be a valid UUID v4' });
  }

  const transaction = transactions[transaction_id];
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  return res.status(200).json(transaction);
});

// GET /accounts/:account_id — return account with computed balance
app.get('/accounts/:account_id', (req, res) => {
  const { account_id } = req.params;

  if (!isValidUUID(account_id)) {
    return res.status(400).json({ error: 'account_id must be a valid UUID v4' });
  }

  if (accountBalances[account_id] === undefined) {
    return res.status(404).json({ error: 'Account not found' });
  }

  return res.status(200).json({ account_id, balance: accountBalances[account_id] });
});

// 405 for unsupported methods on /transactions
app.all('/transactions', (_req, res) => {
  res.status(405).json({ error: 'Method not allowed' });
});

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
