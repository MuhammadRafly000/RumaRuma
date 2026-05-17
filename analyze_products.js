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

try {
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
  console.log("Products with isBestseller: true = " + bestseller);
  console.log("Products with isNew: true = " + isNew);
  console.log("Products with promo (originalPrice > price) = " + promo);
  console.log("Products with missing images array = " + missingImages.length);
  console.log("Products with empty images array = " + emptyImages.length);

  if (missingImages.length > 0) {
    console.log("\nProduct IDs with missing images array: " + missingImages.join(", "));
  }
  if (emptyImages.length > 0) {
    console.log("Product IDs with empty images array: " + emptyImages.join(", "));
  }
} catch(e) {
  console.log("Error: " + e.message);
  console.log("First 500 chars: " + arrayStr.substring(0, 500));
}
