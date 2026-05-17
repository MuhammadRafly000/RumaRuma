const fs = require('fs');
const path = require('path');
const p = path.join('src', 'data', 'products.js');
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  /const img = \(keyword\) => \`https:\/\/image\.pollinations\.ai\/prompt\/\$\{encodeURIComponent\(keyword\)\}\?width=900&height=900&nologo=true\`;/,
  'const img = (id) => `/images/products/${id}.jpg`;'
);

const ids = [
  'p-001', 'p-002', 'p-003', 'p-004', 'p-005', 'p-006',
  'p-007', 'p-008', 'p-009', 'p-010', 'p-011', 'p-012'
];

ids.forEach(id => {
  const regex = new RegExp(`(id: '${id}',[\\s\\S]*?images: \\[\n)(?:\\s*img\\([^)]+\\),\\n){3}`, 'g');
  const replacementImages = `      img('${id}'),\n      img('${id}'),\n      img('${id}'),\n`;
  code = code.replace(regex, `$1${replacementImages}`);
});

fs.writeFileSync(p, code);
console.log('Updated products.js');
