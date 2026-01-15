import { defineMiddleware } from 'astro:middleware';
import { validateSession } from '../lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url, locals } = context;

  // Only check auth for /admin/* routes (except /admin/login)
  if (url.pathname.startsWith('/admin')) {
    if (url.pathname === '/admin/login' || url.pathname === '/admin/login/') {
      // Login page is public
      return next();
    }

    // Get session token from cookie
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader
        .split('; ')
        .map(c => c.split('='))
        .filter(([k, v]) => k && v)
    );

    const sessionToken = cookies['session_token'];

    if (!sessionToken) {
      // No session, redirect to login
      return context.redirect('/admin/login');
    }

    const session = validateSession(sessionToken);

    if (!session) {
      // Invalid or expired session, redirect to login
      return context.redirect('/admin/login');
    }

    // Session is valid, store user info in locals
    locals.user = {
      id: session.user_id,
      username: session.username
    };
  }

  return next();
});
