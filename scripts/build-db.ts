import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.resolve(process.cwd(), 'jonte-osten.db');

console.log('Building database at:', DB_PATH);

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Read schema
const schemaPath = path.resolve(__dirname, '../src/db/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

// Execute schema
const statements = schema.split(';').filter(s => s.trim());
for (const statement of statements) {
  try {
    db.exec(statement);
  } catch (error) {
    console.error('Error executing statement:', error);
  }
}

// Check if we need to seed
const cheeseCount = db.prepare('SELECT COUNT(*) as count FROM cheeses').get() as { count: number };

if (cheeseCount.count === 0) {
  console.log('Seeding initial data...');
  // Add seed data here if needed
}

db.close();
console.log('Database built successfully!');
