import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BbyR2n3x.mjs';
import { manifest } from './manifest_Bu9ccdlT.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/cheeses/edit/_id_.astro.mjs');
const _page2 = () => import('./pages/admin/cheeses/new.astro.mjs');
const _page3 = () => import('./pages/admin/cheeses.astro.mjs');
const _page4 = () => import('./pages/admin/login.astro.mjs');
const _page5 = () => import('./pages/admin/messages.astro.mjs');
const _page6 = () => import('./pages/admin/testimonials.astro.mjs');
const _page7 = () => import('./pages/admin/weekly.astro.mjs');
const _page8 = () => import('./pages/admin.astro.mjs');
const _page9 = () => import('./pages/api/auth/login.astro.mjs');
const _page10 = () => import('./pages/api/auth/logout.astro.mjs');
const _page11 = () => import('./pages/api/auth/me.astro.mjs');
const _page12 = () => import('./pages/api/cheeses/_id_.astro.mjs');
const _page13 = () => import('./pages/api/cheeses.astro.mjs');
const _page14 = () => import('./pages/api/contact/submit.astro.mjs');
const _page15 = () => import('./pages/api/messages/_id_.astro.mjs');
const _page16 = () => import('./pages/api/messages.astro.mjs');
const _page17 = () => import('./pages/api/testimonials/_id_.astro.mjs');
const _page18 = () => import('./pages/api/testimonials.astro.mjs');
const _page19 = () => import('./pages/api/weekly/current.astro.mjs');
const _page20 = () => import('./pages/jonte.astro.mjs');
const _page21 = () => import('./pages/kontakt.astro.mjs');
const _page22 = () => import('./pages/produkterna.astro.mjs');
const _page23 = () => import('./pages/veckans-ost.astro.mjs');
const _page24 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin/cheeses/edit/[id].astro", _page1],
    ["src/pages/admin/cheeses/new.astro", _page2],
    ["src/pages/admin/cheeses/index.astro", _page3],
    ["src/pages/admin/login.astro", _page4],
    ["src/pages/admin/messages/index.astro", _page5],
    ["src/pages/admin/testimonials/index.astro", _page6],
    ["src/pages/admin/weekly/index.astro", _page7],
    ["src/pages/admin/index.astro", _page8],
    ["src/pages/api/auth/login.ts", _page9],
    ["src/pages/api/auth/logout.ts", _page10],
    ["src/pages/api/auth/me.ts", _page11],
    ["src/pages/api/cheeses/[id].ts", _page12],
    ["src/pages/api/cheeses/index.ts", _page13],
    ["src/pages/api/contact/submit.ts", _page14],
    ["src/pages/api/messages/[id].ts", _page15],
    ["src/pages/api/messages/index.ts", _page16],
    ["src/pages/api/testimonials/[id].ts", _page17],
    ["src/pages/api/testimonials/index.ts", _page18],
    ["src/pages/api/weekly/current.ts", _page19],
    ["src/pages/jonte.astro", _page20],
    ["src/pages/kontakt.astro", _page21],
    ["src/pages/produkterna.astro", _page22],
    ["src/pages/veckans-ost.astro", _page23],
    ["src/pages/index.astro", _page24]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/jimmypennanen/Documents/GitHub/jonte-osten/dist/client/",
    "server": "file:///Users/jimmypennanen/Documents/GitHub/jonte-osten/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
