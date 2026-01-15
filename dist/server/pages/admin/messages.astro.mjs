/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, n as renderScript, h as addAttribute } from '../../chunks/astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_B3d8O62l.mjs';
import { b as getContactMessages } from '../../chunks/index_lH4WeDz9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const messages = getContactMessages();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Kontaktmeddelanden", "currentPath": "/admin/messages" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <h1 class="text-3xl font-display font-bold text-dark-brown mb-8">
Kontaktmeddelanden
</h1> ${messages.length === 0 ? renderTemplate`<div class="card text-center py-12"> <p class="text-dark-brown/70">Inga meddelanden ännu</p> </div>` : renderTemplate`<div class="space-y-4"> ${messages.map((msg) => renderTemplate`<div${addAttribute(`card border-l-4 ${msg.is_read === 0 ? "bg-soft-yellow/30 border-soft-yellow" : "border-dark-brown/10"}`, "class")}> <div class="flex justify-between items-start gap-4 mb-4"> <div class="flex-grow"> <h3 class="text-lg font-semibold text-dark-brown">${msg.name}</h3> <p class="text-sm text-dark-brown/60">${msg.email}</p> <p class="text-xs text-dark-brown/50 mt-1"> ${new Date(msg.created_at).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })} </p> </div> <div class="flex items-center gap-2"> <span${addAttribute(`text-xs px-2 py-1 rounded-full font-semibold ${msg.is_read === 0 ? "bg-soft-yellow text-dark-brown" : "bg-dark-brown/10 text-dark-brown/70"}`, "class")}> ${msg.is_read === 0 ? "Ol\xE4st" : "L\xE4st"} </span> </div> </div> <div class="mb-4 pb-4 border-b border-dark-brown/10"> <p class="text-sm font-semibold text-dark-brown mb-2"> <strong>Ämne:</strong> ${msg.subject} </p> <p class="text-sm text-dark-brown/80 whitespace-pre-wrap"> ${msg.message} </p> </div> <div class="flex gap-2"> <button class="mark-btn px-3 py-1 bg-dark-green text-cream rounded text-sm font-semibold hover:bg-dark-green/90 transition-colors"${addAttribute(msg.id, "data-id")}${addAttribute(msg.is_read, "data-is-read")}> ${msg.is_read === 0 ? "Markera som l\xE4st" : "Markera som ol\xE4st"} </button> <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded text-sm font-semibold hover:bg-red-600 transition-colors"${addAttribute(msg.id, "data-id")}>
Ta bort
</button> </div> </div>`)} </div>`} </div> ${renderScript($$result2, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/messages/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/messages/index.astro", void 0);

const $$file = "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/messages/index.astro";
const $$url = "/admin/messages";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
