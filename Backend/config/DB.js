import { neon } from '@neondatabase/serverless';
import "dotenv/config";

// Create a SQL connection using using our DB URL
export const db = neon(process.env.DATABASE_URL);