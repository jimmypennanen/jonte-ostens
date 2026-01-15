# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Jonte-Osten** is a humorous parody cheese shop website built with Astro, featuring a public-facing site and a complete admin panel for managing products, testimonials, and customer messages.

## Tech Stack

- **Framework**: Astro 5.16.9 (Server mode with Node adapter)
- **Database**: SQLite (better-sqlite3)
- **Authentication**: Bcrypt + Session-based (HTTP-only cookies)
- **Styling**: Tailwind CSS 3.4.1
- **Language**: TypeScript + Astro components

## Architecture Overview

### Database Layer (`src/db/index.ts`)
- Single SQLite connection managed via `getDb()`
- Auto-initializes schema from `src/db/schema.sql` on first run
- Seeds initial data (8 cheeses, 3 testimonials, current weekly cheese)
- Helper functions for all CRUD operations across 7 tables

**Key tables:**
- `users` - Admin accounts (username, bcrypt password_hash)
- `cheeses` - Products (name, description, price, pairing)
- `weekly_cheese` - Current week's featured cheese with details
- `previous_weeks` - Historical weekly cheese selections
- `testimonials` - Customer quotes (with is_approved flag)
- `contact_messages` - Form submissions from /kontakt
- `sessions` - User sessions with UUID tokens and expiry

### Authentication & Middleware
- **`src/lib/auth.ts`**: Utilities for password hashing, session creation, validation
- **`src/middleware/index.ts`**: Astro middleware that protects `/admin/*` routes
  - Validates session token from cookies
  - Redirects to `/admin/login` if unauthorized
  - Sets `Astro.locals.user` for authenticated requests

### API Layer
All endpoints use standard HTTP methods and return JSON. No authentication middleware on endpoints—they trust the frontend to have a valid session (session validation happens via middleware for page routes).

**Pattern**: `/api/[resource]/[id].ts` files use `GET`, `POST`, `PUT`, `PATCH`, `DELETE` exports

Key endpoints:
- `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
- `/api/cheeses` (list, create), `/api/cheeses/[id]` (read, update, delete)
- `/api/weekly/current` (read, update)
- `/api/messages`, `/api/messages/[id]` (with PATCH for mark-as-read)
- `/api/testimonials`, `/api/testimonials/[id]` (with PATCH for approve/reject)
- `/api/contact/submit` (public endpoint for contact form)

### Admin UI (`src/pages/admin/`)
- **`AdminLayout.astro`**: Sidebar navigation + auth status
- **Pages marked with `export const prerender = false`** to enable server-side rendering
- Uses client-side fetch for form submissions
- Toast-like error messages (hidden divs that toggle visibility)

### Public Pages
- **`/produkterna.astro`**: Reads from `db.getCheeses()`
- **`/index.astro`**: Reads featured cheeses and approved testimonials from DB
- **`/veckans-ost.astro`**: Reads current weekly cheese and previous weeks history
- **`/kontakt.astro`**: Contact form submits to `/api/contact/submit` via fetch

## Common Commands

```bash
# Development
npm run dev              # Start dev server (port 4323)
npm run build            # Build for production
npm run preview          # Preview production build locally

# Admin
npm run create-admin <username> <password>    # Create new admin user

# Example:
npm run create-admin jonte secretpassword123
```

## Database Management

### Initial Setup
- Database auto-creates on first `npm run dev`
- Initial data is seeded automatically
- Database file: `jonte-osten.db` (in .gitignore)

### Adding/Modifying Schema
1. Edit `src/db/schema.sql`
2. Add migration logic to `initDatabase()` in `src/db/index.ts` if needed
3. Restart dev server (it will re-run schema on startup if table doesn't exist)

### Resetting Database
```bash
rm jonte-osten.db
npm run dev  # Recreates from schema with seed data
```

## Key Implementation Details

### Session Management
- Sessions stored in DB with `token` (UUID v4) and `expires_at`
- 7-day expiry time
- Cookies are httpOnly (secure flag in production)
- Session validated on every admin page load via middleware

### Form Submissions
- Contact form and admin forms use client-side `fetch()`
- Success/error UI managed with hidden divs + `classList` toggles
- No form reload on submit—manual redirect after success

### Weekly Cheese JSON Fields
- `dont_pair_with_json`: Stored as JSON string in DB, parsed in TypeScript
- `previous_weeks`: Separate table for historical entries

### Data Flow for Admin Changes
1. User submits form → fetch to API endpoint
2. API validates input, updates DB
3. Frontend redirects to listing page OR reloads
4. Public pages read fresh data from DB (no caching)

## Development Patterns

### Adding a New Admin Feature
1. Create database helper in `src/db/index.ts`
2. Add API endpoint(s) in `src/pages/api/[resource]/`
3. Create admin UI page(s) in `src/pages/admin/[feature]/`
4. Update navigation in `src/layouts/AdminLayout.astro`
5. Test via admin UI and verify DB changes

### Type Safety
- Use TypeScript types for all function parameters
- Database queries return typed objects (defined inline in `src/db/index.ts`)
- Astro components use interface Props for type-checked props

### Error Handling
- API endpoints return HTTP status codes (200, 201, 400, 401, 404, 500)
- Frontend displays errors from response JSON (`.error` field)
- No try-catch needed for validation—return 400 with error message

## Deployment Considerations

- **Output Mode**: Server (not static)—Astro generates Node.js server
- **Adapter**: @astrojs/node in standalone mode
- **Database**: SQLite file persists across deployments (configure volume in hosting)
- **Environment**: No env vars currently used (can add for DB path, secret keys, etc.)

## File Structure Reference

```
src/
├── db/
│   ├── schema.sql              # Database schema
│   └── index.ts                # Connection + helpers
├── lib/
│   └── auth.ts                 # Password hashing, session mgmt
├── middleware/
│   └── index.ts                # Route protection
├── pages/
│   ├── api/
│   │   ├── auth/               # Login, logout, me
│   │   ├── cheeses/            # Cheese CRUD
│   │   ├── weekly/             # Weekly cheese
│   │   ├── messages/           # Contact messages
│   │   ├── testimonials/       # Testimonials
│   │   └── contact/            # Contact form submission
│   ├── admin/                  # Admin UI pages
│   ├── index.astro             # Home (reads from DB)
│   ├── produkterna.astro       # Products (reads from DB)
│   ├── veckans-ost.astro       # Weekly cheese public
│   └── kontakt.astro           # Contact form public
├── layouts/
│   ├── MainLayout.astro        # Public layout
│   └── AdminLayout.astro       # Admin layout with sidebar
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── CheeseCard.astro
│   └── Testimonial.astro
└── styles/
    └── global.css

scripts/
└── create-admin.ts             # CLI tool to create admin users

ADMIN_SETUP.md                   # Detailed admin panel documentation
```

## Next Steps / Future Improvements

Possible enhancements (not yet implemented):
- Image upload for cheeses (Cloudinary or local storage)
- Email notifications when messages received
- Mobile hamburger menu (Header button exists but non-functional)
- Search/filter in admin listings
- Activity logging (who changed what, when)
- Batch delete operations
- Frontend form validation improvements

## Notes for Future Work

- Database uses WAL mode (`pragma journal_mode = WAL`)—this is good for concurrent access
- All timestamps use SQLite's `CURRENT_TIMESTAMP` (UTC)
- No foreign key constraints enforced—be careful with deletions
- Contact form submissions don't require authentication (public endpoint)
- Admin pages `export const prerender = false` to enable server-side rendering
