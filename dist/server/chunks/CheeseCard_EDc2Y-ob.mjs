import { e as createComponent, f as createAstro, m as maybeRenderHead, r as renderTemplate } from './astro/server_CUZ8bU2-.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$CheeseCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CheeseCard;
  const { name, description, price, pairing } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="card"> <!-- Placeholder image --> <div class="bg-gradient-to-br from-soft-yellow to-light-green rounded-xl h-48 mb-4 flex items-center justify-center text-4xl">
🧀
</div> <h3 class="font-display text-lg font-bold text-dark-brown mb-2"> ${name} </h3> <p class="text-sm text-dark-brown/70 mb-3 leading-relaxed"> ${description} </p> <div class="space-y-2 text-sm"> <div class="flex justify-between items-center border-t border-beige pt-2"> <span class="font-medium text-dark-green">Pris:</span> <span class="font-display text-lg font-bold text-dark-brown">${price}</span> </div> <div class="text-xs text-dark-brown/60"> <strong>Passar till:</strong> ${pairing} </div> </div> </div>`;
}, "/Users/jimmypennanen/Documents/GitHub/jonte-osten/src/components/CheeseCard.astro", void 0);

export { $$CheeseCard as $ };
