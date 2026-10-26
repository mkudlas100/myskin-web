# Pokyny pro Claude

- Projekt se řídí skilly **myskin-web** (rozhodnutí, mapa URL, hlas značky, design), **web-seo-ai** (SEO), **web-qa** (ověřování) a **web-stack** (Vercel, náklady). Před prací je načti.
- Astro 7 vyžaduje Node ≥ 22.23.4 (používáme 24, `.nvmrc`).
- Před každým push: `npm run build` a `npm run qa` musí projít bez chyb; vizuálně zkontrolovat screenshoty 390 a 1440 px.
- Všechny existující URL zachovat podle `data/url-inventory.json`. Žádné přesměrování na úvod.
- Kontaktní údaje jen v `src/data/salon.ts`. Fakta o salonu nevymýšlet, nechat potvrdit.
- Commity česky.
