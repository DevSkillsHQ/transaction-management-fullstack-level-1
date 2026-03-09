module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/transactions.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// In-memory storage - use global variables to persist across requests
__turbopack_context__.s([
    "default",
    ()=>handler
]);
if (!/*TURBOPACK member replacement*/ __turbopack_context__.g.transactions) {
    /*TURBOPACK member replacement*/ __turbopack_context__.g.transactions = [];
}
if (!/*TURBOPACK member replacement*/ __turbopack_context__.g.accounts) {
    /*TURBOPACK member replacement*/ __turbopack_context__.g.accounts = new Set();
}
const isValidUUID = (uuid)=>{
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
};
function handler(req, res) {
    if (req.method === 'POST') {
        // Check content type for 415 error
        const contentType = req.headers['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
            return res.status(415).json({
                error: 'Content-Type must be application/json'
            });
        }
        const { account_id, amount } = req.body;
        // Validate required fields
        if (!account_id || typeof account_id !== 'string' || !isValidUUID(account_id)) {
            return res.status(400).json({
                error: 'Invalid account_id format'
            });
        }
        if (typeof amount !== 'number' || !Number.isInteger(amount)) {
            return res.status(400).json({
                error: 'Invalid amount format'
            });
        }
        // Generate transaction ID
        const transaction_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
        const timestamp = new Date().toISOString();
        // Add to accounts set
        /*TURBOPACK member replacement*/ __turbopack_context__.g.accounts.add(account_id);
        // Create transaction
        const transaction = {
            transaction_id,
            account_id,
            amount,
            created_at: timestamp
        };
        // Add to transactions
        /*TURBOPACK member replacement*/ __turbopack_context__.g.transactions.push(transaction);
        // Calculate current balance for the account
        const currentBalance = /*TURBOPACK member replacement*/ __turbopack_context__.g.transactions.filter((t)=>t.account_id === account_id).reduce((sum, t)=>sum + t.amount, 0);
        // Return transaction with balance
        res.status(201).json({
            ...transaction,
            balance: currentBalance
        });
    } else if (req.method === 'GET') {
        // Return all transactions, newest first
        res.status(200).json([
            .../*TURBOPACK member replacement*/ __turbopack_context__.g.transactions
        ].reverse());
    } else if (req.method === 'PUT' || req.method === 'DELETE' || req.method === 'PATCH') {
        const contentType = req.headers['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
            return res.status(415).json({
                error: 'Content-Type must be application/json'
            });
        }
        res.status(405).json({
            error: 'Method not allowed'
        });
    } else {
        res.status(405).json({
            error: 'Method not allowed'
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__867e075c._.js.map