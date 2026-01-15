import { q as updateTestimonial, t as toggleTestimonialApproval, r as deleteTestimonial } from '../../../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../../../renderers.mjs';

const PUT = async ({ params, request }) => {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid testimonial ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const body = await request.json();
    const { quote, author, role } = body;
    if (!quote || !author || !role) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    updateTestimonial(id, quote, author, role);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Update testimonial error:", error);
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
      return new Response(JSON.stringify({ error: "Invalid testimonial ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const body = await request.json();
    const { isApproved } = body;
    if (typeof isApproved !== "boolean") {
      return new Response(
        JSON.stringify({ error: "isApproved must be a boolean" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    toggleTestimonialApproval(id, isApproved);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Toggle testimonial approval error:", error);
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
      return new Response(JSON.stringify({ error: "Invalid testimonial ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    deleteTestimonial(id);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Delete testimonial error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  PATCH,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
