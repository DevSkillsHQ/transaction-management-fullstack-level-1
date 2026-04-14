const express = require('express');
const app = express();

const port = 8000;
const transactions = []


app.get('/', (req, res) => res.send('Hi mom!'));
app.get('/ping', (req, res) => res.sendStatus(200));
app.get('/transactions', (req, res) => {
    res.status(200).json(transactions)
});
app.post('/transactions', (req, res) => res.send('Hi mom!'));
app.get('/transactions/{transaction_id}', (req, res) => res.send('Hi mom!'));
app.get('/accounts/{account_id}', (req, res) => res.send('Hi mom!'));





app.listen(port, () => {
    console.log('Listening on port ' + port);
});
