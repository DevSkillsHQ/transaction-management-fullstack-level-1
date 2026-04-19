export default function TransactionList({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="tx-empty">
        <span className="tx-empty-icon">📋</span>
        <p>No transactions yet. Submit one above to get started.</p>
      </div>
    );
  }

  return (
    <ul className="tx-list">
      {transactions.map((tx) => {
        const isCredit = tx.amount > 0;

        return (
          <li key={tx.transaction_id}>
            {/* data-* attributes exactly as required by spec & Cypress tests */}
            <div
              className={`tx-item ${isCredit ? 'tx-credit' : 'tx-debit'}`}
              data-type="transaction"
              data-account-id={tx.account_id}
              data-amount={tx.amount}
              data-balance={tx.balance}
            >
              <div className="tx-left">
                <span className={`tx-badge ${isCredit ? 'badge-credit' : 'badge-debit'}`}>
                  {isCredit ? 'DEPOSIT' : 'WITHDRAWAL'}
                </span>
                <span className="tx-account" title={tx.account_id}>
                  {tx.account_id}
                </span>
                <span className="tx-date">
                  {new Date(tx.created_at).toLocaleString()}
                </span>
              </div>

              <div className="tx-right">
                <span className={`tx-amount ${isCredit ? 'amount-credit' : 'amount-debit'}`}>
                  {isCredit ? '+' : ''}{tx.amount}
                </span>
                <span className="tx-balance">
                  Balance: <strong>{tx.balance}</strong>
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
