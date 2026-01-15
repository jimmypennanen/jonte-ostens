import type { APIRoute } from 'astro';
import { getContactMessages } from '../../../db/index';

export const GET: APIRoute = async () => {
  try {
    const messages = getContactMessages();

    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
