const fs = require("fs");
const content = fs.readFileSync("src/data/products.js", "utf8");

// Extract products array
const arrayMatch = content.match(/export const products = (\[[\s\S]*\]);/);
if (!arrayMatch) {
  console.log("Could not find products array");
  process.exit(1);
}

const arrayStr = arrayMatch[1];
let jsonStr = arrayStr;

// Fix underscore numbers
jsonStr = jsonStr.replace(/(\d)_(\d)/g, "$1$2");

// Fix trailing commas
jsonStr = jsonStr.replace(/,(\s*[}\]])/g, "$1");

const products = JSON.parse(jsonStr);
console.log("Total products: " + products.length);

let bestseller = 0;
let isNew = 0;
let promo = 0;
let missingImages = [];
let emptyImages = [];

products.forEach(p => {
  if (p.isBestseller === true) bestseller++;
  if (p.isNew === true) isNew++;
  if (p.originalPrice && p.price && p.originalPrice > p.price) promo++;
  
  if (!p.images) {
    missingImages.push(p.id);
  } else if (Array.isArray(p.images) && p.images.length === 0) {
    emptyImages.push(p.id);
  }
});

console.log("\n=== ANALYSIS RESULTS ===");
console.log("isBestseller: true - " + bestseller);
console.log("isNew: true - " + isNew);
console.log("Promo (originalPrice > price) - " + promo);
console.log("Missing images array - " + missingImages.length);
console.log("Empty images array - " + emptyImages.length);

if (missingImages.length > 0) {
  console.log("\nMissing images (ID): " + missingImages.join(", "));
}
if (emptyImages.length > 0) {
  console.log("Empty images (ID): " + emptyImages.join(", "));
}
