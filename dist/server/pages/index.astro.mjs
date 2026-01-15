/* empty css                                */
import { e as createComponent, f as createAstro, m as maybeRenderHead, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$MainLayout, a as $$Hero } from '../chunks/Hero_DzQjJp9l.mjs';
import { $ as $$CheeseCard } from '../chunks/CheeseCard_EDc2Y-ob.mjs';
import 'clsx';
import { a as getCheeses, x as getApprovedTestimonials, d as getCurrentWeeklyCheese } from '../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Testimonial = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Testimonial;
  const { quote, author, role = "Ostkund" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="card"> <p class="text-dark-brown italic mb-4 leading-relaxed">
"${quote}"
</p> <div> <p class="font-medium text-dark-green">${author}</p> <p class="text-sm text-dark-brown/60">${role}</p> </div> </div>`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/components/Testimonial.astro", void 0);

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const allCheeses = getCheeses();
  const featuredCheeses = allCheeses.slice(0, 3);
  const testimonials = getApprovedTestimonials();
  const currentWeeklyCheese = getCurrentWeeklyCheese();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Hem" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Hero", $$Hero, { "title": "Jontes Ostbutik", "subtitle": "Ost s\xE5 bra att du b\xF6rjar ljuga f\xF6r familjen \u2014 En hyllning till Jonte Osten, den lokala ostprofeten", "cta": { text: "Visa ostarna", href: "#featured" } })}  ${maybeRenderHead()}<section class="section-padding bg-white"> <div class="max-w-7xl mx-auto px-6 md:px-8"> ${currentWeeklyCheese ? renderTemplate`<div class="card bg-gradient-to-br from-soft-yellow/50 to-light-green/50 border border-soft-yellow"> <div class="md:flex items-center justify-between"> <div> <h2 class="mb-2">🌟 Veckans Ost</h2> <p class="text-dark-brown/80 mb-4 md:mb-0"> <strong>${currentWeeklyCheese.cheese_name}</strong> — ${currentWeeklyCheese.description} </p> </div> <a href="/veckans-ost" class="btn-secondary whitespace-nowrap">
Läs mer
</a> </div> </div>` : renderTemplate`<div class="card bg-gradient-to-br from-soft-yellow/50 to-light-green/50 border border-soft-yellow"> <div class="md:flex items-center justify-between"> <div> <h2 class="mb-2">🌟 Veckans Ost</h2> <p class="text-dark-brown/80 mb-4 md:mb-0">
Ingen ost vald denna vecka. Kontakta Jonte för att välja denna veckas specialitet.
</p> </div> <a href="/veckans-ost" class="btn-secondary whitespace-nowrap">
Läs mer
</a> </div> </div>`} </div> </section>  <section id="featured" class="section-padding bg-cream"> <div class="max-w-7xl mx-auto px-6 md:px-8"> <h2 class="text-center mb-12">Mest älskade ostar</h2> <div class="grid md:grid-cols-3 gap-8"> ${featuredCheeses.map((cheese) => renderTemplate`${renderComponent($$result2, "CheeseCard", $$CheeseCard, { ...cheese })}`)} </div> <div class="text-center mt-12"> <a href="/produkterna" class="btn-primary">
Se alla produkter
</a> </div> </div> </section>  <section class="section-padding bg-white"> <div class="max-w-7xl mx-auto px-6 md:px-8"> <h2 class="text-center mb-12">Vad säger folk om Jonte?</h2> <div class="grid md:grid-cols-3 gap-8"> ${testimonials.map((testimonial) => renderTemplate`${renderComponent($$result2, "Testimonial", $$Testimonial, { ...testimonial })}`)} </div> </div> </section>  <section class="section-padding bg-dark-green text-cream"> <div class="max-w-4xl mx-auto px-6 md:px-8 text-center"> <h2 class="text-cream mb-6">Redo för en ostupplevelse?</h2> <p class="text-lg mb-8 text-cream/90">
Besök oss idag och möt Jonte. Han kan vara knapphändig, men hans ostar talar för sig själva.
</p> <a href="/kontakt" class="btn-secondary">
Kontakta oss
</a> </div> </section> ` })}`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/index.astro", void 0);

const $$file = "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
