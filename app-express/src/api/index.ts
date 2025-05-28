import express, { Request, Response, Router } from "express";
import { v4 as uuidv4 } from 'uuid';

interface Transaction {
  transaction_id: string;
  account_id: string;
  amount: number;
  created_at: string;
}

interface Account {
  account_id: string;
  balance: number;
}

interface TransactionRequest {
  account_id: string;
  amount: number;
}

type TransactionParams = { transaction_id: string };
type AccountParams = { account_id: string };

const transactions: Transaction[] = [];
const accounts: Map<string, Account> = new Map();

const router = express.Router();

// Health check
router.get("/ping", (_req: Request, res: Response): void => {
  res.status(200).send("pong");
});

// Create transaction
router.post("/transactions", (req: Request<{}, {}, TransactionRequest>, res: Response): void => {
  try {
    const { account_id, amount } = req.body;

    if (!account_id || amount === undefined) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const transaction_id = uuidv4();
    const created_at = new Date().toISOString();

    const transaction: Transaction = {
      transaction_id,
      account_id,
      amount,
      created_at
    };

    const existingAccount = accounts.get(account_id) || { account_id, balance: 0 };
    existingAccount.balance += amount;
    accounts.set(account_id, existingAccount);

    transactions.unshift(transaction); 
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: "Invalid request" });
  }
});

// Get all transactions
router.get("/transactions", (_req: Request, res: Response): void => {
  res.json(transactions);
});

// Get transaction by ID
router.get("/transactions/:transaction_id", (req: Request<TransactionParams>, res: Response): void => {
  const { transaction_id } = req.params;
  const transaction = transactions.find(t => t.transaction_id === transaction_id);

  if (!transaction) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }

  res.json(transaction);
});

// Get account balance
router.get("/accounts/:account_id", (req: Request<AccountParams>, res: Response): void => {
  const { account_id } = req.params;
  const account = accounts.get(account_id);

  if (!account) {
    res.status(404).json({ error: "Account not found" });
    return;
  }

  res.json(account);
});

export default router;
