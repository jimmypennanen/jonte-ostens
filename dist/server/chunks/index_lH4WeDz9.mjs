import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename$1 = fileURLToPath(import.meta.url);
const __dirname$1 = path.dirname(__filename$1);
const DB_PATH = path.resolve(process.cwd(), "jonte-osten.db");
let db = null;
function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initDatabase();
  }
  return db;
}
function initDatabase() {
  const database = getDb();
  const schemaPath = path.resolve(__dirname$1, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");
  const statements = schema.split(";").filter((s) => s.trim());
  for (const statement of statements) {
    try {
      database.exec(statement);
    } catch (error) {
      console.error("Error executing schema statement:", error);
    }
  }
  const cheeseCount = database.prepare("SELECT COUNT(*) as count FROM cheeses").get();
  if (cheeseCount.count === 0) {
    seedInitialData();
  }
}
function seedInitialData() {
  const db2 = getDb();
  const cheeses = [
    {
      name: "Jontes Premium Grevé 2.0",
      description: "Molnmjuk och rik på smak. Klassikern som gjorde allt möjligt.",
      price: "199 kr/hg",
      pairing: "Knäckebröd, fruktvin, drömmar"
    },
    {
      name: "Gubbens Koppsvett Deluxe",
      description: "Luktar och smakar precis som namnet antyder. En äventyring.",
      price: "249 kr/hg",
      pairing: "Mod, tapperhet, tvål"
    },
    {
      name: "Narkososten",
      description: 'Förbjuden av de flesta länder. Legalt här tack vare "kärleksfrihet".',
      price: "299 kr/hg",
      pairing: "Bara Jonte"
    },
    {
      name: "Smaskig Präst",
      description: "En soft wash som förlåter alla synder. Bokstavligt talat.",
      price: "189 kr/hg",
      pairing: "Ljust vin, skrivelse till prästen"
    },
    {
      name: "Jonte's Forbidden Cheddar",
      description: "Så intensiv att Jonte inte ens får äta den själv. Det finns regler.",
      price: "229 kr/hg",
      pairing: "Äppelkräm, värdighet"
    },
    {
      name: "Lactose Crisis Special",
      description: "För de modiga. För de villiga. För de som älskar äventyr i toaletten.",
      price: "149 kr/hg",
      pairing: "Mod, äventyr, backesalva"
    },
    {
      name: "Midnight Västerbotten",
      description: 'En mystisk ost som bara dyker upp ibland. Jonte säger att den "väljer honom".',
      price: "269 kr/hg",
      pairing: "Ensamhet, månsken, existentiella frågor"
    },
    {
      name: "Skamvrån Brie",
      description: "Inte en skam att älska denna. Men Jonte skäms lite ändå.",
      price: "179 kr/hg",
      pairing: "Ananas, moraliska kris"
    }
  ];
  const insertCheese2 = db2.prepare(`
    INSERT INTO cheeses (name, description, price, pairing)
    VALUES (?, ?, ?, ?)
  `);
  for (const cheese of cheeses) {
    try {
      insertCheese2.run(cheese.name, cheese.description, cheese.price, cheese.pairing);
    } catch (error) {
      console.error(`Error inserting cheese ${cheese.name}:`, error);
    }
  }
  const currentWeek = getWeek(/* @__PURE__ */ new Date());
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const midnightVasterbotten = db2.prepare("SELECT id FROM cheeses WHERE name = ?").get("Midnight Västerbotten");
  if (midnightVasterbotten) {
    const dontPairWith = [
      "Något sött (sockret försöker dölja ostens sanna väsen)",
      "Annat än vatten att dricka (konkurrerar om uppmärksamhet)",
      "Musik högre än viskningar (störar meditatönen)",
      "Andra människor närvarande (de förstår inte)"
    ];
    db2.prepare(`
      INSERT INTO weekly_cheese (cheese_id, week_number, year, description, why_selected, how_to_eat, dont_pair_with_json, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `).run(
      midnightVasterbotten.id,
      currentWeek,
      currentYear,
      "En sammansmältning av midnattens mysterium och västerbottens rika traditioner. Denna ost är så intensiv att Jonte behövde ta en veckas paus efter första tuggan för att återhämta sig.",
      "Jonte valde denna ost denna vecka för att den helt enkelt är det närmaste han kommer att hitta till perfektion i ostform. Enligt honom är detta det enda han behöver äta för att överleva de kommande 7 dagarna.",
      "Serveras bäst på rumtemperatur med ett glas vatten i närheten. Skär i tunna skivor och njut långsamt. Jonte rekommenderar att äta denna ost medan du stirrar ut genom ett mörkt fönster och funderar på ostens djupa mening.",
      JSON.stringify(dontPairWith)
    );
  }
  const previousWeeks = [
    { week: 1, name: "Grevé 2.0", mood: "🚀" },
    { week: 2, name: "Koppsvett", mood: "💪" },
    { week: 3, name: "Narkososten", mood: "😴" }
  ];
  const insertPreviousWeek = db2.prepare(`
    INSERT INTO previous_weeks (week_number, year, cheese_name, mood_emoji)
    VALUES (?, ?, ?, ?)
  `);
  for (const week of previousWeeks) {
    try {
      insertPreviousWeek.run(week.week, currentYear, week.name, week.mood);
    } catch (error) {
      console.error(`Error inserting previous week ${week.week}:`, error);
    }
  }
  const testimonials = [
    {
      quote: "Jag har inte sett Jonte utan ost på 12 år.",
      author: "Karin",
      role: "Långtidskund"
    },
    {
      quote: "Jag förlorade mitt jobb men hittade meningen med livet i Jontes Grevé 2.0.",
      author: "Stefan",
      role: "Yrkesförändring"
    },
    {
      quote: "Denna ost fick mig att gifta om mig. Två gånger.",
      author: "Annika",
      role: "Livsförändrare"
    }
  ];
  const insertTestimonial2 = db2.prepare(`
    INSERT INTO testimonials (quote, author, role, is_approved)
    VALUES (?, ?, ?, 1)
  `);
  for (const testimonial of testimonials) {
    try {
      insertTestimonial2.run(testimonial.quote, testimonial.author, testimonial.role);
    } catch (error) {
      console.error(`Error inserting testimonial:`, error);
    }
  }
}
function getCheeses() {
  const db2 = getDb();
  return db2.prepare("SELECT * FROM cheeses ORDER BY name").all();
}
function getCheese(id) {
  const db2 = getDb();
  return db2.prepare("SELECT * FROM cheeses WHERE id = ?").get(id);
}
function insertCheese(name, description, price, pairing) {
  const db2 = getDb();
  const stmt = db2.prepare(`
    INSERT INTO cheeses (name, description, price, pairing)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(name, description, price, pairing);
  return result.lastInsertRowid;
}
function updateCheese(id, name, description, price, pairing) {
  const db2 = getDb();
  const stmt = db2.prepare(`
    UPDATE cheeses
    SET name = ?, description = ?, price = ?, pairing = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  return stmt.run(name, description, price, pairing, id);
}
function deleteCheese(id) {
  const db2 = getDb();
  return db2.prepare("DELETE FROM cheeses WHERE id = ?").run(id);
}
function getCurrentWeeklyCheese() {
  const db2 = getDb();
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
  return db2.prepare(query).get();
}
function insertWeeklyCheese(cheeseId, weekNumber, year, description, whySelected, howToEat, dontPairWith) {
  const db2 = getDb();
  db2.prepare("UPDATE weekly_cheese SET is_active = 0").run();
  const stmt = db2.prepare(`
    INSERT INTO weekly_cheese (cheese_id, week_number, year, description, why_selected, how_to_eat, dont_pair_with_json, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1)
  `);
  const result = stmt.run(cheeseId, weekNumber, year, description, whySelected, howToEat, JSON.stringify(dontPairWith));
  return result.lastInsertRowid;
}
function getPreviousWeeks() {
  const db2 = getDb();
  return db2.prepare("SELECT * FROM previous_weeks ORDER BY week_number DESC").all();
}
function getApprovedTestimonials() {
  const db2 = getDb();
  return db2.prepare("SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY created_at DESC").all();
}
function getAllTestimonials() {
  const db2 = getDb();
  return db2.prepare("SELECT * FROM testimonials ORDER BY created_at DESC").all();
}
function insertTestimonial(quote, author, role) {
  const db2 = getDb();
  const stmt = db2.prepare(`
    INSERT INTO testimonials (quote, author, role, is_approved)
    VALUES (?, ?, ?, 0)
  `);
  return stmt.run(quote, author, role).lastInsertRowid;
}
function updateTestimonial(id, quote, author, role) {
  const db2 = getDb();
  const stmt = db2.prepare(`
    UPDATE testimonials
    SET quote = ?, author = ?, role = ?
    WHERE id = ?
  `);
  return stmt.run(quote, author, role, id);
}
function toggleTestimonialApproval(id, isApproved) {
  const db2 = getDb();
  const stmt = db2.prepare(`
    UPDATE testimonials
    SET is_approved = ?
    WHERE id = ?
  `);
  return stmt.run(isApproved ? 1 : 0, id);
}
function deleteTestimonial(id) {
  const db2 = getDb();
  return db2.prepare("DELETE FROM testimonials WHERE id = ?").run(id);
}
function getContactMessages() {
  const db2 = getDb();
  return db2.prepare("SELECT * FROM contact_messages ORDER BY created_at DESC").all();
}
function getContactMessage(id) {
  const db2 = getDb();
  return db2.prepare("SELECT * FROM contact_messages WHERE id = ?").get(id);
}
function insertContactMessage(name, email, subject, message) {
  const db2 = getDb();
  const stmt = db2.prepare(`
    INSERT INTO contact_messages (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `);
  return stmt.run(name, email, subject, message).lastInsertRowid;
}
function markMessageAsRead(id, isRead) {
  const db2 = getDb();
  const stmt = db2.prepare(`
    UPDATE contact_messages
    SET is_read = ?
    WHERE id = ?
  `);
  return stmt.run(isRead ? 1 : 0, id);
}
function deleteContactMessage(id) {
  const db2 = getDb();
  return db2.prepare("DELETE FROM contact_messages WHERE id = ?").run(id);
}
function getUser(username) {
  const db2 = getDb();
  return db2.prepare("SELECT * FROM users WHERE username = ?").get(username);
}
function getSession(token) {
  const db2 = getDb();
  const session = db2.prepare(`
    SELECT s.*, u.username
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > datetime('now')
  `).get(token);
  return session;
}
function insertSession(userId, token, expiresAt) {
  const db2 = getDb();
  const stmt = db2.prepare(`
    INSERT INTO sessions (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `);
  return stmt.run(userId, token, expiresAt).lastInsertRowid;
}
function deleteSession(token) {
  const db2 = getDb();
  return db2.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}
function getWeek(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 864e5;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export { getCheeses as a, getContactMessages as b, getAllTestimonials as c, getCurrentWeeklyCheese as d, getWeek as e, getSession as f, getCheese as g, getUser as h, deleteSession as i, insertSession as j, deleteCheese as k, insertCheese as l, insertContactMessage as m, getContactMessage as n, markMessageAsRead as o, deleteContactMessage as p, updateTestimonial as q, deleteTestimonial as r, insertTestimonial as s, toggleTestimonialApproval as t, updateCheese as u, insertWeeklyCheese as v, getPreviousWeeks as w, getApprovedTestimonials as x };
