import type { APIRoute } from 'astro';
import { validateSession } from '../../../lib/auth';

export const GET: APIRoute = async ({ request }) => {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookieMap = Object.fromEntries(
      cookieHeader
        .split('; ')
        .map(c => c.split('='))
        .filter(([k, v]) => k && v)
    );

    const sessionToken = cookieMap['session_token'];

    if (!sessionToken) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const session = validateSession(sessionToken);

    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Invalid session' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        user: {
          id: session.user_id,
          username: session.username
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Me endpoint error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
