module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/accounts/[account_id].js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// In-memory storage
__turbopack_context__.s([
    "default",
    ()=>handler
]);
let transactions = /*TURBOPACK member replacement*/ __turbopack_context__.g.transactions || [];
let accounts = /*TURBOPACK member replacement*/ __turbopack_context__.g.accounts || new Set();
// Initialize global storage if needed
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
    const { account_id } = req.query;
    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    if (!account_id || !isValidUUID(account_id)) {
        return res.status(400).json({
            error: 'Invalid account_id format'
        });
    }
    // Check if account exists by looking for any transactions with this account_id
    const hasTransactions = transactions.some((t)=>t.account_id === account_id);
    if (!hasTransactions) {
        return res.status(404).json({
            error: 'Account not found'
        });
    }
    // Calculate balance for this account
    const balance = transactions.filter((t)=>t.account_id === account_id).reduce((sum, t)=>sum + t.amount, 0);
    res.status(200).json({
        account_id,
        balance
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__99c9e4b4._.js.map