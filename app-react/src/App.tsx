import { useState, FormEvent } from 'react';
import './App.css';

interface Transaction {
  transaction_id: string;
  account_id: string;
  amount: number;
  created_at: string;
  balance?: number;
}

function App() {
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Create transaction
      const response = await fetch('http://localhost:8000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account_id: accountId,
          amount: Number(amount)
        }),
      });

      if (!response.ok) throw new Error('Transaction failed');
      
      const newTransaction = await response.json();

      // Get account balance
      const balanceResponse = await fetch(`http://localhost:8000/accounts/${accountId}`);
      if (!balanceResponse.ok) throw new Error('Failed to fetch balance');
      
      const accountData = await balanceResponse.json();
      
      // Create transaction with balance
      const transactionWithBalance = {
        ...newTransaction,
        balance: accountData.balance
      };

      // Update transactions list
      setTransactions(prev => [transactionWithBalance, ...prev]);

      setAccountId('');
      setAmount('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Transaction Management</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="Account ID"
            data-type="account-id"
            required
          />
        </div>
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            data-type="amount"
            required
          />
        </div>
        <button type="submit" data-type="transaction-submit">
          Submit Transaction
        </button>
      </form>

      <div className="transactions">
        {transactions.map((transaction) => (
          <div
            key={transaction.transaction_id}
            data-type="transaction"
            data-account-id={transaction.account_id}
            data-amount={transaction.amount}
            data-balance={transaction.balance}
            className="transaction-item"
          >
            <div>Account ID: {transaction.account_id}</div>
            <div>Amount: {transaction.amount}</div>
            <div>Balance: {transaction.balance}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
