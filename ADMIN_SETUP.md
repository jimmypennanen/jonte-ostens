# Admin Panel Setup Guide

## 🎉 Admin Panel för Jonte-Osten - Implementerat!

Fullständig admin-panel har lagts till till jonte-osten-sidan med databaskoppling, autentisering och CRUD-operationer.

---

## 🚀 Kom igång

### 1. Installera och starta

```bash
npm install
npm run dev
```

Servern startar på `http://localhost:4323/`

### 2. Skapa admin-användare

```bash
npm run create-admin <användarnamn> <lösenord>
```

Exempel:
```bash
npm run create-admin jonte secretadmin123
```

### 3. Logga in

1. Besök `http://localhost:4323/admin/login`
2. Använd de login-uppgifter du skapade
3. Du kommer till admin-dashboard

---

## 📋 Admin-panel Funktioner

### Dashboard (`/admin`)
- Överblick över antal ostar, meddelanden och testimonials
- Olästa meddelanden-räknare
- Väntande testimonials-räknare
- Snabba åtgärder för vanliga uppgifter
- Senaste kontaktmeddelanden-feed

### Ostar Management (`/admin/cheeses`)
- **Lista**: Visa alla ostar i tabell-format
- **Skapa**: Lägg till ny ost (`/admin/cheeses/new`)
  - Namn
  - Pris
  - Beskrivning
  - Passar till (pairing)
- **Redigera**: Uppdatera befintlig ost (`/admin/cheeses/edit/[id]`)
- **Ta bort**: Radera ost med bekräftelse

Alla ändringar uppdateras omedelbar på `/produkterna` och `/`

### Veckans Ost (`/admin/weekly`)
- Visa nuvarande veckans ost
- Välja ny ost för veckan
- Fylla i:
  - Beskrivning
  - Varför denna vecka
  - Hur äter man den
  - PAIRA ALDRIG MED (en per rad)
- Uppdateringar syns på `/veckans-ost` och hemsidessteaser

### Kontaktmeddelanden (`/admin/messages`)
- Lista alla meddelanden från `/kontakt` formulär
- Markera som läst/oläst
- Ta bort meddelanden
- Se namn, email, ämne och meddelande

### Testimonials (`/admin/testimonials`)
- Lägg till ny testimonial
- Godkänna/avslå testimonials
- Endast godkända testimonials visas på hemsidan
- Redigera eller ta bort

---

## 🗄️ Databas

**Databasen**: `jonte-osten.db` (SQLite)
- Skapas automatisk vid första körning
- Lagras i projektets rot
- `.gitignore` innehåller redan `jonte-osten.db` så den committas inte

**Tabeller**:
- `users` - Admin-användare
- `cheeses` - Produkter
- `weekly_cheese` - Veckans ost
- `previous_weeks` - Historik
- `testimonials` - Kundrecensioner
- `contact_messages` - Kontaktformulär
- `sessions` - Användar-sessioner

**Initial data**:
- 8 ostar pre-seedade
- 3 testimonials pre-godkända
- Nuvarande veckans ost satt till Midnight Västerbotten

---

## 🔐 Säkerhet

### Autentisering
- Session-baserad med HTTP-only cookies
- Lösenord hashas med bcrypt (10 salt rounds)
- Session-tokens är UUID v4 med 7 dagar expiry
- Alla `/admin/*` routes (utom `/admin/login`) är skyddade

### Middleware
- `/src/middleware/index.ts` validerar sessionen för alla admin-routes
- Redirectar till login om session är ogiltig eller utgången

### API Endpoints
- Validerar input på alla endpoints
- Email-validering för kontaktformulär
- SQL injection prevention via prepared statements

---

## 📝 API Endpoints (för utveckling)

### Auth
- `POST /api/auth/login` - Logga in
- `POST /api/auth/logout` - Logga ut
- `GET /api/auth/me` - Aktuell användare

### Cheeses
- `GET /api/cheeses` - Hämta alla
- `POST /api/cheeses` - Skapa ny
- `GET /api/cheeses/[id]` - Hämta en
- `PUT /api/cheeses/[id]` - Uppdatera
- `DELETE /api/cheeses/[id]` - Radera

### Weekly Cheese
- `GET /api/weekly/current` - Nuvarande
- `POST /api/weekly/current` - Uppdatera nuvarande

### Messages
- `GET /api/messages` - Hämta alla
- `GET /api/messages/[id]` - Hämta en
- `PATCH /api/messages/[id]` - Markera läst
- `DELETE /api/messages/[id]` - Radera

### Testimonials
- `GET /api/testimonials` - Hämta alla
- `POST /api/testimonials` - Skapa ny
- `PUT /api/testimonials/[id]` - Uppdatera
- `PATCH /api/testimonials/[id]` - Godkänna/avslå
- `DELETE /api/testimonials/[id]` - Radera

### Contact
- `POST /api/contact/submit` - Skicka kontaktformulär

---

## 📂 Nya filer skapade

### Databas
- `src/db/schema.sql` - Schema för SQLite
- `src/db/index.ts` - Connection och helper-funktioner

### Auth
- `src/lib/auth.ts` - Auth utilities (hash, verify, sessions)
- `src/middleware/index.ts` - Astro middleware för att skydda routes
- `src/pages/api/auth/login.ts` - Login endpoint
- `src/pages/api/auth/logout.ts` - Logout endpoint
- `src/pages/api/auth/me.ts` - Hämta current user

