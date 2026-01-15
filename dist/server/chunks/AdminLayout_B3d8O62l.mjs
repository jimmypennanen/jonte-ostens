import { e as createComponent, f as createAstro, o as renderHead, k as renderComponent, h as addAttribute, p as renderSlot, n as renderScript, r as renderTemplate } from './astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$Header } from './Header_C5rwjHVD.mjs';
/* empty css                        */

const $$Astro = createAstro();
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title, currentPath = "" } = Astro2.props;
  const { user } = Astro2.locals;
  return renderTemplate`<html lang="sv"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | Admin | Jontes Ostbutik</title><meta name="description" content="Admin panel - Jontes Ostbutik">${renderHead()}</head> <body class="flex flex-col min-h-screen bg-cream"> ${renderComponent($$result, "Header", $$Header, { "currentPath": currentPath })} <div class="flex flex-grow"> <!-- Sidebar Navigation --> <aside class="w-64 bg-dark-green text-cream shadow-lg sticky top-0 h-screen overflow-y-auto"> <div class="p-6 border-b border-cream/20"> <h2 class="text-2xl font-display font-bold">Admin Panel</h2> <p class="text-sm text-cream/70 mt-2">Hej ${user?.username || "Admin"}</p> </div> <nav class="p-4"> <ul class="space-y-2"> <li> <a href="/admin"${addAttribute(`block px-4 py-3 rounded-lg transition-colors ${currentPath === "/admin" || currentPath === "/admin/" ? "bg-cream text-dark-green font-semibold" : "hover:bg-cream/20"}`, "class")}>
📊 Dashboard
</a> </li> <li> <a href="/admin/cheeses"${addAttribute(`block px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith("/admin/cheeses") ? "bg-cream text-dark-green font-semibold" : "hover:bg-cream/20"}`, "class")}>
🧀 Ostar
</a> </li> <li> <a href="/admin/weekly"${addAttribute(`block px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith("/admin/weekly") ? "bg-cream text-dark-green font-semibold" : "hover:bg-cream/20"}`, "class")}>
⭐ Veckans Ost
</a> </li> <li> <a href="/admin/messages"${addAttribute(`block px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith("/admin/messages") ? "bg-cream text-dark-green font-semibold" : "hover:bg-cream/20"}`, "class")}>
💬 Meddelanden
</a> </li> <li> <a href="/admin/testimonials"${addAttribute(`block px-4 py-3 rounded-lg transition-colors ${currentPath.startsWith("/admin/testimonials") ? "bg-cream text-dark-green font-semibold" : "hover:bg-cream/20"}`, "class")}>
⭐ Testimonials
</a> </li> <li class="pt-4 mt-4 border-t border-cream/20"> <button id="logout-btn" class="w-full text-left px-4 py-3 rounded-lg hover:bg-cream/20 transition-colors flex items-center gap-2">
🚪 Logga ut
</button> </li> </ul> </nav> </aside> <!-- Main Content --> <main class="flex-grow"> <div class="p-6 md:p-8 max-w-7xl"> ${renderSlot($$result, $$slots["default"])} </div> </main> </div> ${renderScript($$result, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
