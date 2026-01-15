import type { APIRoute } from 'astro';
import { getCheeses, insertCheese } from '../../../db/index';

export const GET: APIRoute = async () => {
  try {
    const cheeses = getCheeses();
    return new Response(JSON.stringify(cheeses), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Get cheeses error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as {
      name?: string;
      description?: string;
      price?: string;
      pairing?: string;
    };

    const { name, description, price, pairing } = body;

    // Validate input
    if (!name || !description || !price || !pairing) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insert cheese
    const id = insertCheese(name, description, price, pairing);

    return new Response(
      JSON.stringify({ success: true, id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Create cheese error:', error);

    // Check if it's a unique constraint error
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      return new Response(
        JSON.stringify({ error: 'En ost med detta namn existerar redan' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
