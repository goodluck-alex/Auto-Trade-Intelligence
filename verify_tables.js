const fs = require('fs');
const { Client } = require('pg');
const env = fs.readFileSync('.env', 'utf8').split(/\r?\n/).reduce((acc, line) => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) acc[key.trim()] = rest.join('=');
  return acc;
}, {});
const databaseUrl = env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL not found in .env');
  process.exit(1);
}
const client = new Client({ connectionString: databaseUrl });

(async () => {
  try {
    await client.connect();
    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('users','sessions','trades','referrals');");
    console.log(res.rows.map(r => r.table_name).join(','));
  } catch (error) {
    console.error('Error:', error.message || error);
    process.exit(1);
  } finally {
    await client.end();
  }
})();
