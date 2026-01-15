import { g as getCheese, u as updateCheese, k as deleteCheese } from '../../../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ params }) => {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid cheese ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const cheese = getCheese(id);
    if (!cheese) {
      return new Response(JSON.stringify({ error: "Cheese not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify(cheese), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Get cheese error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const PUT = async ({ params, request }) => {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid cheese ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const existingCheese = getCheese(id);
    if (!existingCheese) {
      return new Response(JSON.stringify({ error: "Cheese not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const body = await request.json();
    const { name, description, price, pairing } = body;
    if (!name || !description || !price || !pairing) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    updateCheese(id, name, description, price, pairing);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Update cheese error:", error);
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
const DELETE = async ({ params }) => {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid cheese ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const existingCheese = getCheese(id);
    if (!existingCheese) {
      return new Response(JSON.stringify({ error: "Cheese not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    deleteCheese(id);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Delete cheese error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
