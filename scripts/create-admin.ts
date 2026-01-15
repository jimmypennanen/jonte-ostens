import { hashPassword } from '../src/lib/auth.js';
import { insertUser, initDatabase } from '../src/db/index.js';

async function main() {
  const args = process.argv.slice(2);

  console.log('\n🧀 Jonte-Osten Admin User Creator');
  console.log('==================================\n');

  // Initialize database
  initDatabase();

  let username = args[0];
  let password = args[1];

  if (!username) {
    console.log('❌ Användning: npm run create-admin <username> <password>');
    console.log('Exempel: npm run create-admin admin minlösenord123\n');
    process.exit(1);
  }

  if (!password) {
    console.log('❌ Användning: npm run create-admin <username> <password>');
    console.log('Exempel: npm run create-admin admin minlösenord123\n');
    process.exit(1);
  }

  try {
    const hashedPassword = await hashPassword(password);
    const userId = insertUser(username, hashedPassword);

    console.log('\n✅ Admin-användare skapad!');
    console.log(`   Användarnamn: ${username}`);
    console.log(`   ID: ${userId}`);
    console.log('\n Du kan nu logga in på http://localhost:4323/admin/login\n');
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      console.log(`❌ En användare med namn "${username}" existerar redan`);
    } else {
      console.error('❌ Fel vid skapande av användare:', error);
    }
    process.exit(1);
  }
}

main();
