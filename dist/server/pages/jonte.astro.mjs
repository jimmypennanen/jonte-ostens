/* empty css                                */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$MainLayout, a as $$Hero } from '../chunks/Hero_DzQjJp9l.mjs';
export { renderers } from '../renderers.mjs';

const $$Jonte = createComponent(($$result, $$props, $$slots) => {
  const timeline = [
    { year: "1987", event: "Jonte f\xF6ds (eller dyker upp fr\xE5n n\xE5gonstans)" },
    { year: "2003", event: "Jonte \xE4ter ost f\xF6r f\xF6rsta g\xE5ngen. Livet \xE4ndras f\xF6r alltid." },
    { year: "2008", event: "Jonte b\xF6rjar experimentera med att g\xF6ra egen ost i k\xE4llaren" },
    { year: "2015", event: "F\xF6rsta officiella ostprovningen. 47 personer n\xE4rvarar." },
    { year: "2018", event: 'Jontes Ostbutik \xF6ppnar officiellt. Media kallar det "Det b\xE4sta som h\xE4nt Uppsala"' },
    { year: "2024", event: "Jonte \xE4r nu en legend. N\xE4stan. Lite." }
  ];
  const facts = [
    "Jonte \xE4ter ungef\xE4r 2 kg ost per dag",
    "Han har gjort ett l\xF6fte att aldrig \xE4ta annan mat igen (ost \xE4r mat)",
    "Jonte kan smaka skillnad mellan ostar fr\xE5n tv\xE5 olika dagar",
    "Han talar flytande ostiska (en spr\xE5k vi inte helt f\xF6rst\xE5r)",
    "Jonte sover bara 3 timmar per natt. Resten av tiden t\xE4nker han p\xE5 ost",
    "Hans dr\xF6m \xE4r att sm\xE4lta ihop all v\xE4rldens ost till en superost"
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Jonte" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "title": "Legenden om Jonte Osten", "subtitle": "Fr\xE5n vanlig m\xE4nniska till ostprofet \u2014 En sann historia (inte helt)" })}  ${maybeRenderHead()}<section class="section-padding bg-cream"> <div class="max-w-4xl mx-auto px-6 md:px-8"> <h2 class="mb-8">Hur allt började</h2> <div class="card mb-8"> <p class="text-dark-brown/80 leading-relaxed mb-4">
Det var en helt vanlig dag när Jonte, en helt okänd person som jobbade på en helt okänd kontorsplats, tog
          en tugga av en hårdost han hittat i pausrummet.
</p> <p class="text-dark-brown/80 leading-relaxed mb-4">
Den minutens upplysning förändrade allt. Hans karriär, hans relationer, hans mat - allt försvann bakom en
          dörr märkt "OST".
</p> <p class="text-dark-brown/80 leading-relaxed">
Nu, många år senare, är Jonte något helt annat. Han är en man med en vision. En man med ett syfte.
          En man som bara älskar ost.
</p> </div> </div> </section>  <section class="section-padding bg-white"> <div class="max-w-4xl mx-auto px-6 md:px-8"> <h2 class="mb-12">Jontes ostresa</h2> <div class="space-y-6"> ${timeline.map((item) => renderTemplate`<div class="flex gap-6 items-start"> <div class="flex-shrink-0"> <div class="flex items-center justify-center h-12 w-12 rounded-full bg-dark-green text-cream font-bold text-sm"> ${item.year.substring(2)} </div> </div> <div class="flex-grow pt-1"> <p class="font-medium text-dark-brown">${item.year}</p> <p class="text-dark-brown/70 mt-1">${item.event}</p> </div> </div>`)} </div> </div> </section>  <section class="section-padding bg-dark-green text-cream"> <div class="max-w-4xl mx-auto px-6 md:px-8 text-center"> <blockquote class="text-2xl md:text-3xl font-display italic mb-6">
"Ost är inte en produkt. Det är en resa."
</blockquote> <p class="text-cream/80">— Jonte</p> </div> </section>  <section class="section-padding bg-cream"> <div class="max-w-4xl mx-auto px-6 md:px-8"> <h2 class="mb-12">Roliga fakta om Jonte</h2> <div class="grid md:grid-cols-2 gap-6"> ${facts.map((fact) => renderTemplate`<div class="card"> <p class="text-dark-brown/80">✓ ${fact}</p> </div>`)} </div> </div> </section>  <section class="section-padding bg-soft-yellow"> <div class="max-w-4xl mx-auto px-6 md:px-8 text-center"> <h2 class="mb-6">Vill du träffa Jonte?</h2> <p class="text-dark-brown/80 mb-8">
Jonte är inte alltid tillgänglig, men när han är det kan du ofta hitta honom på ostbutiken.
        Han gillar besökare. Speciellt om de vill prata om ost.
</p> <a href="/kontakt" class="btn-primary">
Boka tid
</a> </div> </section> ` })}`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/jonte.astro", void 0);

const $$file = "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/jonte.astro";
const $$url = "/jonte";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Jonte,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
