import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.resolve(process.cwd(), 'jonte-osten.db');

console.log('Ensuring database exists at:', DB_PATH);

try {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');

  // Read schema
  const schemaPath = path.resolve(__dirname, '../src/db/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');

  // Check if tables exist
  let tableCheck;
  try {
    tableCheck = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table'").get();
  } catch (e) {
    tableCheck = { 'count(*)': 0 };
  }

  if (tableCheck['count(*)'] === 0) {
    console.log('Database is empty, initializing schema...');

    const statements = schema.split(';').filter(s => s.trim());

    for (const statement of statements) {
      try {
        db.exec(statement);
      } catch (error) {
        console.error('Error executing schema statement:', error.message);
      }
    }

    console.log('✓ Schema initialized');
  } else {
    console.log(`✓ Database has ${tableCheck['count(*)']} tables`);
  }

  // Seed initial data
  const cheeseCount = db.prepare('SELECT COUNT(*) as count FROM cheeses').get();

  if (cheeseCount.count === 0) {
    console.log('Seeding initial data...');
    seedDatabase(db);
    console.log('✓ Data seeded successfully');
  } else {
    console.log(`✓ Database has ${cheeseCount.count} cheeses (skip seeding)`);
  }

  db.close();
  console.log('✓ Database ready for build');
} catch (error) {
  console.error('Failed to ensure database:', error.message);
  process.exit(1);
}

function seedDatabase(db) {
  // Cheeses data
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

  const insertCheese = db.prepare(`
    INSERT INTO cheeses (name, description, price, pairing)
    VALUES (?, ?, ?, ?)
  `);

  for (const cheese of cheeses) {
    try {
      insertCheese.run(cheese.name, cheese.description, cheese.price, cheese.pairing);
    } catch (error) {
      console.error(`  ✗ Error inserting ${cheese.name}:`, error.message);
    }
  }

  // Testimonials data
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

  const insertTestimonial = db.prepare(`
    INSERT INTO testimonials (quote, author, role, is_approved)
    VALUES (?, ?, ?, 1)
  `);

  for (const testimonial of testimonials) {
    try {
      insertTestimonial.run(testimonial.quote, testimonial.author, testimonial.role);
    } catch (error) {
      console.error(`  ✗ Error inserting testimonial:`, error.message);
    }
  }

  // Insert initial weekly cheese (Midnight Västerbotten)
  const currentWeek = getWeek(new Date());
  const currentYear = new Date().getFullYear();

  const midnightVasterbotten = db.prepare('SELECT id FROM cheeses WHERE name = ?').get('Midnight Västerbotten');

  if (midnightVasterbotten) {
    const dontPairWith = [
      'Något sött (sockret försöker dölja ostens sanna väsen)',
      'Annat än vatten att dricka (konkurrerar om uppmärksamhet)',
      'Musik högre än viskningar (störar meditatönen)',
      'Andra människor närvarande (de förstår inte)'
    ];

    db.prepare(`
      INSERT INTO weekly_cheese (cheese_id, week_number, year, description, why_selected, how_to_eat, dont_pair_with_json, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `).run(
      midnightVasterbotten.id,
      currentWeek,
      currentYear,
      'En sammansmältning av midnattens mysterium och västerbottens rika traditioner. Denna ost är så intensiv att Jonte behövde ta en veckas paus efter första tuggan för att återhämta sig.',
      'Jonte valde denna ost denna vecka för att den helt enkelt är det närmaste han kommer att hitta till perfektion i ostform. Enligt honom är detta det enda han behöver äta för att överleva de kommande 7 dagarna.',
      'Serveras bäst på rumtemperatur med ett glas vatten i närheten. Skär i tunna skivor och njut långsamt. Jonte rekommenderar att äta denna ost medan du stirrar ut genom ett mörkt fönster och funderar på ostens djupa mening.',
      JSON.stringify(dontPairWith)
    );
  }

  // Previous weeks
  const previousWeeks = [
    { week: 1, name: 'Grevé 2.0', mood: '🚀' },
    { week: 2, name: 'Koppsvett', mood: '💪' },
    { week: 3, name: 'Narkososten', mood: '😴' }
  ];

  const insertPreviousWeek = db.prepare(`
    INSERT INTO previous_weeks (week_number, year, cheese_name, mood_emoji)
    VALUES (?, ?, ?, ?)
  `);

  for (const week of previousWeeks) {
    try {
      insertPreviousWeek.run(week.week, currentYear, week.name, week.mood);
    } catch (error) {
      console.error(`  ✗ Error inserting week ${week.week}:`, error.message);
    }
  }
}

function getWeek(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
