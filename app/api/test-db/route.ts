// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    return NextResponse.json({ success: true, time: result.rows[0] });
  } catch (error) {
    console.error('Test DB error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}