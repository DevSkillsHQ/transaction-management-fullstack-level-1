import { useState } from 'react';
import TransactionForm from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';
import { createTransaction, getAccountBalance } from './api.js';

export default function App() {
  // Each entry: { transaction_id, account_id, amount, created_at, balance }
  const [transactions, setTransactions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(accountId, amount) {
    setIsSubmitting(true);
    setError(null);

    try {
      const transaction = await createTransaction(accountId, amount);
      const account = await getAccountBalance(transaction.account_id);

      const enriched = { ...transaction, balance: account.balance };

      // New transactions go to the top of the list
      setTransactions((prev) => [enriched, ...prev]);
    } catch (err) {
      setError(err.message || 'Failed to submit transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="header-icon">⬡</span>
            <span className="header-title">Transaction Manager</span>
          </div>
          <span className="header-badge">In-Memory Ledger</span>
        </div>
      </header>

      <main className="app-main">
        <div className="layout">
          <section className="panel panel-form">
            <h2 className="panel-heading">New Transaction</h2>
            <p className="panel-subheading">
              Record a deposit or withdrawal for any account.
            </p>
            <TransactionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            {error && <p className="form-error">{error}</p>}
          </section>

          <section className="panel panel-list">
            <div className="list-header">
              <h2 className="panel-heading">Transaction History</h2>
              <span className="tx-count">{transactions.length} transactions</span>
            </div>
            <TransactionList transactions={transactions} />
          </section>
        </div>
      </main>
    </div>
  );
}
