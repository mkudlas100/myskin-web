// Rehype plugin: nezlomitelná mezera za jednopísmennými předložkami a spojkami v textu Markdownu.
const re = /(^|[\s(„])([aikosuvzAIKOSUVZ])\s+/g;
export default function rehypeCz() {
  const walk = (node, inCode) => {
    if (node.type === 'text' && !inCode) node.value = node.value.replace(re, '$1$2 ').replace(re, '$1$2 ');
    if (node.children) node.children.forEach((c) => walk(c, inCode || node.tagName === 'code' || node.tagName === 'pre'));
  };
  return (tree) => walk(tree, false);
}
