import type { APIRoute } from 'astro';
import { getAllTestimonials, insertTestimonial } from '../../../db/index';

export const GET: APIRoute = async () => {
  try {
    const testimonials = getAllTestimonials();

    return new Response(JSON.stringify(testimonials), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Get testimonials error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as {
      quote?: string;
      author?: string;
      role?: string;
    };

    // Trim and validate input
    const quote = (body.quote || '').trim();
    const author = (body.author || '').trim();
    const role = (body.role || '').trim();

    // Validate required fields
    if (!quote || !author || !role) {
      return new Response(
        JSON.stringify({ error: 'Alla fält är obligatoriska' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate field lengths
    if (quote.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Citatet får max vara 500 tecken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (author.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Författarens namn får max vara 100 tecken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (role.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Rollen får max vara 100 tecken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insert testimonial
    const id = insertTestimonial(quote, author, role);

    return new Response(
      JSON.stringify({ success: true, id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Create testimonial error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
