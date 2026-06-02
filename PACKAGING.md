# Packaging — How to build the ZIP for Gumroad

This file is for **you (the seller)**, not the buyer. Use it to assemble
the ZIP that gets uploaded to Gumroad.

---

## What MUST be inside the buyer ZIP

```
RumaRuma-Template-v1.0.0.zip
├── public/                  ← assets (favicon, robots.txt, _redirects, images)
├── src/                     ← all React code
├── .env.example
├── .gitignore
├── .nvmrc
├── BUYER-README.md          ← buyer's quickstart
├── CHANGELOG.md
├── DEPLOYMENT.md
├── IMAGE-CREDITS.md
├── LICENSE.md               ← commercial license — REQUIRED
├── README.md                ← developer reference
├── index.html
├── jsconfig.json
├── netlify.toml
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

## What MUST NOT be inside the buyer ZIP

| Path                  | Why exclude                                          |
| --------------------- | ---------------------------------------------------- |
| `node_modules/`       | ~300 MB, buyer runs `npm install` to rebuild         |
| `dist/`               | Your build output, not buyer's                       |
| `.env`                | Your local secrets                                   |
| `.env.local`, `.env.*.local` | Local overrides                                |
| `.git/`               | Your git history may contain private commits         |
| `.vscode/`, `.idea/`  | Personal editor settings                             |
| `marketing/`          | Your sales material (covers, scripts, listing copy)  |
| `PACKAGING.md`        | This file (seller-only)                              |
| `*.log`, `npm-debug.log*` | Build noise                                      |
| `.DS_Store`, `Thumbs.db` | OS metadata                                       |
| `preview.log`         | Local test logs                                      |
| `analyze*.js`, `analyze*.mjs` | Seller utility scripts (data analysis)       |
| `replace_images.cjs`, `update_products.cjs` | Seller utility scripts (data migration) |

---

## One-shot build script

Run from project root:

### macOS / Linux

```bash
#!/usr/bin/env bash
set -e

VERSION="v1.0.0"
NAME="RumaRuma-Template-${VERSION}"
OUT_DIR="../${NAME}"
ZIP_FILE="../${NAME}.zip"

# 1. Verify the build works
echo "→ Verifying build..."
npm install
npm run build

# 2. Stage files into a clean copy
echo "→ Staging files into ${OUT_DIR}..."
rm -rf "${OUT_DIR}" "${ZIP_FILE}"
mkdir -p "${OUT_DIR}"

rsync -av \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.git' \
  --exclude='.env' \
  --exclude='.env.*' \
  --exclude='.vscode' \
  --exclude='.idea' \
  --exclude='marketing' \
  --exclude='PACKAGING.md' \
  --exclude='analyze*.js' \
  --exclude='analyze*.mjs' \
  --exclude='replace_images.cjs' \
  --exclude='update_products.cjs' \
  --exclude='make-package.sh' \
  --exclude='make-package.ps1' \
  --exclude='*.log' \
  --exclude='.DS_Store' \
  --exclude='Thumbs.db' \
  ./ "${OUT_DIR}/"

# 3. Zip it
echo "→ Creating ZIP..."
cd ..
zip -r "${NAME}.zip" "${NAME}" -x "*.DS_Store"

# 4. Report
echo ""
echo "✓ Done. Upload this file to Gumroad:"
echo "  $(pwd)/${NAME}.zip"
ls -lh "${NAME}.zip"
```

Save as `make-package.sh`, then:

```bash
chmod +x make-package.sh
./make-package.sh
```

### Windows PowerShell

```powershell
$Version = "v1.0.0"
$Name    = "RumaRuma-Template-$Version"
$OutDir  = "..\$Name"
$ZipFile = "..\$Name.zip"

# 1. Verify build
Write-Host "→ Verifying build..."
npm install
npm run build

# 2. Stage
Write-Host "→ Staging..."
if (Test-Path $OutDir)  { Remove-Item -Recurse -Force $OutDir }
if (Test-Path $ZipFile) { Remove-Item -Force $ZipFile }

$Exclude = @(
  "node_modules", "dist", ".git", ".env", ".env.*",
  ".vscode", ".idea", "marketing", "PACKAGING.md",
  "*.log", ".DS_Store", "Thumbs.db"
)

# Use robocopy for exclusion-friendly copy
robocopy . $OutDir /E `
  /XD node_modules dist .git .vscode .idea marketing `
  /XF .env .env.* PACKAGING.md *.log .DS_Store Thumbs.db `
      analyze.js analyze_products.js analyze_products.mjs `
      replace_images.cjs update_products.cjs `
      make-package.sh make-package.ps1
# robocopy exit 0-7 = success, >=8 = error
if ($LASTEXITCODE -ge 8) { exit 1 }

# 3. Zip
Write-Host "→ Creating ZIP..."
Compress-Archive -Path $OutDir -DestinationPath $ZipFile -CompressionLevel Optimal

# 4. Report
Write-Host ""
Write-Host "✓ Done. Upload this file to Gumroad:"
Write-Host "  $((Get-Item $ZipFile).FullName)"
Get-Item $ZipFile | Format-Table Name, Length
```

Save as `make-package.ps1`, then:

```powershell
.\make-package.ps1
```

---

## Pre-upload checklist

After building the ZIP, before clicking Upload:

- [ ] ZIP size is ~500 KB – 2 MB (without `node_modules`)
- [ ] Unzip into a separate folder somewhere and:
  - [ ] `npm install` succeeds
  - [ ] `npm run dev` opens at http://localhost:5173 with no console errors
  - [ ] `npm run build` succeeds
  - [ ] `LICENSE.md`, `BUYER-README.md`, `CHANGELOG.md`,
        `DEPLOYMENT.md`, `IMAGE-CREDITS.md`, `README.md` all present
  - [ ] No `.env`, `.git/`, `marketing/`, `node_modules/`, `dist/`
        inside
  - [ ] No personal contact info anywhere
        (`grep -ri "halo@\|+62 21 1234\|Kemang Selatan" .`)
- [ ] Filename is descriptive:
      `RumaRuma-Template-v1.0.0.zip` not `archive (3).zip`
- [ ] Demo deployed to public URL and link verified
- [ ] Cover image + 5+ screenshots ready
- [ ] Gumroad listing description copied from
      `marketing/GUMROAD-LISTING.md`
- [ ] Pricing decided
- [ ] After-purchase email customized (see `GUMROAD-LISTING.md` section 6)

---

## After the first sale

- [ ] Reply to first 5 buyers within 24h to gather feedback
- [ ] Ask happy buyers to leave a Gumroad review
- [ ] Track common questions → add to FAQ section of listing
- [ ] Consider follow-up "extended license" or "agency pack" tier

Happy shipping.
