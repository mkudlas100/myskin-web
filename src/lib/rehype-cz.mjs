// Rehype plugin: česká typografie v textu Markdownu – nezlomitelná mezera za jednopísmennými
// předložkami a spojkami, v číslech (3 500) a mezi číslem a jednotkou (Kč, %, min, h).
const re = /(^|[\s(„])([aikosuvzAIKOSUVZ])\s+/g;
const num = /(\d) (?=\d{3}(?!\d))/g;
const unit = /(\d) (?=(?:Kč|%|min|h|ml|°C)(?!\p{L}))/gu;
export const czText = (s) => s.replace(num, '$1 ').replace(unit, '$1 ').replace(re, '$1$2 ').replace(re, '$1$2 ');
export default function rehypeCz() {
  const walk = (node, inCode) => {
    if (node.type === 'text' && !inCode) node.value = czText(node.value);
    if (node.children) node.children.forEach((c) => walk(c, inCode || node.tagName === 'code' || node.tagName === 'pre'));
  };
  return (tree) => walk(tree, false);
}
