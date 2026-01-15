/* empty css                                */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, n as renderScript } from '../chunks/astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$MainLayout, a as $$Hero } from '../chunks/Hero_DzQjJp9l.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Kontakt = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Kontakt" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "title": "Kontakta Jonte", "subtitle": "Vi \xE4r h\xE4r f\xF6r din ostresa" })} ${maybeRenderHead()}<section class="section-padding bg-white"> <div class="max-w-6xl mx-auto px-6 md:px-8"> <div class="grid lg:grid-cols-2 gap-12"> <!-- Contact Form --> <div> <h2 class="text-3xl font-display font-bold text-dark-brown mb-2">
Skicka ett meddelande
</h2> <p class="text-dark-brown/60 mb-8">
Fyll i formuläret nedan och vi kontaktar dig så snart Jonte är klar med sin ost.
</p> <form id="contact-form" class="space-y-6"> <!-- Success Message --> <div id="success-message" class="hidden bg-green-100 border-l-4 border-green-500 text-green-700 p-4"> <p>Tack för ditt meddelande! Vi kontaktar dig så snart Jonte är klar med sin ost.</p> </div> <!-- Error Message --> <div id="error-message" class="hidden bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> <p id="error-text"></p> </div> <!-- Name Field --> <div> <label for="name" class="block text-sm font-semibold text-dark-brown mb-2">
Namn
</label> <input type="text" id="name" name="name" required class="w-full px-4 py-3 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown placeholder-dark-brown/40" placeholder="Ditt namn"> </div> <!-- Email Field --> <div> <label for="email" class="block text-sm font-semibold text-dark-brown mb-2">
E-post
</label> <input type="email" id="email" name="email" required class="w-full px-4 py-3 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown placeholder-dark-brown/40" placeholder="din@epost.se"> </div> <!-- Subject Field --> <div> <label for="subject" class="block text-sm font-semibold text-dark-brown mb-2">
Ämne
</label> <select id="subject" name="subject" class="w-full px-4 py-3 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown"> <option value="reservation">Reservation av ost</option> <option value="inquiry">Allmän fråga</option> <option value="feedback">Feedback om ost</option> <option value="complaint">En ost-relaterad klagan</option> <option value="other">Något annat</option> </select> </div> <!-- Message Field --> <div> <label for="message" class="block text-sm font-semibold text-dark-brown mb-2">
Meddelande
</label> <textarea id="message" name="message" required${addAttribute(6, "rows")} class="w-full px-4 py-3 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown placeholder-dark-brown/40 resize-none" placeholder="Berätta om ditt ostäventyr..."></textarea> </div> <!-- Submit Button --> <button type="submit" id="submit-btn" class="w-full bg-dark-green text-cream px-6 py-4 rounded-lg font-bold text-lg hover:bg-dark-green/90 transition-colors">
Skicka meddelande
</button> </form> <p class="text-xs text-dark-brown/50 mt-4 text-center">
Vi svarar normalt inom 24 timmar (eller när Jonte mår bra)
</p> ${renderScript($$result2, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/kontakt.astro?astro&type=script&index=0&lang.ts")} </div> <!-- Contact Info --> <div class="space-y-8"> <!-- Phone --> <div class="bg-cream rounded-2xl p-8 border-2 border-soft-yellow"> <h3 class="text-xl font-display font-bold text-dark-brown mb-4">
📞 Ring Jonte
</h3> <p class="text-dark-brown/70 mb-4">
Ring när som helst, men han svarar bara när han äter ost (vilket är alltid).
</p> <a href="tel:+46123456789" class="text-2xl font-bold text-dark-green hover:underline">
+46 (1) 23 45 67 89
</a> <p class="text-xs text-dark-brown/50 mt-4">
Han kan inte garantera att han låter sin telefon känna smak.
</p> </div> <!-- Address --> <div class="bg-soft-yellow rounded-2xl p-8"> <h3 class="text-xl font-display font-bold text-dark-brown mb-4">
📍 Besök oss
</h3> <p class="text-dark-brown/70 mb-4">
Jontes Ostbutik är placerad på en hemlig plats i Sverige, nåbar endast genom ostens guider.
</p> <div class="text-dark-brown font-semibold"> <p>Somewhere in Sweden</p> <p>Ostvägen 42</p> <p>Ostland, SE-99999</p> </div> </div> <!-- Hours --> <div class="bg-dark-green/10 rounded-2xl p-8"> <h3 class="text-xl font-display font-bold text-dark-brown mb-4">
🕐 Öppettider
</h3> <div class="space-y-2 text-dark-brown/70"> <p><span class="font-semibold">Mån–Fre:</span> När Jonte mår bra</p> <p><span class="font-semibold">Lördag:</span> Ibland, kanske</p> <p><span class="font-semibold">Söndag:</span> Aldrig, det är helg</p> <p><span class="font-semibold">Helgdagar:</span> Varför skulle man behöva ost då?</p> </div> </div> <!-- Fun Fact --> <div class="bg-white border-2 border-dark-brown rounded-2xl p-8"> <p class="text-lg font-display italic text-dark-brown mb-4">
"Jonte svarar på e-post medan han äter. Ibland är hans svar bara 'mmmmmm', men vi förstår budskapet."
</p> <p class="text-sm text-dark-brown/60">
— Ett känt faktum
</p> </div> </div> </div> </div> </section>  <section class="section-padding bg-cream"> <div class="max-w-6xl mx-auto px-6 md:px-8"> <h2 class="text-3xl font-display font-bold text-dark-brown mb-8 text-center">
Var är vi?
</h2> <div class="bg-dark-brown/10 rounded-2xl aspect-video flex items-center justify-center border-2 border-dark-brown/20"> <div class="text-center"> <p class="text-4xl mb-4">🗺️</p> <p class="text-dark-brown/60 font-semibold">
Här skulle en interaktiv karta kunna vara,<br>men Jonte tycker Google Maps inte förstår hans plats.
</p> </div> </div> </div> </section>  <section class="section-padding bg-white"> <div class="max-w-4xl mx-auto px-6 md:px-8"> <h2 class="text-3xl font-display font-bold text-dark-brown mb-12 text-center">
Vanliga frågor
</h2> <div class="space-y-6"> <!-- FAQ Item 1 --> <div class="bg-cream rounded-2xl p-8"> <h3 class="text-xl font-display font-bold text-dark-brown mb-3">
Hur långt förvärt levererar ni?
</h3> <p class="text-dark-brown/70">
Vi levererar till nästan överallt i Sverige, så länge Jonte tycker det är värt besväret. Ibland gör han det, ibland gör han det inte. Det är en mening.
</p> </div> <!-- FAQ Item 2 --> <div class="bg-cream rounded-2xl p-8"> <h3 class="text-xl font-display font-bold text-dark-brown mb-3">
Vad kostar en portion?
</h3> <p class="text-dark-brown/70">
Det beror på vilken ost. Det beror också på Jontes humör. Det beror på mycket.
</p> </div> <!-- FAQ Item 3 --> <div class="bg-cream rounded-2xl p-8"> <h3 class="text-xl font-display font-bold text-dark-brown mb-3">
Kan jag byta en ost om jag inte gillar den?
</h3> <p class="text-dark-brown/70">
Det betyder att du inte förstår ost. Men ja, kontakta Jonte och snäll förklara varför du inte gillar den. Han kommer att klaga på dig under många år.
</p> </div> <!-- FAQ Item 4 --> <div class="bg-cream rounded-2xl p-8"> <h3 class="text-xl font-display font-bold text-dark-brown mb-3">
Varför heter det Jontes Ostbutik?
</h3> <p class="text-dark-brown/70">
För att det är Jontes ost, och Jonte säljer det. Det är faktiskt helt logiskt om man tänker på det.
</p> </div> </div> </div> </section>  <section class="section-padding bg-dark-green text-cream"> <div class="max-w-4xl mx-auto px-6 md:px-8 text-center"> <h2 class="text-3xl md:text-4xl font-display font-bold mb-6">
Redo för din ostresa?
</h2> <p class="text-lg text-cream/90 mb-8">
Det spelar ingen roll. Jonte är redo för din.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/" class="bg-cream text-dark-green px-8 py-3 rounded-lg font-bold hover:bg-soft-yellow transition-colors">
Tillbaka till hem
</a> <a href="/produkterna" class="bg-dark-green/70 text-cream px-8 py-3 rounded-lg font-bold hover:bg-dark-green/90 transition-colors border border-cream">
Se alla ostar
</a> </div> </div> </section> ` })}`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/kontakt.astro", void 0);

const $$file = "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/kontakt.astro";
const $$url = "/kontakt";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Kontakt,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
