import { db } from "../config/DB.js";

// Returns all transactions for a specific user_id
export async function getTransactionByUserId(res, req) {
        try {
            const { user_id } = req.params;
            const transaction = await db`
                SELECT * FROM transactions
                WHERE user_id = ${user_id}
                ORDER BY create_at DESC
            `;
            res.status(200).json(transaction);
    
        } catch (error) {
            console.log("Error in GET /api/transactions/:user_id:", error);
            return res.status(500).json({ message: "Internal server error in Get" });
        }
}

// Get summary of transactions for a specific user_id
export async function getSummaryByUserId(res, req) {
    try {
        const { user_id } = req.params;
        const balance = await db`
            SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions
            WHERE user_id = ${user_id}
        `;

        const income = await db`
            SELECT COALESCE(SUM(amount), 0) AS income FROM transactions
            WHERE user_id = ${user_id} AND amount > 0
        `;

        const expense = await db`
            SELECT COALESCE(SUM(amount), 0) AS expense FROM transactions
            WHERE user_id = ${user_id} AND amount < 0
        `;

        res.status(200).json({
            balance: balance[0].balance,
            income: income[0].income,
            expense: expense[0].expense
        });

    } catch (error) {
        console.log("Error in GET /api/transactions/summary/:user_id:", error);
        return res.status(500).json({ message: "Internal server error in Get Summary" });
    }
}

// Create a new transaction
export async function createTransaction(res, req) { 
    // title, amount, catergory, user_id
    try {
        const { title, amount, category, user_id } = req.body;
        if (!title || amount === undefined || !category || !user_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const transaction = await db`
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `;
        // console.log("Transaction created:", transaction);
        res.status(201).json(transaction[0]);
        
    } catch (error) {
        console.log("Error in POST /api/transactions:", error);
        return res.status(500).json({ message: "Internal server error in Post" });
    }
}

// Delete an existing transaction by ID
export async function deleteTransaction(req, res) { 
    try {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid transaction ID" });
        }
        const result = await db`
            DELETE FROM transactions
            WHERE id = ${id}
            RETURNING *
        `;

        if (result.length === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        console.log("Transaction deleted:", result);
        res.status(200).json({ message: "Transaction deleted successfully" });

    } catch(error) {
        console.log("Error in DELETE /api/transactions/:id:", error);
        return res.status(500).json({ message: "Internal server error in Delete" });
    }
}