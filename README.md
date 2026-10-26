# MySkin – web kosmetického studia

Nový web [myskin.cz](https://www.myskin.cz). Astro (statický výstup) + Vercel.

## Jak to funguje
- Každá změna nahraná do větve `main` se na Vercelu automaticky sestaví a zveřejní.
- Kontaktní údaje salonu jsou na jednom místě: `src/data/salon.ts`.
- Menu a odkazy v patičce: `src/data/navigace.ts`.
- Barvy a písmo: `src/styles/global.css`.
- Mapa všech URL (co zůstává, co se přesměruje, co je zrušené): `data/url-inventory.json`.
- Přesměrování 301: `vercel.json`.

## Příkazy (Node 24)
- `npm run dev` – vývojový server
- `npm run build` – sestavení do `dist/`
- `npm run qa` – kontrola SEO, odkazů, URL a strukturovaných dat nad `dist/`
- `npm run fetch-images` – stažení obrázků z původního webu (běží v GitHub Actions)
