/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, n as renderScript } from '../../chunks/astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_B3d8O62l.mjs';
import { c as getAllTestimonials } from '../../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const testimonials = getAllTestimonials();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Testimonials", "currentPath": "/admin/testimonials" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <div class="flex justify-between items-center mb-8"> <h1 class="text-3xl font-display font-bold text-dark-brown">
Testimonials
</h1> <button id="add-new-btn" class="btn-primary">
Lägg till ny testimonial
</button> </div> <!-- New testimonial form (hidden by default) --> <div id="new-form" class="card mb-8 hidden"> <h2 class="text-2xl font-display font-bold text-dark-brown mb-6">
Ny testimonial
</h2> <form id="create-form" class="space-y-4"> <div> <label for="quote" class="block text-sm font-semibold text-dark-brown mb-2">
Citat *
</label> <textarea id="quote" name="quote" required${addAttribute(3, "rows")} class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown resize-none" placeholder="Vad säger personen?"></textarea> </div> <div class="grid md:grid-cols-2 gap-4"> <div> <label for="author" class="block text-sm font-semibold text-dark-brown mb-2">
Namn *
</label> <input type="text" id="author" name="author" required class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown"> </div> <div> <label for="role" class="block text-sm font-semibold text-dark-brown mb-2">
Roll/titel *
</label> <input type="text" id="role" name="role" required class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown" placeholder="T.ex. Långtidskund"> </div> </div> <div class="flex gap-2"> <button type="submit" class="flex-1 bg-dark-green text-cream px-4 py-2 rounded-lg font-semibold hover:bg-dark-green/90 transition-colors">
Spara
</button> <button type="button" id="cancel-new" class="flex-1 bg-dark-brown/20 text-dark-brown px-4 py-2 rounded-lg font-semibold hover:bg-dark-brown/30 transition-colors">
Avbryt
</button> </div> </form> </div> ${testimonials.length === 0 ? renderTemplate`<div class="card text-center py-12"> <p class="text-dark-brown/70 mb-4">Inga testimonials ännu</p> <button id="add-new-btn-2" class="btn-primary inline-block">
Lägg till första testimonial
</button> </div>` : renderTemplate`<div class="space-y-4"> ${testimonials.map((t) => renderTemplate`<div${addAttribute(`card border-l-4 ${t.is_approved === 1 ? "border-dark-green" : "border-soft-yellow"}`, "class")}> <div class="flex justify-between items-start gap-4 mb-4"> <div class="flex-grow"> <p class="italic text-dark-brown/80 mb-2">"${t.quote}"</p> <p class="font-semibold text-dark-brown">${t.author}</p> <p class="text-sm text-dark-brown/60">${t.role}</p> </div> <span${addAttribute(`text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap ${t.is_approved === 1 ? "bg-dark-green text-cream" : "bg-soft-yellow text-dark-brown"}`, "class")}> ${t.is_approved === 1 ? "\u2713 Godk\xE4nd" : "\u23F3 V\xE4ntande"} </span> </div> <div class="flex gap-2"> <button${addAttribute(["approve-btn px-3 py-1 text-sm font-semibold rounded transition-colors", {
    "bg-dark-green text-cream hover:bg-dark-green/90": t.is_approved === 0,
    "bg-dark-green/20 text-dark-green hover:bg-dark-green/30": t.is_approved === 1
  }], "class:list")}${addAttribute(t.id, "data-id")}${addAttribute(t.is_approved, "data-approved")}> ${t.is_approved === 0 ? "Godk\xE4nna" : "\xC5ngra godk\xE4nnande"} </button> <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded text-sm font-semibold hover:bg-red-600 transition-colors"${addAttribute(t.id, "data-id")}>
Ta bort
</button> </div> </div>`)} </div>`} </div> ${renderScript($$result2, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/testimonials/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/testimonials/index.astro", void 0);

const $$file = "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/testimonials/index.astro";
const $$url = "/admin/testimonials";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
