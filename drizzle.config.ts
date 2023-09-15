import type { Config } from 'drizzle-kit';
// import * as dotenv from 'dotenv';
// dotenv.config();

export default {
  schema: 'src/lib/db/schema.ts',
  out: 'drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true, // Print all statements
  // strict: true,  // Always ask for my confirmation
} satisfies Config;