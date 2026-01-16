import type { APIRoute } from 'astro';
import { loginUser } from '../../../lib/auth';
import { getSessionExpiry } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json() as { username?: string; password?: string };

    // Trim and validate input
    const username = (body.username || '').trim();
    const password = body.password || '';

    // Validate input
    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Användarnamn och lösenord krävs' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate field lengths
    if (username.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Användarnamn får max vara 100 tecken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (password.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Lösenord får max vara 200 tecken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Attempt login
    const result = await loginUser(username, password);

    if (!result) {
      return new Response(
        JSON.stringify({ error: 'Felaktiga inloggningsuppgifter' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Set session cookie
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    cookies.set('session_token', result.token, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/'
    });

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: result.id,
          username: result.username
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
