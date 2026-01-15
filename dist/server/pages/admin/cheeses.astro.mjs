/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, n as renderScript, h as addAttribute } from '../../chunks/astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_B3d8O62l.mjs';
import { a as getCheeses } from '../../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const cheeses = getCheeses();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Hantera Ostar", "currentPath": "/admin/cheeses" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <div class="flex justify-between items-center mb-8"> <h1 class="text-3xl font-display font-bold text-dark-brown">
Ostar
</h1> <a href="/admin/cheeses/new" class="btn-primary">
Lägg till ny ost
</a> </div> ${cheeses.length === 0 ? renderTemplate`<div class="card text-center py-12"> <p class="text-dark-brown/70 mb-4">Inga ostar ännu</p> <a href="/admin/cheeses/new" class="btn-primary inline-block">
Lägg till första ost
</a> </div>` : renderTemplate`<div class="card overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full"> <thead class="bg-dark-green text-cream"> <tr> <th class="text-left px-6 py-4 font-semibold">Namn</th> <th class="text-left px-6 py-4 font-semibold">Pris</th> <th class="text-left px-6 py-4 font-semibold">Beskrivning</th> <th class="text-right px-6 py-4 font-semibold">Åtgärder</th> </tr> </thead> <tbody class="divide-y divide-dark-brown/10"> ${cheeses.map((cheese) => renderTemplate`<tr class="hover:bg-cream/50 transition-colors"> <td class="px-6 py-4 font-semibold text-dark-brown"> ${cheese.name} </td> <td class="px-6 py-4 text-dark-brown/70"> ${cheese.price} </td> <td class="px-6 py-4 text-dark-brown/70"> <p class="line-clamp-1">${cheese.description}</p> </td> <td class="px-6 py-4 text-right"> <div class="flex gap-2 justify-end"> <a${addAttribute(`/admin/cheeses/edit/${cheese.id}`, "href")} class="px-3 py-1 bg-soft-yellow text-dark-brown rounded hover:bg-soft-yellow/80 text-sm font-semibold transition-colors">
Redigera
</a> <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-semibold transition-colors"${addAttribute(cheese.id, "data-id")}>
Ta bort
</button> </div> </td> </tr>`)} </tbody> </table> </div> </div>`} </div> ${renderScript($$result2, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/cheeses/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/cheeses/index.astro", void 0);

const $$file = "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/cheeses/index.astro";
const $$url = "/admin/cheeses";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
