const { Client } = require('pg');

const connectionString = 'postgresql://postgres:clpadmindatabase123@db.fqidefdjuumtlbynhvws.supabase.co:6543/postgres?pgbouncer=true';

const client = new Client({ connectionString });

client.connect()
  .then(() => {
    console.log('✅ Connected to Supabase!');
    return client.end();
  })
  .catch(err => {
    console.error('❌ Connection error:', err.message);
  });