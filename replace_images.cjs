const fs = require('fs');
const path = require('path');
const p = path.join('src', 'data', 'products.js');
let code = fs.readFileSync(p, 'utf8');

// Update img template
code = code.replace(
  /const img = \(id\) => `https:\/\/images\.unsplash\.com\/\$\{id\}\?auto=format&fit=crop&w=900&q=80`;/,
  'const img = (keyword) => `https://image.pollinations.ai/prompt/${encodeURIComponent(keyword)}?width=900&height=900&nologo=true`;'
);

// Define keyword replacements
const replacements = [
  { id: 'p-001', kw: ['sage green ceramic plate dinnerware minimalist top view', 'sage green ceramic plate table setting aesthetic', 'sage green ceramic plate close up texture'] },
  { id: 'p-002', kw: ['handmade ceramic cream bowl minimalist', 'cream stoneware bowl on wooden table', 'rustic handmade cream bowl soup'] },
  { id: 'p-003', kw: ['ribbed glass tumbler filled with water minimalist', 'clear ribbed glass tumbler aesthetic', 'ribbed glass tumbler on wooden table sunlight'] },
  { id: 'p-004', kw: ['sage green ceramic mug minimalist', 'sage green ceramic mug of coffee aesthetic', 'sage green ceramic mug lifestyle'] },
  { id: 'p-005', kw: ['japandi style ceramic teapot minimalist', 'japandi ceramic teapot with wooden coaster', 'minimalist aesthetic ceramic teapot on table'] },
  { id: 'p-006', kw: ['matte black stainless steel cutlery set', 'matte black cutlery spoon fork minimalist', 'matte black cutlery on dark table'] },
  { id: 'p-007', kw: ['cream wave shape ceramic vase minimalist', 'cream wavy ceramic vase with dried flowers', 'aesthetic cream ceramic vase on table'] },
  { id: 'p-008', kw: ['eucalyptus scented candle in sage green jar', 'soy wax candle in sage green ceramic pot', 'aromatherapy eucalyptus candle minimalist'] },
  { id: 'p-009', kw: ['glass storage jar with bamboo lid minimalist', 'glass pantry jars with bamboo lids', 'kitchen glass jar bamboo lid filled with pasta'] },
  { id: 'p-010', kw: ['sage green cotton linen kitchen apron flatlay', 'sage green linen apron minimalist', 'person wearing sage green linen apron cooking'] },
  { id: 'p-011', kw: ['small cast iron skillet 18cm top view', 'black cast iron pan minimalist kitchen', 'cast iron skillet on stove aesthetic'] },
  { id: 'p-012', kw: ['natural linen tablecloth texture', 'dining table covered with natural linen cloth', 'minimalist dining setting with linen tablecloth'] },
];

for (const rep of replacements) {
  const regex = new RegExp(`(id: '${rep.id}',[\\s\\S]*?images: \\[\n)(?:\\s*img\\([^)]+\\),\\n){3}`, 'g');
  const replacementImages = rep.kw.map(k => `      img('${k}'),\n`).join('');
  code = code.replace(regex, `$1${replacementImages}`);
}

fs.writeFileSync(p, code);
console.log('Done!');
