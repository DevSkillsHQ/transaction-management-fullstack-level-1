const express = require('express');
const app = express();

const { v4: uuidv4 } = require('uuid');
app.use(express.json());

const port = 8000;
const transactions = [];

// get health check
app.get('/', (req, res) => res.send('Hi mom!'));

// get actual ping
app.get('/ping', (req, res) => res.sendStatus(200));

// get all transactions
app.get('/transactions', (req, res) => {
    res.status(200).json(transactions)
});

// post a transaction
app.post('/transactions', (req, res) => {
    const { account_id, amount } = req.body;
    if (!account_id || typeof amount !== 'number') return res.status(400).end();

    const transaction = {
        transaction_id: uuidv4(),
        account_id,
        amount,
        created_at: new Date().toISOString()
    };

    transactions.push(transaction);
    res.status(201).json(transaction);
});

// get one transaction
app.get('/transactions/:transaction_id', (req, res) => {
    const { transaction_id } = req.params;
    const tx = transactions.find(t => t.transaction_id === transaction_id);
    if (!tx) return res.sendStatus(404);
    res.status(200).json(tx);
});

// get one account
app.get('/accounts/:account_id', (req, res) => {
    const { account_id } = req.params;
    const accTx = transactions.filter(t => t.account_id === account_id);
    if (accTx.length === 0) return res.sendStatus(404);
    const balance = accTx.reduce((sum, t) => sum + t.amount, 0);
    res.status(200).json({ account_id, balance });
});

// loop
app.listen(port, () => {
    console.log('Listening on port ' + port);
});
