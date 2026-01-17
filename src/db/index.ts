import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = process.env.VERCEL
  ? path.join('/tmp', 'jonte-osten.db')
  : path.resolve(process.cwd(), 'jonte-osten.db');

let db: Database.Database | null = null;

// Embedded schema - ensures tables are created on every app start, including Vercel's ephemeral /tmp
const SCHEMA = `
-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cheeses table for products
CREATE TABLE IF NOT EXISTS cheeses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  pairing TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Weekly cheese selection
CREATE TABLE IF NOT EXISTS weekly_cheese (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cheese_id INTEGER NOT NULL,
  week_number INTEGER NOT NULL,
  year INTEGER NOT NULL,
  description TEXT NOT NULL,
  why_selected TEXT NOT NULL,
  how_to_eat TEXT NOT NULL,
  dont_pair_with_json TEXT NOT NULL,
  is_active BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cheese_id) REFERENCES cheeses(id),
  UNIQUE(week_number, year)
);

-- Previous weeks history
CREATE TABLE IF NOT EXISTS previous_weeks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  week_number INTEGER NOT NULL,
  year INTEGER NOT NULL,
  cheese_name TEXT NOT NULL,
  mood_emoji TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sessions
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_cheeses_name ON cheeses(name);
CREATE INDEX IF NOT EXISTS idx_weekly_cheese_active ON weekly_cheese(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(is_read);
`;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initDatabase();
  }
  return db;
}

export function initDatabase() {
  const database = getDb();

  // Create all tables if they don't exist (runs on every app start)
  // Safe for Vercel's ephemeral /tmp - tables will be created on first request
  const statements = SCHEMA.split(';').filter(s => s.trim());

  for (const statement of statements) {
    try {
      database.exec(statement);
    } catch (error) {
      // Silently ignore errors (e.g., table already exists)
    }
  }

  // Seed demo data if tables are empty (idempotent - only runs once per fresh database)
  seedDatabaseIfEmpty(database);
}

function seedDatabaseIfEmpty(database: Database.Database) {
  try {
    // Check if cheeses table is empty
    const cheeseCount = (database.prepare('SELECT COUNT(*) as count FROM cheeses').get() as { count: number }).count;

    if (cheeseCount === 0) {
      // Seed all demo data
      seedCheeses(database);
      seedTestimonials(database);
      seedWeeklyCheese(database);
      seedPreviousWeeks(database);
    }
  } catch (error) {
    // Silently ignore if seeding fails
  }
}

function seedCheeses(database: Database.Database) {
  const cheeses = [
    {
      name: 'Jontes Premium Grevé 2.0',
      description: 'Molnmjuk och rik på smak. Klassikern som gjorde allt möjligt.',
      price: '199 kr/hg',
      pairing: 'Knäckebröd, fruktvin, drömmar'
    },
    {
      name: 'Gubbens Koppsvett Deluxe',
      description: 'Luktar och smakar precis som namnet antyder. En äventyring.',
      price: '249 kr/hg',
      pairing: 'Mod, tapperhet, tvål'
    },
    {
      name: 'Narkososten',
      description: 'Förbjuden av de flesta länder. Legalt här tack vare "kärleksfrihet".',
      price: '299 kr/hg',
      pairing: 'Bara Jonte'
    },
    {
      name: 'Smaskig Präst',
      description: 'En soft wash som förlåter alla synder. Bokstavligt talat.',
      price: '189 kr/hg',
      pairing: 'Ljust vin, skrivelse till prästen'
    },
    {
      name: 'Jonte\'s Forbidden Cheddar',
      description: 'Så intensiv att Jonte inte ens får äta den själv. Det finns regler.',
      price: '229 kr/hg',
      pairing: 'Äppelkräm, värdighet'
    },
    {
      name: 'Lactose Crisis Special',
      description: 'För de modiga. För de villiga. För de som älskar äventyr i toaletten.',
      price: '149 kr/hg',
      pairing: 'Mod, äventyr, backesalva'
    },
    {
      name: 'Midnight Västerbotten',
      description: 'En mystisk ost som bara dyker upp ibland. Jonte säger att den "väljer honom".',
      price: '269 kr/hg',
      pairing: 'Ensamhet, månsken, existentiella frågor'
    },
    {
      name: 'Skamvrån Brie',
      description: 'Inte en skam att älska denna. Men Jonte skäms lite ändå.',
      price: '179 kr/hg',
      pairing: 'Ananas, moraliska kris'
    }
  ];

  const stmt = database.prepare(`
    INSERT INTO cheeses (name, description, price, pairing)
    VALUES (?, ?, ?, ?)
  `);

  for (const cheese of cheeses) {
    try {
      stmt.run(cheese.name, cheese.description, cheese.price, cheese.pairing);
    } catch (error) {
      // Silently ignore duplicate inserts
    }
  }
}

