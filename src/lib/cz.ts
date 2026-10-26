// Česká typografie: jednopísmenné předložky a spojky nenechávat na konci řádku.
export const cz = (s: string) => s.replace(/(^|[\s(„])([aikosuvzAIKOSUVZ])\s+/g, '$1$2 ').replace(/(^|[\s(„])([aikosuvzAIKOSUVZ])\s+/g, '$1$2 ');
