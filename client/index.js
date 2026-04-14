const API = 'http://localhost:8080';

(async function () {
  const form = document.getElementById('tx-form');
  const accountInput = document.querySelector('[data-type=account-id]');
  const amountInput = document.querySelector('[data-type=amount]');
  const list = document.getElementById('tx-list');

  async function load() {
    const res = await fetch(`${API}/transactions`);
    const txs = await res.json();
    list.innerHTML = '';
    txs.slice().reverse().forEach(t => {
      const el = document.createElement('div');
      el.setAttribute('data-type', 'transaction');
      el.setAttribute('data-account-id', t.account_id);
      el.setAttribute('data-amount', t.amount);
      el.textContent = `${t.account_id} ${t.amount} ${t.created_at}`;
      list.appendChild(el);
    });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const account_id = accountInput.value.trim();
    const amount = Number(amountInput.value);
    if (!account_id || Number.isNaN(amount)) return;

    const post = await fetch(`${API}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account_id, amount })
    });
    if (post.status !== 201) return;

    const tx = await post.json();
    const accRes = await fetch(`${API}/accounts/${account_id}`);
    const acc = accRes.ok ? await accRes.json() : { balance: tx.amount };

    const el = document.createElement('div');
    el.setAttribute('data-type', 'transaction');
    el.setAttribute('data-account-id', tx.account_id);
    el.setAttribute('data-amount', tx.amount);
    el.setAttribute('data-balance', acc.balance);
    el.textContent = `${tx.account_id} ${tx.amount} (balance: ${acc.balance})`;
    list.prepend(el);

    accountInput.value = '';
    amountInput.value = '';
  });

  await load();
})();