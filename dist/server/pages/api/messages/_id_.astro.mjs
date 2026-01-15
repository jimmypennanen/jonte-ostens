import { n as getContactMessage, o as markMessageAsRead, p as deleteContactMessage } from '../../../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ params }) => {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid message ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const message = getContactMessage(id);
    if (!message) {
      return new Response(JSON.stringify({ error: "Message not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify(message), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Get message error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const PATCH = async ({ params, request }) => {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid message ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const message = getContactMessage(id);
    if (!message) {
      return new Response(JSON.stringify({ error: "Message not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const body = await request.json();
    const { isRead } = body;
    if (typeof isRead !== "boolean") {
      return new Response(
        JSON.stringify({ error: "isRead must be a boolean" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    markMessageAsRead(id, isRead);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Update message error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const DELETE = async ({ params }) => {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid message ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const message = getContactMessage(id);
    if (!message) {
      return new Response(JSON.stringify({ error: "Message not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    deleteContactMessage(id);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Delete message error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
