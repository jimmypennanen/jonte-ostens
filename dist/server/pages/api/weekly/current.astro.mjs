import { d as getCurrentWeeklyCheese, g as getCheese, e as getWeek, v as insertWeeklyCheese } from '../../../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  try {
    const currentWeeklyCheese = getCurrentWeeklyCheese();
    if (!currentWeeklyCheese) {
      return new Response(JSON.stringify({ error: "No weekly cheese selected" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const dontPairWith = JSON.parse(currentWeeklyCheese.dont_pair_with_json || "[]");
    return new Response(
      JSON.stringify({
        ...currentWeeklyCheese,
        dont_pair_with_json: dontPairWith
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Get weekly cheese error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { cheeseId, description, whySelected, howToEat, dontPairWith } = body;
    if (!cheeseId || !description || !whySelected || !howToEat || !dontPairWith) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const cheese = getCheese(cheeseId);
    if (!cheese) {
      return new Response(JSON.stringify({ error: "Cheese not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const currentWeek = getWeek(/* @__PURE__ */ new Date());
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const id = insertWeeklyCheese(
      cheeseId,
      currentWeek,
      currentYear,
      description,
      whySelected,
      howToEat,
      dontPairWith
    );
    return new Response(
      JSON.stringify({ success: true, id }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Create weekly cheese error:", error);
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
