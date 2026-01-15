import { v as validateSession } from '../../../chunks/auth_BRi6n9U_.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookieMap = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("=")).filter(([k, v]) => k && v)
    );
    const sessionToken = cookieMap["session_token"];
    if (!sessionToken) {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const session = validateSession(sessionToken);
    if (!session) {
      return new Response(
        JSON.stringify({ error: "Invalid session" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({
        user: {
          id: session.user_id,
          username: session.username
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Me endpoint error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
