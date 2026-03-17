module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/transactions/[transaction_id].js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// In-memory storage - use global variables
__turbopack_context__.s([
    "default",
    ()=>handler
]);
const transactions = /*TURBOPACK member replacement*/ __turbopack_context__.g.transactions || [];
const isValidUUID = (uuid)=>{
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
};
function handler(req, res) {
    const { transaction_id } = req.query;
    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    if (!transaction_id || !isValidUUID(transaction_id)) {
        return res.status(400).json({
            error: 'Invalid transaction_id format'
        });
    }
    // Find transaction
    const transaction = transactions.find((t)=>t.transaction_id === transaction_id);
    if (!transaction) {
        return res.status(404).json({
            error: 'Transaction not found'
        });
    }
    res.status(200).json(transaction);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__02149bad._.js.map