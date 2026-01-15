import { a as getCheeses, l as insertCheese } from '../../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const cheeses = getCheeses();
    return new Response(JSON.stringify(cheeses), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Get cheeses error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, description, price, pairing } = body;
    if (!name || !description || !price || !pairing) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const id = insertCheese(name, description, price, pairing);
    return new Response(
      JSON.stringify({ success: true, id }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Create cheese error:", error);
    if (error instanceof Error && error.message.includes("UNIQUE")) {
      return new Response(
        JSON.stringify({ error: "En ost med detta namn existerar redan" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
