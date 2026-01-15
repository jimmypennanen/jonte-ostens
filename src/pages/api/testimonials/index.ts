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

    const { quote, author, role } = body;

    // Validate input
    if (!quote || !author || !role) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
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