### Admin UI
- `src/layouts/AdminLayout.astro` - Admin-layout med sidebar
- `src/pages/admin/index.astro` - Dashboard
- `src/pages/admin/login.astro` - Login-sida
- `src/pages/admin/cheeses/index.astro` - Lista ostar
- `src/pages/admin/cheeses/new.astro` - Skapa ost
- `src/pages/admin/cheeses/edit/[id].astro` - Redigera ost
- `src/pages/admin/weekly/index.astro` - Hantera veckans ost
- `src/pages/admin/messages/index.astro` - Kontaktmeddelanden
- `src/pages/admin/testimonials/index.astro` - Testimonials

### API Endpoints
- `src/pages/api/cheeses/index.ts` - Cheese CRUD
- `src/pages/api/cheeses/[id].ts` - Enskild cheese
- `src/pages/api/weekly/current.ts` - Weekly cheese
- `src/pages/api/messages/index.ts` - Messages
- `src/pages/api/messages/[id].ts` - Enskilt message
- `src/pages/api/testimonials/index.ts` - Testimonials
- `src/pages/api/testimonials/[id].ts` - Enskild testimonial
- `src/pages/api/contact/submit.ts` - Contact form submission

### Scripts
- `scripts/create-admin.ts` - Script för att skapa admin-användare

---

## 🔧 Modifierade filer

- `astro.config.mjs` - Bytt till server output mode + Node adapter
- `package.json` - Lade till dependencies och create-admin script
- `src/pages/produkterna.astro` - Läser från DB istället för hardkodat
- `src/pages/index.astro` - Läser från DB för ostar och testimonials
- `src/pages/veckans-ost.astro` - Läser från DB för veckans ost
- `src/pages/kontakt.astro` - Lade till form submission til API

---

## 🧪 Testning

### Manual Testing Checklist

#### 1. Database Setup
- [ ] Starta `npm run dev`
- [ ] Verifiera att `jonte-osten.db` skapas
- [ ] Verifiera att initial data är seedat

#### 2. Authentication
- [ ] Besök `/admin` → redirectar till `/admin/login`
- [ ] Logga in med `testadmin` / `testpassword123`
- [ ] Redirectas till `/admin`
- [ ] Klicka "Logga ut"
- [ ] Redirectas till `/admin/login`

#### 3. Cheese Management
- [ ] Gå till "Ostar"
- [ ] Skapa ny ost
- [ ] Verifiera den sparas i DB
- [ ] Redigera en ost
- [ ] Verifiera ändringar sparas
- [ ] Radera en ost
- [ ] Besök `/produkterna` och verifiera att ändringar syns

#### 4. Weekly Cheese
- [ ] Gå till "Veckans Ost"
- [ ] Välj en ny ost
- [ ] Fyll i alla fält
- [ ] Spara
- [ ] Besök `/veckans-ost` och verifiera att det uppdaterats
- [ ] Besök `/` och verifiera teaser uppdaterad

#### 5. Contact Messages
- [ ] Besök `/kontakt` som anonym
- [ ] Fyll i och skicka formulär
- [ ] Gå till admin → "Meddelanden"
- [ ] Verifiera meddelande är där
- [ ] Markera som läst
- [ ] Radera meddelande

#### 6. Testimonials
- [ ] Gå till "Testimonials"
- [ ] Lägg till ny
- [ ] Besök `/` och verifiera att den inte syns (ej godkänd)
- [ ] Gå till admin och godkänna
- [ ] Besök `/` och verifiera att den syns nu

#### 7. Session Expiry
- [ ] Logga in
- [ ] Vänta på session expiry (eller manipulera DB)
- [ ] Besök `/admin` → redirectar till login

---

## 📈 Nästa steg (framtida idéer)

1. **Bilduppladdning** - Lägg till bilduppladdning för ostar (Cloudinary)
2. **E-postnotifikationer** - Skicka email när nya meddelanden kommer in
3. **Mobil meny** - Implementera hamburgermeny i Header
4. **Frontend validering** - Bättre error handling på klientsidan
5. **Sök/filtrera** - Lägg till sök-funktionalitet i admin
6. **Batch-operationer** - Möjlighet att ta bort flera items samtidigt
7. **Logging** - Spåra ändringar i admin-panelen
8. **Theme/branding** - Låta Jonte anpassa färger/logga från admin

---

## 🐛 Felsökning

### Database låst
Om du får "database is locked" fel:
```bash
# Stoppa dev-servern (Ctrl+C)
# Radera DB-filen och låt den återskapas:
rm jonte-osten.db
npm run dev
```

### Login funkar inte
```bash
# Skapa ny admin-användare:
npm run create-admin mynewuser mypassword123
```

### Ändringar i DB syns inte på hemsidan
- Starta om dev-servern: `npm run dev`

---

## 📚 Dokumentation

- SQLite dokumentation: https://www.sqlite.org/docs.html
- Astro dokumentation: https://docs.astro.build/
- Better-sqlite3: https://github.com/WiseLibs/better-sqlite3/wiki
- Bcrypt: https://github.com/kelektiv/node.bcrypt.js

---

## ✨ Lyckades installation?

Om allt fungerar bra bör du kunna:
1. Logga in på `/admin/login`
2. Se alla 8 ostar på dashboard
3. Skapa, redigera och ta bort ostar
4. Hantera veckans ost
5. Se kontaktmeddelanden från hemsidan
6. Godkänna testimonials

**Grattis! Admin-panelen är klar att använda!** 🎉
