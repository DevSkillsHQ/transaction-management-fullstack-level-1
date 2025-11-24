const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const transactions = [];
const accounts = new Map();

function getAccountBalance(accountId) {
  const accountTransactions = transactions.filter(t => t.account_id === accountId);
  return accountTransactions.reduce((sum, t) => sum + t.amount, 0);
}

app.get('/', (req, res) => {
  res.send('Accounting API');
});

app.get('/ping', (req, res) => {
  res.status(200).send('OK');
});

app.post('/transactions', (req, res) => {
  const { account_id, amount } = req.body;

  if (!account_id || typeof amount !== 'number') {
    return res.status(400).json({ error: 'account_id and amount are required' });
  }

  const transaction = {
    transaction_id: uuidv4(),
    account_id,
    amount,
    created_at: new Date().toISOString()
  };

  transactions.push(transaction);

  const balance = getAccountBalance(account_id);
  accounts.set(account_id, balance);

  res.status(201).json(transaction);
});

app.get('/transactions', (req, res) => {
  res.status(200).json(transactions);
});

app.get('/transactions/:transaction_id', (req, res) => {
  const { transaction_id } = req.params;

  const transaction = transactions.find(t => t.transaction_id === transaction_id);

  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  res.status(200).json(transaction);
});

app.get('/accounts/:account_id', (req, res) => {
  const { account_id } = req.params;

  const balance = getAccountBalance(account_id);

  const hasTransactions = transactions.some(t => t.account_id === account_id);
  if (!hasTransactions) {
    return res.status(404).json({ error: 'Account not found' });
  }

  res.status(200).json({
    account_id,
    balance
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});