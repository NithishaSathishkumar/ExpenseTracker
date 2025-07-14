import { neon } from '@neondatabase/serverless';
import "dotenv/config";

// Create a SQL connection using using our DB URL
export const db = neon(process.env.DATABASE_URL);

// Function to connect to the database and create the transactions table if it doesn't exist
export async function connectToDatabase() {
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