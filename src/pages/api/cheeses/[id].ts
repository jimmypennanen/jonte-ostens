import type { APIRoute } from 'astro';
import { getCheese, updateCheese, deleteCheese } from '../../../db/index';

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = parseInt(params.id as string, 10);

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid cheese ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const cheese = getCheese(id);

    if (!cheese) {
      return new Response(JSON.stringify({ error: 'Cheese not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(cheese), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Get cheese error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const id = parseInt(params.id as string, 10);

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid cheese ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if cheese exists
    const existingCheese = getCheese(id);
    if (!existingCheese) {
      return new Response(JSON.stringify({ error: 'Cheese not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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

    // Update cheese
    updateCheese(id, name, description, price, pairing);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Update cheese error:', error);

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

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = parseInt(params.id as string, 10);

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid cheese ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if cheese exists
    const existingCheese = getCheese(id);
    if (!existingCheese) {
      return new Response(JSON.stringify({ error: 'Cheese not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Delete cheese
    deleteCheese(id);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Delete cheese error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
