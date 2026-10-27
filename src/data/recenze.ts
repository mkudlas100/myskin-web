// Skutečné recenze z Google profilu firmy (staženo 27. 10. 2026) a z původního webu.
// Jména zkrácená na jméno a iniciálu příjmení. Hodnocení neuvádět ve strukturovaných datech.
export const google = {
  rating: '4,9',
  count: 38,
  date: '27. 10. 2026',
  url: 'https://www.google.com/maps?cid=3124744777116543652',
};

export type Recenze = { text: string; name: string; topic: 'pmu' | 'plet' | 'rasy'; source: 'Google' | 'myskin.cz' };

export const recenze: Recenze[] = [
  { text: 'Minulý týden jsem již po druhé navštívila kosmetické studio My skin, byla jsem na permanentním make-upu obočí a musím říct, skvělé. Paní kosmetička byla jedním slovem úžasná a výsledek perfektní. Jsem spokojená. Salon klidný a čistý. Všem doporučuji.', name: 'Lenka K.', topic: 'pmu', source: 'Google' },
  { text: 'Chemický peeling – skvělá procedura, pleť krásně vyhlazená a vyživená!', name: 'Kateřina H.', topic: 'plet', source: 'Google' },
  { text: 'Byla jsem u Míši na kosmetice a jedním slovem ACH! Dokonalá masáž, pleť jsem měla jako miminko, fakt jsem byla spokojená. Krásně upravené obočí jako třešnička na dortu.', name: 'Kateřina J.', topic: 'plet', source: 'Google' },
  { text: 'Dostala jsem se do rukou paní kosmetičce Míše a musím napsat, že to byl úžasný zážitek. Je to profík na svém místě a svou pečlivostí si získala dalšího pravidelného zákazníka.', name: 'Petra P.', topic: 'plet', source: 'Google' },
  { text: 'Jsem naprosto spokojená. Příjemné, milé, čisté prostředí. Paní Míša, která mi dělala řasy, byla velice jemná, milá, hodná. Byla jsem poprvé v salonu i celkově na řasách a ráda se ukážu znovu!', name: 'Nikola S.', topic: 'rasy', source: 'Google' },
  { text: 'Byla jsem na permanentním make-upu obočí (pudr efekt) a musím říct, že co jsem byla předtím již 2× v životě jinde, od Kariny jsem si odnesla nejlepší výsledek.', name: 'Nelly K., Benešov', topic: 'pmu', source: 'myskin.cz' },
  { text: 'Byla jsem na permanentním make-upu obočí a jsem moc spokojená. Paní kosmetička je moc milá.', name: 'Martina T., Praha', topic: 'pmu', source: 'myskin.cz' },
  { text: 'MySkin navštěvuji delší dobu a nedám dopustit jak na pravidelné kosmetické ošetření, tak i na pudrové obočí, se kterým jsem neskutečně spokojená. Má přirozený tvar i barvu.', name: 'Petra K.', topic: 'pmu', source: 'myskin.cz' },
];
