import { e as createComponent, m as maybeRenderHead, r as renderTemplate, f as createAstro, o as renderHead, k as renderComponent, p as renderSlot, h as addAttribute } from './astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$Header } from './Header_C5rwjHVD.mjs';
import 'clsx';
/* empty css                        */

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-dark-brown text-cream border-t border-dark-green/30"> <div class="max-w-7xl mx-auto px-6 md:px-8 py-6"> <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"> <!-- Brand --> <div> <div class="flex items-center gap-2 mb-2"> <span class="text-xl">🧀</span> <span class="font-display font-bold text-sm">Jontes Ostbutik</span> </div> <p class="text-xs text-cream/70">
En ost för varje tillfälle
</p> </div> <!-- Quick Links --> <div> <h3 class="text-xs font-bold uppercase tracking-wide mb-2 text-soft-yellow">Meny</h3> <nav class="space-y-1 text-xs"> <a href="/" class="block text-cream/80 hover:text-cream transition-colors">Hem</a> <a href="/produkterna" class="block text-cream/80 hover:text-cream transition-colors">Produkterna</a> <a href="/kontakt" class="block text-cream/80 hover:text-cream transition-colors">Kontakt</a> </nav> </div> <!-- Info --> <div> <h3 class="text-xs font-bold uppercase tracking-wide mb-2 text-soft-yellow">Öppettider</h3> <p class="text-xs text-cream/80">
Mån–Fre: När Jonte mår bra<br>
Lör: Ibland<br>
Sön: Aldrig
</p> </div> </div> <!-- Copyright --> <div class="border-t border-dark-green/30 pt-4 text-center text-xs text-cream/60"> <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Jontes Ostbutik. Gjord med 💚 för Jonte.</p> </div> </div> </footer>`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/components/Footer.astro", void 0);

const $$Astro$1 = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`<html lang="sv"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | Jontes Ostbutik</title><meta name="description" content="Jontes Ostbutik - En parodi-ostbutik för Jonte Osten">${renderHead()}</head> <body class="flex flex-col min-h-screen"> ${renderComponent($$result, "Header", $$Header, { "currentPath": currentPath })} <main class="flex-grow"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/layouts/MainLayout.astro", void 0);

const $$Astro = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Hero;
  const { title, subtitle, cta } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="bg-gradient-to-br from-soft-yellow via-beige to-light-green/30 py-20 md:py-32"> <div class="max-w-7xl mx-auto px-6 md:px-8"> <div class="text-center mb-8"> <div class="text-6xl md:text-7xl mb-6">🧀</div> <h1 class="mb-4">${title}</h1> ${subtitle && renderTemplate`<p class="text-lg md:text-xl text-dark-brown/80 max-w-2xl mx-auto">${subtitle}</p>`} </div> ${cta && renderTemplate`<div class="flex justify-center"> <a${addAttribute(cta.href, "href")} class="btn-primary"> ${cta.text} </a> </div>`} </div> </section>`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/components/Hero.astro", void 0);

export { $$MainLayout as $, $$Hero as a };
