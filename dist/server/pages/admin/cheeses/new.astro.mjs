/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, n as renderScript } from '../../../chunks/astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_B3d8O62l.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "L\xE4gg till ny ost", "currentPath": "/admin/cheeses" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <h1 class="text-3xl font-display font-bold text-dark-brown mb-8">
Lägg till ny ost
</h1> <div class="max-w-2xl"> <form id="cheese-form" class="card space-y-6"> <div> <label for="name" class="block text-sm font-semibold text-dark-brown mb-2">
Ostens namn *
</label> <input type="text" id="name" name="name" required class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown" placeholder="T.ex. Jontes Premium Grevé 2.0"> </div> <div> <label for="price" class="block text-sm font-semibold text-dark-brown mb-2">
Pris *
</label> <input type="text" id="price" name="price" required class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown" placeholder="T.ex. 199 kr/hg"> </div> <div> <label for="description" class="block text-sm font-semibold text-dark-brown mb-2">
Beskrivning *
</label> <textarea id="description" name="description" required${addAttribute(4, "rows")} class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown resize-none" placeholder="Beskriv ostens egenskaper och smak..."></textarea> </div> <div> <label for="pairing" class="block text-sm font-semibold text-dark-brown mb-2">
Passar till *
</label> <input type="text" id="pairing" name="pairing" required class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown" placeholder="T.ex. Knäckebröd, fruktvin, drömmar"> </div> <div id="error-message" class="hidden bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> <p id="error-text"></p> </div> <div class="flex gap-4"> <button type="submit" class="flex-1 bg-dark-green text-cream px-6 py-3 rounded-lg font-bold hover:bg-dark-green/90 transition-colors">
Lägg till ost
</button> <a href="/admin/cheeses" class="flex-1 bg-dark-brown/20 text-dark-brown px-6 py-3 rounded-lg font-bold hover:bg-dark-brown/30 transition-colors text-center">
Avbryt
</a> </div> </form> </div> </div> ${renderScript($$result2, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/cheeses/new.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/cheeses/new.astro", void 0);

const $$file = "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/cheeses/new.astro";
const $$url = "/admin/cheeses/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
