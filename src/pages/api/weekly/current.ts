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

    const cheeseId = body.cheeseId;
    const description = (body.description || '').trim();
    const whySelected = (body.whySelected || '').trim();
    const howToEat = (body.howToEat || '').trim();
    const dontPairWith = (body.dontPairWith || [])
      .map(item => (item || '').trim())
      .filter(item => item.length > 0);

    // Validate required fields
    if (!cheeseId || !description || !whySelected || !howToEat || dontPairWith.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Alla fält är obligatoriska' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate field lengths
    if (description.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Beskrivningen får max vara 1000 tecken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (whySelected.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Förklaringen får max vara 1000 tecken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (howToEat.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Instruktionerna får max vara 1000 tecken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate pairing items
    for (const item of dontPairWith) {
      if (item.length > 100) {
        return new Response(
          JSON.stringify({ error: 'Varje pairing-objekt får max vara 100 tecken' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
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
