# Vercel Deployment Guide

## Configuration

This project is configured for Vercel serverless deployment with Astro 5 and SQLite.

### Key Configuration Files

- **`astro.config.mjs`** - Uses `@astrojs/vercel/serverless` adapter
- **`vercel.json`** - Vercel-specific build and function configuration

### Database Management

The SQLite database is handled specially for Vercel's serverless environment:

- **Database Path**: `/tmp/jonte-osten.db` on Vercel (ephemeral)
- **Database Path**: `./jonte-osten.db` in local development (persistent)

#### Database Initialization Strategy

To ensure data is available in Vercel's ephemeral `/tmp` environment:

1. **Build Time (Prebuild)**: `scripts/ensure-db.js` runs during build
   - Creates schema from `src/db/schema.sql`
   - Seeds all initial data (cheeses, testimonials, weekly cheese, etc.)
   - Creates `jonte-osten.db` with all tables and data prepopulated
   - **This database file is committed to the repository**

2. **Runtime**: When the app starts on Vercel
   - Database file is included in the build
   - Copied to `/tmp/jonte-osten.db` on first function invocation
   - Available for all queries throughout function lifetime

### How It Works

1. When deployed to Vercel, the `@astrojs/vercel` adapter converts your Astro application into serverless functions
2. Each API route and page becomes a separate function
3. The SQLite database is included in the build with all data prepopulated
4. On first invocation, it's copied to `/tmp` and used for the function session
5. Subsequent requests within the same function container reuse the `/tmp` copy

### Important Notes

⚠️ **Database Persistence:**
- Data stored in `/tmp` persists **during a function's execution session**
- When Vercel recycles the function container, the `/tmp` directory is cleared
- For production, consider these solutions:
  1. Use Vercel Postgres or PostgreSQL instead of SQLite
  2. Use a managed database service (AWS RDS, MongoDB Atlas, etc.)
  3. Implement a cron job to backup database to external storage

### Deployment Steps

1. Push to GitHub:
   ```bash
   git push origin main
   ```

2. Vercel automatically detects the project and deploys

3. Build logs visible in Vercel dashboard

4. Environment variables (if needed) can be added in Vercel Project Settings

### Development vs Production

**Local Development:**
```bash
npm run dev          # Runs on localhost:4323
npm run build        # Creates dist/ directory
npm run preview      # Preview production build locally
```

Database location: `./jonte-osten.db`

**Vercel Production:**
Database location: `/tmp/jonte-osten.db`

### Functions Configuration

```json
// vercel.json
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30,
      "memory": 1024
    }
  }
}
```

- **maxDuration**: 30 seconds (API functions can run max 30 seconds)
- **memory**: 1024 MB (each function gets 1GB RAM)

### Troubleshooting

**"no such table: cheeses" errors:**
- This was fixed by moving data seeding to build time (`scripts/ensure-db.js`)
- Ensure `jonte-osten.db` is committed to the repository
- The database file should be included in the Vercel build
- Check build logs to verify prebuild script ran successfully

**404 NOT_FOUND errors:**
- Check that database file is included in build output
- Verify `scripts/ensure-db.js` completed successfully
- Check Vercel function logs in dashboard for database errors

**Build failures:**
- Verify `npm run prebuild` succeeds locally: `node scripts/ensure-db.js`
- Check that all dependencies are in `package.json`
- View Vercel build logs for detailed error messages

**Data appears missing on Vercel:**
- Verify the prepopulated database file exists: `jonte-osten.db`
- Run `node scripts/ensure-db.js` locally to regenerate with latest seed data
- Commit the updated database file: `git add jonte-osten.db && git commit`
- Push to trigger a new Vercel deployment

### Next Steps for Production

1. **Migrate to a persistent database:**
   ```bash
   # Option 1: PostgreSQL via Vercel Postgres
   npm install @vercel/postgres

   # Option 2: MongoDB Atlas
   npm install mongodb
   ```

2. **Add environment variables:**
   - DATABASE_URL
   - Any API keys or secrets

3. **Set up automated backups** if using SQLite elsewhere

4. **Monitor function execution** via Vercel Analytics

### References

- [Astro Vercel Adapter](https://docs.astro.build/en/guides/integrations-guide/vercel/)
- [Vercel Functions Documentation](https://vercel.com/docs/functions)
- [Vercel KV Database](https://vercel.com/docs/storage/vercel-kv)
