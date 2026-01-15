import type { APIRoute } from 'astro';
import { getCurrentWeeklyCheese, insertWeeklyCheese, getWeek, getCheese } from '../../../db/index';

export const GET: APIRoute = async () => {
  try {
    const currentWeeklyCheese = getCurrentWeeklyCheese();

    if (!currentWeeklyCheese) {
      return new Response(JSON.stringify({ error: 'No weekly cheese selected' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse dont_pair_with JSON
    const dontPairWith = JSON.parse(currentWeeklyCheese.dont_pair_with_json || '[]');

    return new Response(
      JSON.stringify({
        ...currentWeeklyCheese,
        dont_pair_with_json: dontPairWith
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Get weekly cheese error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as {
      cheeseId?: number;
      description?: string;
      whySelected?: string;
      howToEat?: string;
      dontPairWith?: string[];
    };

    const { cheeseId, description, whySelected, howToEat, dontPairWith } = body;

    // Validate input
    if (!cheeseId || !description || !whySelected || !howToEat || !dontPairWith) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify cheese exists
    const cheese = getCheese(cheeseId);
    if (!cheese) {
      return new Response(JSON.stringify({ error: 'Cheese not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get current week and year
    const currentWeek = getWeek(new Date());
    const currentYear = new Date().getFullYear();

    // Insert weekly cheese
    const id = insertWeeklyCheese(
      cheeseId,
      currentWeek,
      currentYear,
      description,
      whySelected,
      howToEat,
      dontPairWith
    );

    return new Response(
      JSON.stringify({ success: true, id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Create weekly cheese error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
