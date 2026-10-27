// Česká typografie: jednopísmenné předložky a spojky nenechávat na konci řádku,
// nezlomitelná mezera v číslech (3 500) a mezi číslem a jednotkou (Kč, %, min, h).
const re = /(^|[\s(„])([aikosuvzAIKOSUVZ])\s+/g;
const num = /(\d) (?=\d{3}(?!\d))/g;
const unit = /(\d) (?=(?:Kč|%|min|h|ml|°C)(?!\p{L}))/gu;
export const cz = (s: string) => s.replace(num, '$1 ').replace(unit, '$1 ').replace(re, '$1$2 ').replace(re, '$1$2 ');
