import { d as deleteSession } from '../../../chunks/auth_BRi6n9U_.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookieMap = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("=")).filter(([k, v]) => k && v)
    );
    const sessionToken = cookieMap["session_token"];
    if (sessionToken) {
      deleteSession(sessionToken);
    }
    cookies.delete("session_token", { path: "/" });
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
