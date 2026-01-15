import { b as getContactMessages } from '../../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const messages = getContactMessages();
    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Get messages error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
