import express from 'express';
import { getTransactionByUserId, getSummaryByUserId, createTransaction, deleteTransaction } from "../controllers/transactionsController.js"; // Import the controller function

const router = express.Router();

// api/transactions = is replaced in the server.js file with the transactionRoute
// transactionController.js contains the logic for handling transactions

// Returns all transactions for a specific user_id
router.get("/:user_id", getTransactionByUserId);

router.get("/summary/:user_id", getSummaryByUserId);

// Create a new transaction
router.post("/", createTransaction);

// delete an existing transaction
router.delete("/:id", deleteTransaction)

export default router;