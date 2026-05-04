import { Client } from "pg";

const tables = ["account", "session", "user", "verification", "rateLimit"];

const client = new Client({ connectionString: process.env.DATABASE_URL });

try {
  await client.connect();
  for (const table of tables) {
    const query = `DROP TABLE IF EXISTS "${table}" CASCADE`;
    await client.query(query);
  }
  console.log("Dropped auth tables.");
} finally {
  await client.end();
}
