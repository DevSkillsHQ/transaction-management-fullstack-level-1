import { useState, useEffect } from 'react';

export default function TransactionApp() {
  const [accountID, setAccountID] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [lastTransactionBalance, setLastTransactionBalance] = useState(null);

  // Load initial transactions
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account_id: accountID,
          amount: parseInt(amount)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit transaction');
      }

      const newTransaction = await response.json();
      
      // Update transactions list (newest first)
      setTransactions(prev => [newTransaction, ...prev]);
      
      // Clear form fields
      setAccountID('');
      setAmount('');

    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Accounting App</h1>
      
      {/* Form for submitting transactions - MUST have exact data-type attributes */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            data-type="account-id"
            type="text"
            value={accountID}
            onChange={(e) => setAccountID(e.target.value)}
            placeholder="Account ID (UUID)"
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <input
            data-type="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>
        
        <input
          data-type="transaction-submit"
          type="submit"
          value="Submit Transaction"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        />
      </form>

      {/* Transaction List */}
      <div style={{ marginTop: '30px' }}>
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <div>
            {transactions.map((transaction, index) => (
              <div
                key={transaction.transaction_id}
                data-type="transaction"
                data-account-id={transaction.account_id}
                data-amount={transaction.amount}
                data-balance={index === 0 ? transaction.balance : undefined} // Only show balance for the last (first in array) transaction
                style={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  backgroundColor: index === 0 ? '#f0f0f0' : 'white' // Highlight last transaction
                }}
              >
                <strong>Account:</strong> {transaction.account_id}<br />
                <strong>Amount:</strong> {transaction.amount > 0 ? '+' : ''}{transaction.amount}<br />
                <strong>Date:</strong> {new Date(transaction.created_at).toLocaleString()}<br />
                {index === 0 && transaction.balance !== undefined && (
                  <strong>Balance: {transaction.balance}</strong>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}