function seedTestimonials(database: Database.Database) {
  const testimonials = [
    {
      quote: 'Jag har inte sett Jonte utan ost på 12 år.',
      author: 'Karin',
      role: 'Långtidskund'
    },
    {
      quote: 'Jag förlorade mitt jobb men hittade meningen med livet i Jontes Grevé 2.0.',
      author: 'Stefan',
      role: 'Yrkesförändring'
    },
    {
      quote: 'Denna ost fick mig att gifta om mig. Två gånger.',
      author: 'Annika',
      role: 'Livsförändrare'
    }
  ];

  const stmt = database.prepare(`
    INSERT INTO testimonials (quote, author, role, is_approved)
    VALUES (?, ?, ?, 1)
  `);

  for (const testimonial of testimonials) {
    try {
      stmt.run(testimonial.quote, testimonial.author, testimonial.role);
    } catch (error) {
      // Silently ignore errors
    }
  }
}

function seedWeeklyCheese(database: Database.Database) {
  try {
    const currentWeek = getWeek(new Date());
    const currentYear = new Date().getFullYear();

    const midnight = (database.prepare('SELECT id FROM cheeses WHERE name = ?').get('Midnight Västerbotten') as { id: number });

    if (midnight) {
      const dontPairWith = [
        'Något sött (sockret försöker dölja ostens sanna väsen)',
        'Annat än vatten att dricka (konkurrerar om uppmärksamhet)',
        'Musik högre än viskningar (störar meditatönen)',
        'Andra människor närvarande (de förstår inte)'
      ];

      database.prepare(`
        INSERT INTO weekly_cheese (cheese_id, week_number, year, description, why_selected, how_to_eat, dont_pair_with_json, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1)
      `).run(
        midnight.id,
        currentWeek,
        currentYear,
        'En sammansmältning av midnattens mysterium och västerbottens rika traditioner. Denna ost är så intensiv att Jonte behövde ta en veckas paus efter första tuggan för att återhämta sig.',
        'Jonte valde denna ost denna vecka för att den helt enkelt är det närmaste han kommer att hitta till perfektion i ostform. Enligt honom är detta det enda han behöver äta för att överleva de kommande 7 dagarna.',
        'Serveras bäst på rumtemperatur med ett glas vatten i närheten. Skär i tunna skivor och njut långsamt. Jonte rekommenderar att äta denna ost medan du stirrar ut genom ett mörkt fönster och funderar på ostens djupa mening.',
        JSON.stringify(dontPairWith)
      );
    }
  } catch (error) {
    // Silently ignore errors
  }
}

function seedPreviousWeeks(database: Database.Database) {
  try {
    const currentYear = new Date().getFullYear();
    const previousWeeks = [
      { week: 1, name: 'Grevé 2.0', mood: '🚀' },
      { week: 2, name: 'Koppsvett', mood: '💪' },
      { week: 3, name: 'Narkososten', mood: '😴' }
    ];

    const stmt = database.prepare(`
      INSERT INTO previous_weeks (week_number, year, cheese_name, mood_emoji)
      VALUES (?, ?, ?, ?)
    `);

    for (const week of previousWeeks) {
      try {
        stmt.run(week.week, currentYear, week.name, week.mood);
      } catch (error) {
        // Silently ignore errors
      }
    }
  } catch (error) {
    // Silently ignore errors
  }
}

// Helper functions for queries
export function getCheeses() {
  const db = getDb();
  return db.prepare('SELECT * FROM cheeses ORDER BY name').all() as Array<{
    id: number;
    name: string;
    description: string;
    price: string;
    pairing: string;
    created_at: string;
    updated_at: string;
  }>;
}

export function getCheese(id: number) {
  const db = getDb();
  return db.prepare('SELECT * FROM cheeses WHERE id = ?').get(id) as {
    id: number;
    name: string;
    description: string;
    price: string;
    pairing: string;
    created_at: string;
    updated_at: string;
  } | undefined;
}

export function insertCheese(name: string, description: string, price: string, pairing: string) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO cheeses (name, description, price, pairing)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(name, description, price, pairing);
  return result.lastInsertRowid;
}

