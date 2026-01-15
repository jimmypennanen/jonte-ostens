/* empty css                                */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$MainLayout, a as $$Hero } from '../chunks/Hero_DzQjJp9l.mjs';
import { d as getCurrentWeeklyCheese, e as getWeek, w as getPreviousWeeks } from '../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$VeckansOst = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VeckansOst;
  const currentWeeklyCheese = getCurrentWeeklyCheese();
  const currentWeek = getWeek(/* @__PURE__ */ new Date());
  const previousWeeksFromDb = getPreviousWeeks();
  if (!currentWeeklyCheese) {
    return Astro2.redirect("/");
  }
  const dontPairWith = JSON.parse(currentWeeklyCheese.dont_pair_with_json || "[]");
  const currentCheese = {
    name: currentWeeklyCheese.cheese_name,
    description: currentWeeklyCheese.description,
    whySelected: currentWeeklyCheese.why_selected,
    howToEat: currentWeeklyCheese.how_to_eat,
    dontPairWith,
    previousWeeks: previousWeeksFromDb.slice(0, 10).map((w) => ({
      week: `Vecka ${w.week_number}`,
      name: w.cheese_name,
      mood: w.mood_emoji
    }))
  };
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Veckans Ost" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "title": "Veckans Ost", "subtitle": "Jontes personliga urval" })}  ${maybeRenderHead()}<section class="section-padding bg-cream"> <div class="max-w-4xl mx-auto px-6 md:px-8"> <div class="grid lg:grid-cols-3 gap-12 items-start"> <!-- Main Content --> <div class="lg:col-span-2"> <div class="mb-8"> <h2 class="text-4xl md:text-5xl font-display font-bold text-dark-brown mb-2"> ${currentCheese.name} </h2> <p class="text-lg text-dark-brown/60">
Vecka ${currentWeek} av ${(/* @__PURE__ */ new Date()).getFullYear()} </p> </div> <!-- Cheese Emoji Display --> <div class="text-8xl mb-8 text-center md:text-left">
🧀
</div> <!-- Description --> <div class="prose prose-lg text-dark-brown/80 space-y-6 mb-12"> <p> ${currentCheese.description} </p> </div> <!-- Why Selected --> <div class="bg-soft-yellow/50 rounded-2xl p-8 mb-12 border-2 border-soft-yellow"> <h3 class="text-2xl font-display font-bold text-dark-brown mb-4">
Varför denna vecka?
</h3> <p class="text-dark-brown/80 leading-relaxed"> ${currentCheese.whySelected} </p> </div> <!-- How to Eat --> <div class="mb-12"> <h3 class="text-2xl font-display font-bold text-dark-brown mb-4">
Hur äter man denna ost?
</h3> <p class="text-dark-brown/80 leading-relaxed mb-4"> ${currentCheese.howToEat} </p> </div> <!-- Don't Pair With --> <div class="bg-dark-green/10 rounded-2xl p-8"> <h3 class="text-2xl font-display font-bold text-dark-brown mb-6">
PAIRA ALDRIG MED:
</h3> <ul class="space-y-3"> ${currentCheese.dontPairWith.map((item) => renderTemplate`<li class="flex items-start gap-3 text-dark-brown/80"> <span class="text-dark-green font-bold mt-1">✗</span> <span>${item}</span> </li>`)} </ul> </div> </div> <!-- Sidebar --> <div> <!-- Previous Weeks --> <div class="bg-white rounded-2xl p-6 shadow-md sticky top-8"> <h3 class="text-xl font-display font-bold text-dark-brown mb-6">
Tidigare veckor
</h3> <div class="space-y-4"> ${currentCheese.previousWeeks.map((week) => renderTemplate`<div class="pb-4 border-b border-dark-brown/10 last:border-b-0"> <p class="text-xs font-semibold text-dark-green uppercase tracking-wide"> ${week.week} </p> <p class="font-display font-bold text-dark-brown mt-1"> ${week.name} </p> <p class="text-2xl mt-2">${week.mood}</p> </div>`)} </div> </div> <!-- Fun Fact Box --> <div class="bg-soft-yellow rounded-2xl p-6 mt-6"> <p class="text-sm text-dark-brown/70 italic">
"Jonte äter denna ost varje dag denna vecka. Han bakar den, steker den, och äter den helt enkelt rå. Han är en konstnär."
</p> <p class="text-xs text-dark-brown/60 mt-4">
— Okänd källa
</p> </div> </div> </div> </div> </section>  <section class="section-padding bg-dark-green text-cream"> <div class="max-w-4xl mx-auto px-6 md:px-8 text-center"> <h2 class="text-3xl md:text-4xl font-display font-bold mb-6">
Vill du prova denna veckas ost?
</h2> <p class="text-lg text-cream/90 mb-8 max-w-2xl mx-auto">
Kontakta Jonte direkt för att reservera en portion av denna veckas utvalda ost.
</p> <a href="/kontakt" class="inline-block bg-cream text-dark-green px-8 py-4 rounded-lg font-bold hover:bg-soft-yellow transition-colors">
Reservera nu
</a> </div> </section> ` })}`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/veckans-ost.astro", void 0);

const $$file = "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/veckans-ost.astro";
const $$url = "/veckans-ost";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$VeckansOst,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
