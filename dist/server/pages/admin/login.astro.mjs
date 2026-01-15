/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, n as renderScript } from '../../chunks/astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import { $ as $$MainLayout, a as $$Hero } from '../../chunks/Hero_DzQjJp9l.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Admin Inloggning" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "title": "Admin Login", "subtitle": "Logga in f\xF6r att hantera ostar och inneh\xE5l" })} ${maybeRenderHead()}<section class="section-padding bg-white"> <div class="max-w-md mx-auto"> <div class="card bg-cream border-2 border-dark-green"> <h2 class="text-2xl font-display font-bold text-dark-brown mb-6">
Logga in
</h2> <form id="login-form" class="space-y-4"> <div> <label for="username" class="block text-sm font-semibold text-dark-brown mb-2">
Användarnamn
</label> <input type="text" id="username" name="username" required class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown" placeholder="admin"> </div> <div> <label for="password" class="block text-sm font-semibold text-dark-brown mb-2">
Lösenord
</label> <input type="password" id="password" name="password" required class="w-full px-4 py-2 rounded-lg border-2 border-dark-brown/20 focus:border-dark-green focus:outline-none text-dark-brown" placeholder="••••••••"> </div> <div id="error-message" class="hidden bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> <p id="error-text"></p> </div> <button type="submit" class="w-full bg-dark-green text-cream px-4 py-3 rounded-lg font-bold hover:bg-dark-green/90 transition-colors">
Logga in
</button> </form> <p class="text-xs text-dark-brown/50 mt-4 text-center">
Om du inte har ett konto, kontakta Jonte för att få ett skapat.
</p> </div> </div> </section> ${renderScript($$result2, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/login.astro", void 0);

const $$file = "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
