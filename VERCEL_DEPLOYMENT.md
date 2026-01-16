# Vercel Deployment Guide

## Configuration

This project is configured for Vercel serverless deployment with Astro 5 and SQLite.

### Key Configuration Files

- **`astro.config.mjs`** - Uses `@astrojs/vercel/serverless` adapter
- **`vercel.json`** - Vercel-specific build and function configuration

### Database Management

The SQLite database is stored in Vercel's `/tmp` directory during serverless function execution. This means:

- **Database Path**: `/tmp/jonte-osten.db` on Vercel
- **Database Path**: `./jonte-osten.db` in local development

### How It Works

1. When deployed to Vercel, the `@astrojs/vercel` adapter converts your Astro application into serverless functions
2. Each API route and page becomes a separate function that can be invoked independently
3. The SQLite database is initialized on first request and reused across invocations
4. Data persists in `/tmp` during a function's lifetime

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

**404 NOT_FOUND errors:**
- Check that database initialization is working
- Verify schema.sql is included in build
- Check Vercel function logs in dashboard

**Database not persisting:**
- Expected behavior on Vercel's `/tmp`
- For permanent storage, migrate to a proper database service

**Build failures:**
- Check that all dependencies are in `package.json`
- Verify `better-sqlite3` can compile on Vercel's environment
- Check Vercel build logs for detailed errors

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
