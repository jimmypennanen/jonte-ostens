import type { APIRoute } from 'astro';
import { deleteSession } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookieMap = Object.fromEntries(
      cookieHeader
        .split('; ')
        .map(c => c.split('='))
        .filter(([k, v]) => k && v)
    );

    const sessionToken = cookieMap['session_token'];

    if (sessionToken) {
      deleteSession(sessionToken);
    }

    // Clear the cookie
    cookies.delete('session_token', { path: '/' });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
