# Úvod v2 – designový záměr (experiment, větev experiment-uvod)

## Námět
Malé studio v Benešově, jedna specialistka (Karina) a dvě kolegyně. Hlavní práce: pudrové obočí,
stínované rty, oční linky a péče o citlivou a problémovou pleť. Návštěvnice: ženy z Benešova a okolí,
které se rozhodují, komu svěří obličej. Úkol stránky: důvěra (skutečné místo, skutečná praxe) → rezervace.

## Výrazný prvek (jediný)
Pudrové obočí vykreslené z teček pigmentu. Hustota teček roste od začátku obočí ke konci – přesně tak
vzniká stínování při pudrové technice. Při načtení se pigment „nanese“ zleva doprava (jedna animace,
bez JS, vypnutá při prefers-reduced-motion). Menší varianty: rty a oční linka v seznamu PMU.

## Barvy
- kakao #3B2721 – text, tmavý pás (pigment tmavě hnědé barvy, ne tónovaná černá)
- pigment #6E4E43 – vedlejší text
- písek #EFD19F – značka, rezervační pás
- růžová pleť #F5E4DC – pás péče o pleť
- korál #FF9C86 – jen tečky rtů a dekor, nikdy text
- bílá #FFFFFF – základ (žádný krémový podklad)

## Písmo
Jedna rodina: Bricolage Grotesque (variabilní, osa opsz). Velké nadpisy opsz 96, těsné prostrkání,
tělo opsz 14, 17 px, řádkování 1,6. Stupnice 14 / 17 / 21 / 28 / 37 / 50 / 67.

## Layout
- Zarovnání vlevo, asymetrická mřížka 12 sloupců, žádné karty.
- Hero: vlevo obočí z teček, H1, věta od Kariny, rezervace; vpravo vysoká fotka ze studia.
- PMU: tři řádky (ilustrace z teček, název, jedna věta), celé řádky jsou odkazy.
- Pleť: velká fotka rukou při ošetření, citát Kariny, seznam ošetření.
- Karina: tmavý pás, fotka týmu, vzdělání jako časová osa (roky = skutečná posloupnost).
- Další služby, kurzy, e-shop: tři prosté seznamy.
- Studio: čtyři fotky v nepravidelné mřížce.
- Rezervace: pískový pás, motto, telefon, Noona.

## Revize proti šablonám
- Krémové pozadí + patkové písmo + terakota → bílá + písek + kakao, jedna grotesková rodina.
- Karty se stejným zaoblením a stínem → řádky a seznamy oddělené linkou, fotky bez stínů.
- Popisky velkými písmeny nad nadpisy → žádné.
- Řetězce s „·“ → oddělené řádky.
- Číslování 01/02/03 → jen roky na časové ose.
- Odhalování každé sekce při scrollu → odstraněno, jediná animace je obočí.
- Stock portrét a AI kresby → skutečné fotky ze studia, ilustrace jen z teček.
- Texty: jen fakta ze současného webu (o-mne, permanentni-make-up), nic o výdrži ani cenách.
