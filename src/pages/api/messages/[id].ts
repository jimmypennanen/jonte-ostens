import type { APIRoute } from 'astro';
import { getContactMessage, markMessageAsRead, deleteContactMessage } from '../../../db/index';

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = parseInt(params.id as string, 10);

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid message ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const message = getContactMessage(id);

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(message), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Get message error:', error);
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
      return new Response(JSON.stringify({ error: 'Invalid message ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const message = getContactMessage(id);
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json() as { isRead?: boolean };
    const { isRead } = body;

    if (typeof isRead !== 'boolean') {
      return new Response(
        JSON.stringify({ error: 'isRead must be a boolean' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    markMessageAsRead(id, isRead);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Update message error:', error);
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
      return new Response(JSON.stringify({ error: 'Invalid message ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const message = getContactMessage(id);
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    deleteContactMessage(id);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Delete message error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
