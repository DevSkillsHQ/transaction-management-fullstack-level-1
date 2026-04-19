# Transaction Management Fullstack — Level 1

A fullstack app for recording financial transactions and viewing transaction history, built with **Node.js + Express** (backend) and **React + Vite** (frontend).

---

## Table of Contents

- [Task Overview](#task-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Frontend](#frontend)
- [Validation Rules](#validation-rules)
- [Running the Tests](#running-the-tests)
- [Submission](#submission)

---

## Task Overview

Build a fullstack app that:

1. **Backend** — implements the [Accounting API](https://infra.devskills.app/accounting/api/3.1.0) (Open API 3.0 format), keeping all data in memory.
2. **Frontend** — provides a form to submit transactions and a list showing transaction history with the current account balance.

---

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Backend  | Node.js, Express, UUID  |
| Frontend | React 18, Vite, CSS     |
| Tests    | Cypress 12              |
| Runner   | concurrently            |

---

## Project Structure

```
.
├── src/
│   ├── backend/
│   │   ├── server.js          # Express API (all routes, in-memory store)
│   │   └── package.json
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── App.jsx                    # Root component, state management
│   │   │   ├── api.js                     # fetch wrappers for the backend
│   │   │   ├── main.jsx                   # React entry point
│   │   │   ├── components/
│   │   │   │   ├── TransactionForm.jsx    # Submit form
│   │   │   │   └── TransactionList.jsx    # Transaction history list
│   │   │   └── styles/
│   │   │       └── index.css              # Design tokens + component styles
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   └── package.json
│   └── README.md                          # This file
├── cypress/
│   └── e2e/
│       └── test.cy.js     # DO NOT MODIFY — official Cypress test suite
├── cypress.config.js       # apiUrl → 3001, baseUrl → 3000
└── package.json            # Root scripts: build, start, test
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install dependencies

```bash
npm run install:all
```

This installs packages for both `src/backend` and `src/frontend`.

### Start the app (development)

```bash
npm start
```

Starts both servers concurrently:
- **Backend** → `http://localhost:3001`
- **Frontend** → `http://localhost:3000`

### Build for production

```bash
npm run build
```

---

## API Reference

All data is kept **in memory** — restarting the server resets all transactions.

### `GET /ping`

Health check.

**Response `200`**
```
OK
```

---

### `POST /transactions`

Create a new transaction.

**Request body** (`Content-Type: application/json`)
```json
{
  "account_id": "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
  "amount": 7
}
```

| Field        | Type    | Rules                                    |
|--------------|---------|------------------------------------------|
| `account_id` | UUID v4 | Required                                 |
| `amount`     | integer | Required. Range: -1,000,000 to 1,000,000 |

**Response `201`**
```json
{
  "transaction_id": "4bcc3959-6fe1-406e-9f04-cad2637b47d5",
  "account_id": "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
  "amount": 7,
  "created_at": "2021-05-12T18:29:40.206Z"
}
```

| Status | Meaning                                        |
|--------|------------------------------------------------|
| 201    | Transaction created                            |
| 400    | Missing/invalid fields or amount out of range  |
| 415    | Content-Type is not `application/json`         |

---

### `GET /transactions/:transaction_id`

Get a single transaction by ID.

**Response `200`**
```json
{
  "transaction_id": "4bcc3959-6fe1-406e-9f04-cad2637b47d5",
  "account_id": "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
  "amount": 7,
  "created_at": "2021-05-12T18:29:40.206Z"
}
```

| Status | Meaning               |
|--------|-----------------------|
| 200    | Transaction found     |
| 400    | Invalid UUID format   |
| 404    | Transaction not found |

---

### `GET /accounts/:account_id`

Get the current balance for an account. The balance is the sum of all transaction amounts for that account.

**Response `200`**
```json
{
  "account_id": "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
  "balance": 10
}
```

| Status | Meaning              |
|--------|----------------------|
| 200    | Account found        |
| 400    | Invalid UUID format  |
| 404    | Account not found    |

---

### `GET /transactions`

Returns all transactions.

**Response `200`** — array of transaction objects (same shape as above).

---

## Frontend

### Form (`TransactionForm`)

```html
<form>
  <input data-type="account-id" type="text" />    <!-- UUID v4 account ID -->
  <input data-type="amount"     type="number" />   <!-- integer, -1,000,000 to 1,000,000 -->
  <input data-type="transaction-submit" type="submit" />
</form>
```

Both fields are **cleared after submission**.

### Transaction list (`TransactionList`)

Each transaction is rendered as:

```html
<div
  data-type="transaction"
  data-account-id="${account_id}"
  data-amount="${amount}"
  data-balance="${current_balance}"
>
  ...
</div>
```

- New transactions appear **at the top** of the list.
- `data-balance` reflects the running balance of that account after the transaction.
- The **full account UUID** is displayed (not truncated).

---

## Validation Rules

| Rule                         | Frontend           | Backend            |
|------------------------------|--------------------|--------------------|
| `account_id` required        | HTML `required`    | 400 response       |
| `account_id` must be UUID v4 | Text input         | Regex validation   |
| `amount` required            | HTML `required`    | 400 response       |
| `amount` must be integer     | `step="1"` input   | `Number.isInteger` |
| `amount` max ±1,000,000      | `min`/`max` attrs  | 400 response       |
| `Content-Type` must be JSON  | N/A (fetch sets it)| 415 response       |

---

## Running the Tests

The test suite uses **Cypress** and covers both the backend API and the frontend UI.

### Prerequisites

Make sure both servers are running first:

```bash
npm start
```

### Run tests (headless)

```bash
npm test
```

This command **automatically starts both servers**, waits until they are ready, runs the full Cypress suite, then shuts everything down. You do **not** need to start the servers manually.

### Run tests (interactive UI)

Start the servers first, then open Cypress:

```bash
npm start          # terminal 1 — keep running
npx cypress open   # terminal 2
```

### What the tests verify

**Backend (`Transaction Management Backend - Level 1`):**
- `GET /ping` returns 200
- `POST /transactions` creates a transaction and returns a `transaction_id`
- `GET /transactions/:id` returns the correct transaction fields
- `GET /accounts/:id` returns the correct running balance
- Negative-amount transactions correctly reduce the balance

**Frontend (`Transaction Management Frontend - Level 1`):**
- Form submits a transaction and it appears in the list with correct `data-*` attributes
- Submitting to the same account accumulates the balance correctly
- Negative amounts reduce the balance
- Each new transaction appears at the top of the list
- Both form fields are cleared after each successful submission

---

## How to Get Help

If you run into issues, open a **GitHub Issue** on this repository:

1. Go to the **Issues** tab → **New issue**
2. Describe the problem with error messages and steps to reproduce
3. Leave the issue **open** until resolved — open issues signal the test is not ready for review

Human support is available Mon–Fri 09:00–17:00 CET. Expected response: next working day.

---

## Submission

1. Commit and push all changes to your branch.
2. [Create a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) from your branch to the default branch. **Do not merge it.**
3. Submit your test in [Alva Labs](https://app.alvalabs.io).

---

Authored by [Alva Labs](https://www.alvalabs.io/).
