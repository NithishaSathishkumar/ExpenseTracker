import express from "express"; //Web framework for Node.js
import dotenv from "dotenv"; //Module to load environment variables from a .env file
import { db } from "./config/DB.js"; // Import the database connection module

dotenv.config(); // Load environment variables from .env file

// Create an instance of an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json()); // Parse JSON bodies for incoming requests

// Initialize dotenv to use environment variables
const PORT = process.env.PORT || 5001; // Set the port to the value from .env or default to 5001

async function connectToDatabase() {
    try {
        await db`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(225) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            create_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;

        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process with a failure code
    }
}

// Define a GET route handler for the root URL "/"
app.get("/", (req, res) => { 
    // Send a plain text response to the client
    res.send("Hello from the backend server!");
});

app.get("api/transactions/:user_id", async (req, res) => {
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
})

app.post("/api/transactions", async (req, res) => {
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
})

app.delete("api/transactions/:id", async (req, res) => {
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
})

// Define a GET route handler for the root URL "/"
app.get("/", (req, res) => { 
    // Send a plain text response to the client
    res.send("Hello from the backend server!");
});

// Connect to the database if successfull then start the server
connectToDatabase().then(() => {
    // Start the server and listen on port 5001
    app.listen(PORT, () => {
        // Log a message when the server is successfully running
        console.log("Server is running on port 5001");
    });
});



