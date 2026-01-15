/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, n as renderScript } from '../../chunks/astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_B3d8O62l.mjs';
import { a as getCheeses, d as getCurrentWeeklyCheese, e as getWeek } from '../../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const cheeses = getCheeses();
  const currentWeeklyCheese = getCurrentWeeklyCheese();
  getWeek(/* @__PURE__ */ new Date());
  (/* @__PURE__ */ new Date()).getFullYear();
  const dontPairWith = currentWeeklyCheese ? JSON.parse(currentWeeklyCheese.dont_pair_with_json || "[]") : [];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Veckans Ost", "currentPath": "/admin/weekly" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <h1 class="text-3xl font-display font-bold text-dark-brown mb-8">
Veckans Ost
</h1> <div class="grid lg:grid-cols-2 gap-8"> <!-- Current Weekly Cheese Info --> <div class="card bg-gradient-to-br from-soft-yellow/30 to-light-green/20"> <h2 class="text-2xl font-display font-bold text-dark-brown mb-6">
Nuvarande val
</h2> ${currentWeeklyCheese ? renderTemplate`<div class="space-y-4"> <div> <p class="text-sm text-dark-brown/60 mb-1">Ost</p> <p class="text-2xl font-bold text-dark-brown"> ${currentWeeklyCheese.cheese_name} </p> </div> <div> <p class="text-sm text-dark-brown/60 mb-1">Vecka</p> <p class="text-lg text-dark-brown">
Vecka ${currentWeeklyCheese.week_number} av ${currentWeeklyCheese.year} </p> </div> <div class="pt-4 border-t border-dark-brown/10"> <p class="text-sm font-semibold text-dark-brown mb-2">Varför denna vecka?</p> <p class="text-sm text-dark-brown/80"> ${currentWeeklyCheese.why_selected} </p> </div> <div> <p class="text-sm font-semibold text-dark-brown mb-2">Hur äter man den?</p> <p class="text-sm text-dark-brown/80"> ${currentWeeklyCheese.how_to_eat} </p> </div> ${dontPairWith.length > 0 && renderTemplate`<div> <p class="text-sm font-semibold text-dark-brown mb-2">PAIRA ALDRIG MED:</p> <ul class="text-sm text-dark-brown/80 space-y-1"> ${dontPairWith.map((item) => renderTemplate`<li>✗ ${item}</li>`)} </ul> </div>`} </div>` : renderTemplate`<p class="text-dark-brown/70">Ingen ost vald ännu för denna vecka</p>`} </div> <!-- Update Form --> <div class="card border-2 border-dark-green/20"> <h2 class="text-2xl font-display font-bold text-dark-brown mb-6">
Uppdatera veckans ost
</h2> <form id="weekly-form" class="space-y-6"> <div> <label for="cheese-id" class="block text-sm font-semibold text-dark-brown mb-2">
Välj ost *
</label> <select id="cheese-id" name="cheeseId" required class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown"> <option value="">-- Välj en ost --</option> ${cheeses.map((cheese) => renderTemplate`<option${addAttribute(cheese.id, "value")}> ${cheese.name} (${cheese.price})
</option>`)} </select> </div> <div> <label for="description" class="block text-sm font-semibold text-dark-brown mb-2">
Beskrivning *
</label> <textarea id="description" name="description" required${addAttribute(3, "rows")} class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown resize-none" placeholder="Beskriv ostens egenskaper denna vecka..."></textarea> </div> <div> <label for="why-selected" class="block text-sm font-semibold text-dark-brown mb-2">
Varför denna vecka? *
</label> <textarea id="why-selected" name="whySelected" required${addAttribute(3, "rows")} class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown resize-none" placeholder="Förklara varför denna ost valdes denna vecka..."></textarea> </div> <div> <label for="how-to-eat" class="block text-sm font-semibold text-dark-brown mb-2">
Hur äter man denna ost? *
</label> <textarea id="how-to-eat" name="howToEat" required${addAttribute(3, "rows")} class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown resize-none" placeholder="Instruktioner för hur man njuter av denna ost..."></textarea> </div> <div> <label for="dont-pair-with" class="block text-sm font-semibold text-dark-brown mb-2">
PAIRA ALDRIG MED: *
</label> <p class="text-xs text-dark-brown/60 mb-2">En sak per rad</p> <textarea id="dont-pair-with" name="dontPairWith" required${addAttribute(4, "rows")} class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown resize-none" placeholder="T.ex.
Något sött
Andra ostar
Stark musik"></textarea> </div> <div id="error-message" class="hidden bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> <p id="error-text"></p> </div> <button type="submit" class="w-full bg-dark-green text-cream px-6 py-3 rounded-lg font-bold hover:bg-dark-green/90 transition-colors">
Spara veckans ost
</button> </form> </div> </div> </div> ${renderScript($$result2, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/weekly/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/weekly/index.astro", void 0);

const $$file = "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/weekly/index.astro";
const $$url = "/admin/weekly";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
