import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.resolve(process.cwd(), 'jonte-osten.db');

console.log('Ensuring database exists at:', DB_PATH);

// If database already exists, we're done
if (fs.existsSync(DB_PATH)) {
  console.log('Database already exists, skipping initialization');
  process.exit(0);
}

console.log('Creating new database...');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Read and execute schema
const schemaPath = path.resolve(__dirname, '../src/db/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

const statements = schema.split(';').filter(s => s.trim());

for (const statement of statements) {
  try {
    db.exec(statement);
  } catch (error) {
    console.error('Error executing schema statement:', error);
  }
}

console.log('Database created and schema initialized');
db.close();
console.log('Database ready for build');