export function updateCheese(id: number, name: string, description: string, price: string, pairing: string) {
  const db = getDb();
  const stmt = db.prepare(`
    UPDATE cheeses
    SET name = ?, description = ?, price = ?, pairing = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  return stmt.run(name, description, price, pairing, id);
}

export function deleteCheese(id: number) {
  const db = getDb();
  return db.prepare('DELETE FROM cheeses WHERE id = ?').run(id);
}

export function getCurrentWeeklyCheese() {
  const db = getDb();
  const query = `
    SELECT
      wc.*,
      c.name as cheese_name,
      c.description as cheese_description,
      c.price,
      c.pairing
    FROM weekly_cheese wc
    JOIN cheeses c ON wc.cheese_id = c.id
    WHERE wc.is_active = 1
    ORDER BY wc.created_at DESC
    LIMIT 1
  `;
  return db.prepare(query).get() as any;
}

export function getWeeklyCheese(weekNumber: number, year: number) {
  const db = getDb();
  const query = `
    SELECT
      wc.*,
      c.name as cheese_name,
      c.description as cheese_description,
      c.price,
      c.pairing
    FROM weekly_cheese wc
    JOIN cheeses c ON wc.cheese_id = c.id
    WHERE wc.week_number = ? AND wc.year = ?
  `;
  return db.prepare(query).get(weekNumber, year) as any;
}

export function insertWeeklyCheese(cheeseId: number, weekNumber: number, year: number, description: string, whySelected: string, howToEat: string, dontPairWith: string[]) {
  const db = getDb();

  // Deactivate all other weekly cheeses
  db.prepare('UPDATE weekly_cheese SET is_active = 0').run();

  const stmt = db.prepare(`
    INSERT INTO weekly_cheese (cheese_id, week_number, year, description, why_selected, how_to_eat, dont_pair_with_json, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1)
  `);

  const result = stmt.run(cheeseId, weekNumber, year, description, whySelected, howToEat, JSON.stringify(dontPairWith));
  return result.lastInsertRowid;
}

export function getPreviousWeeks() {
  const db = getDb();
  return db.prepare('SELECT * FROM previous_weeks ORDER BY week_number DESC').all() as Array<{
    id: number;
    week_number: number;
    year: number;
    cheese_name: string;
    mood_emoji: string;
    created_at: string;
  }>;
}

export function getApprovedTestimonials() {
  const db = getDb();
  return db.prepare('SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY created_at DESC').all() as Array<{
    id: number;
    quote: string;
    author: string;
    role: string;
    is_approved: number;
    created_at: string;
  }>;
}

export function getAllTestimonials() {
  const db = getDb();
  return db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all() as Array<{
    id: number;
    quote: string;
    author: string;
    role: string;
    is_approved: number;
    created_at: string;
  }>;
}

export function insertTestimonial(quote: string, author: string, role: string) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO testimonials (quote, author, role, is_approved)
    VALUES (?, ?, ?, 0)
  `);
  return stmt.run(quote, author, role).lastInsertRowid;
}

export function updateTestimonial(id: number, quote: string, author: string, role: string) {
  const db = getDb();
  const stmt = db.prepare(`
    UPDATE testimonials
    SET quote = ?, author = ?, role = ?
    WHERE id = ?
  `);
  return stmt.run(quote, author, role, id);
}

export function toggleTestimonialApproval(id: number, isApproved: boolean) {
  const db = getDb();
  const stmt = db.prepare(`
    UPDATE testimonials
    SET is_approved = ?
    WHERE id = ?
  `);
  return stmt.run(isApproved ? 1 : 0, id);
}

export function deleteTestimonial(id: number) {
  const db = getDb();
  return db.prepare('DELETE FROM testimonials WHERE id = ?').run(id);
}

export function getContactMessages() {
  const db = getDb();
  return db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all() as Array<{
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: number;
    created_at: string;
  }>;
}

export function getContactMessage(id: number) {
  const db = getDb();
  return db.prepare('SELECT * FROM contact_messages WHERE id = ?').get(id) as {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: number;
    created_at: string;
  } | undefined;
}

export function insertContactMessage(name: string, email: string, subject: string, message: string) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO contact_messages (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `);
  return stmt.run(name, email, subject, message).lastInsertRowid;
}

export function markMessageAsRead(id: number, isRead: boolean) {
  const db = getDb();
  const stmt = db.prepare(`
    UPDATE contact_messages
    SET is_read = ?
    WHERE id = ?
  `);
  return stmt.run(isRead ? 1 : 0, id);
}

export function deleteContactMessage(id: number) {
  const db = getDb();
  return db.prepare('DELETE FROM contact_messages WHERE id = ?').run(id);
}

export function getUser(username: string) {
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as {
    id: number;
    username: string;
    password_hash: string;
    created_at: string;
  } | undefined;
}

export function getUserById(id: number) {
  const db = getDb();
  return db.prepare('SELECT id, username, created_at FROM users WHERE id = ?').get(id) as {
    id: number;
    username: string;
    created_at: string;
  } | undefined;
}

export function insertUser(username: string, passwordHash: string) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO users (username, password_hash)
    VALUES (?, ?)
  `);
  return stmt.run(username, passwordHash).lastInsertRowid;
}

export function getSession(token: string) {
  const db = getDb();
  const session = db.prepare(`
    SELECT s.*, u.username
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > datetime('now')
  `).get(token) as {
    id: number;
    user_id: number;
    token: string;
    username: string;
    expires_at: string;
    created_at: string;
  } | undefined;

  return session;
}

export function insertSession(userId: number, token: string, expiresAt: string) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO sessions (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `);
  return stmt.run(userId, token, expiresAt).lastInsertRowid;
}

export function deleteSession(token: string) {
  const db = getDb();
  return db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

// Utility function to get current week number
export function getWeek(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
