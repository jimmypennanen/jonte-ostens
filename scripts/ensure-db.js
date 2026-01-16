import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.resolve(process.cwd(), 'jonte-osten.db');

console.log('Ensuring database exists at:', DB_PATH);

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Read schema
const schemaPath = path.resolve(__dirname, '../src/db/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

// Check if tables exist
const tableCheck = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table'").get();

if (tableCheck['count(*)'] === 0) {
  console.log('Database is empty, initializing schema...');

  const statements = schema.split(';').filter(s => s.trim());

  for (const statement of statements) {
    try {
      db.exec(statement);
    } catch (error) {
      console.error('Error executing schema statement:', error);
    }
  }

  console.log('Schema initialized successfully');
} else {
  console.log('Database already has tables, skipping schema initialization');
}

// Check if we need to seed data
try {
  const cheeseCount = db.prepare('SELECT COUNT(*) as count FROM cheeses').get();

  if (cheeseCount.count === 0) {
    console.log('Database is empty, seed data will be added on first request');
  } else {
    console.log(`Database has ${cheeseCount.count} cheeses, data looks good`);
  }
} catch (error) {
  console.warn('Could not check cheese count (tables might not exist yet):', error.message);
}

db.close();
console.log('Database ready for build');
