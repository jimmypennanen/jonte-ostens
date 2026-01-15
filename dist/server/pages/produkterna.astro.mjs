/* empty css                                */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$MainLayout, a as $$Hero } from '../chunks/Hero_DzQjJp9l.mjs';
import { $ as $$CheeseCard } from '../chunks/CheeseCard_EDc2Y-ob.mjs';
import { a as getCheeses } from '../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Produkterna = createComponent(($$result, $$props, $$slots) => {
  const cheeses = getCheeses();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Produkterna" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "title": "Alla ostar", "subtitle": "Jontes kompletta samling av ostar f\xF6r varje tillf\xE4lle, hum\xF6r och personlighetskris" })} ${maybeRenderHead()}<section class="section-padding bg-cream"> <div class="max-w-7xl mx-auto px-6 md:px-8"> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8"> ${cheeses.map((cheese) => renderTemplate`${renderComponent($$result2, "CheeseCard", $$CheeseCard, { ...cheese })}`)} </div> </div> </section>  <section class="section-padding bg-white"> <div class="max-w-4xl mx-auto px-6 md:px-8 text-center"> <h2 class="mb-6">Inte helt säker?</h2> <p class="text-lg text-dark-brown/80 mb-8">
Ring Jonte direkt eller besök oss för en ostprovning. Han älskar att prata om ost.
        Det är faktiskt det enda han vill prata om.
</p> <a href="/kontakt" class="btn-primary">
Kontakta oss för provning
</a> </div> </section> ` })}`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/produkterna.astro", void 0);

const $$file = "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/produkterna.astro";
const $$url = "/produkterna";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Produkterna,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
