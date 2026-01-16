import type { APIRoute } from 'astro';
import { updateTestimonial, deleteTestimonial, toggleTestimonialApproval } from '../../../db/index';

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const id = parseInt(params.id as string, 10);

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid testimonial ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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

    updateTestimonial(id, quote, author, role);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Update testimonial error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const id = parseInt(params.id as string, 10);

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid testimonial ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json() as { isApproved?: boolean };
    const { isApproved } = body;

    if (typeof isApproved !== 'boolean') {
      return new Response(
        JSON.stringify({ error: 'isApproved must be a boolean' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    toggleTestimonialApproval(id, isApproved);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Toggle testimonial approval error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = parseInt(params.id as string, 10);

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid testimonial ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    deleteTestimonial(id);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
