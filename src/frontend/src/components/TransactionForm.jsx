import { useState } from 'react';

export default function TransactionForm({ onSubmit, isSubmitting }) {
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedId = accountId.trim();
    const parsedAmount = parseInt(amount, 10);

    if (!trimmedId || isNaN(parsedAmount)) return;

    if (parsedAmount === 0) {
      alert('Amount must not be zero.');
      return;
    }

    if (parsedAmount > 1_000_000 || parsedAmount < -1_000_000) {
      alert('Amount must be between -$1,000,000 and $1,000,000.');
      return;
    }

    await onSubmit(trimmedId, parsedAmount);

    // Clear both fields after submission as required by spec
    setAccountId('');
    setAmount('');
  }

  return (
    <form className="tx-form" onSubmit={handleSubmit}>
      <div className="field">
        <label className="field-label" htmlFor="account-id">
          Account ID
        </label>
        <input
          id="account-id"
          className="field-input"
          data-type="account-id"
          type="text"
          placeholder="e.g. 0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          required
          disabled={isSubmitting}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <div className="field">
        <label className="field-label" htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
          className="field-input"
          data-type="amount"
          type="number"
          placeholder="e.g. 100 or -50"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="-1000000"
          max="1000000"
          step="1"
          required
          disabled={isSubmitting}
        />
        <span className="field-hint">Positive = deposit &middot; Negative = withdrawal &middot; Integers only</span>
      </div>

      <input
        className="btn-submit"
        data-type="transaction-submit"
        type="submit"
        value={isSubmitting ? 'Processing…' : 'Submit Transaction'}
        disabled={isSubmitting}
      />
    </form>
  );
}
