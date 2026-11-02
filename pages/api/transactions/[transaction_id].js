// In-memory storage - use global variables
const transactions = global.transactions || [];

const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export default function handler(req, res) {
  const { transaction_id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!transaction_id || !isValidUUID(transaction_id)) {
    return res.status(400).json({ error: 'Invalid transaction_id format' });
  }

  // Find transaction
  const transaction = transactions.find(t => t.transaction_id === transaction_id);

  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  res.status(200).json(transaction);
}