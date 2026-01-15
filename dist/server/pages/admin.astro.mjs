/* empty css                                */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_B3d8O62l.mjs';
import { a as getCheeses, c as getAllTestimonials, b as getContactMessages, d as getCurrentWeeklyCheese } from '../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const cheeses = getCheeses();
  const testimonials = getAllTestimonials();
  const messages = getContactMessages();
  const currentWeeklyCheese = getCurrentWeeklyCheese();
  const unreadMessages = messages.filter((m) => m.is_read === 0).length;
  const unapprovedTestimonials = testimonials.filter((t) => t.is_approved === 0).length;
  const recentMessages = messages.slice(0, 5);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard", "currentPath": "/admin" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <h1 class="text-4xl font-display font-bold text-dark-brown mb-8">
Dashboard
</h1> <!-- Stats Grid --> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"> <!-- Total Cheeses --> <div class="card bg-gradient-to-br from-soft-yellow to-light-green"> <p class="text-sm text-dark-brown/70 font-semibold mb-2">Totalt ostar</p> <p class="text-4xl font-bold text-dark-brown">${cheeses.length}</p> </div> <!-- Unread Messages --> <div class="card bg-gradient-to-br from-dark-green/10 to-light-green/20"> <p class="text-sm text-dark-brown/70 font-semibold mb-2">Olästa meddelanden</p> <p class="text-4xl font-bold text-dark-green">${unreadMessages}</p> ${unreadMessages > 0 && renderTemplate`<p class="text-xs text-dark-brown/60 mt-2">
Från totalt ${messages.length} meddelanden
</p>`} </div> <!-- Pending Testimonials --> <div class="card bg-gradient-to-br from-soft-yellow/30 to-dark-brown/10"> <p class="text-sm text-dark-brown/70 font-semibold mb-2">Väntande testimonials</p> <p class="text-4xl font-bold text-dark-brown">${unapprovedTestimonials}</p> ${unapprovedTestimonials > 0 && renderTemplate`<p class="text-xs text-dark-brown/60 mt-2">
Från totalt ${testimonials.length} testimonials
</p>`} </div> <!-- Active Weekly Cheese --> <div class="card bg-gradient-to-br from-cream to-beige"> <p class="text-sm text-dark-brown/70 font-semibold mb-2">Veckans ost</p> <p class="text-xl font-bold text-dark-brown truncate"> ${currentWeeklyCheese?.cheese_name || "Ingen vald"} </p> ${currentWeeklyCheese && renderTemplate`<p class="text-xs text-dark-brown/60 mt-1">
Vecka ${currentWeeklyCheese.week_number}/${currentWeeklyCheese.year} </p>`} </div> </div> <!-- Quick Actions --> <div class="card mb-12 border-2 border-dark-green/20"> <h2 class="text-2xl font-display font-bold text-dark-brown mb-6">
Snabba åtgärder
</h2> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4"> <a href="/admin/cheeses/new" class="btn-primary">
Lägg till ny ost
</a> <a href="/admin/weekly" class="btn-secondary">
Uppdatera veckans ost
</a> <a href="/admin/testimonials" class="btn-secondary">
Granska testimonials
</a> <a href="/admin/messages" class="btn-secondary">
Se meddelanden
</a> </div> </div> <!-- Recent Messages --> ${recentMessages.length > 0 && renderTemplate`<div class="card border-2 border-dark-brown/10"> <h2 class="text-2xl font-display font-bold text-dark-brown mb-6">
Senaste meddelanden
</h2> <div class="space-y-4"> ${recentMessages.map((msg) => renderTemplate`<div${addAttribute(`p-4 rounded-lg border-l-4 ${msg.is_read === 0 ? "bg-soft-yellow/30 border-soft-yellow" : "bg-cream border-dark-brown/10"}`, "class")}> <div class="flex justify-between items-start gap-4 mb-2"> <div> <p class="font-semibold text-dark-brown">${msg.name}</p> <p class="text-xs text-dark-brown/60">${msg.email}</p> </div> <span${addAttribute(`text-xs px-2 py-1 rounded-full font-semibold ${msg.is_read === 0 ? "bg-soft-yellow text-dark-brown" : "bg-dark-brown/10 text-dark-brown/70"}`, "class")}> ${msg.is_read === 0 ? "Ol\xE4st" : "L\xE4st"} </span> </div> <p class="text-sm text-dark-brown/80 mb-2"> <strong>Ämne:</strong> ${msg.subject} </p> <p class="text-sm text-dark-brown/70 line-clamp-2"> ${msg.message} </p> </div>`)} </div> <div class="mt-6"> <a href="/admin/messages" class="btn-primary">
Se alla meddelanden
</a> </div> </div>`} </div> ` })}`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/index.astro", void 0);

const $$file = "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
