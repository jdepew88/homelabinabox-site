const sharp = require("sharp");

const files = [
  "public/images/homelab-in-a-box-logo.png",
  "public/images/architecture/architecture-traffic-flow.png",
  "public/images/architecture/home-feature-highlights.png"
];

async function main() {
  for (const file of files) {
    const out = file.replace(/\.png$/, ".webp");
    await sharp(file)
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    console.log(`${file} -> ${out}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
