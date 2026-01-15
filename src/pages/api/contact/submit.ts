import type { APIRoute } from 'astro';
import { insertContactMessage } from '../../../db/index';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    const { name, email, subject, message } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insert message
    const id = insertContactMessage(name, email, subject, message);

    return new Response(
      JSON.stringify({ success: true, id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact submit error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
