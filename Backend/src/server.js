import express from "express"; //Web framework for Node.js
import dotenv from "dotenv"; //Module to load environment variables from a .env file
import { connectToDatabase } from "./config/DB.js"; // Import the database connection function
import rateLimiter from "./middleware/rateLimiter.js"; // Import the rate limiting middleware
import transactionRoute from "./routes/transactionRoute.js"; // Import the transaction route

// Load environment variables from .env file
dotenv.config(); 

// Create an instance of an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json()); // Parse JSON bodies for incoming requests
app.use(rateLimiter); // Apply rate limiting middleware to all routes

// Initialize dotenv to use environment variables
const PORT = process.env.PORT || 5001; // Set the port to the value from .env or default to 5001

// Define a GET route handler for the root URL "/"
app.get("/", (req, res) => { 
    // Send a plain text response to the client
    res.send("Hello from the backend server!");
});

// Use the transaction route for handling transaction-related requests
app.use("/api/transactions", transactionRoute); 

// Function to connect to the database and create the transactions table if it doesn't exist
// Connect to the database if successfull then start the server
connectToDatabase().then(() => {
    // Start the server and listen on port 5001
    app.listen(PORT, () => {
        // Log a message when the server is successfully running
        console.log("Server is running on port 5001");
    });
});



