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

    // Trim and validate input
    const name = (body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const subject = (body.subject || '').trim();
    const message = (body.message || '').trim();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Alla fält är obligatoriska' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate field lengths
    if (name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Namn får max vara 100 tecken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (email.length > 100) {
      return new Response(
        JSON.stringify({ error: 'E-post får max vara 100 tecken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (subject.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Ämne får max vara 100 tecken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Meddelande får max vara 5000 tecken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Ogiltig e-postadress' }),
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
