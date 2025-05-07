import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import sharp from "sharp";
import yaml from "yaml";

// Settings
const CONFIG_PATH = resolve("public/config.yaml");
const PUBLIC_DIR = resolve("public");
const OUTPUT_PATH = resolve("public/favicon.svg");
const FAVICON_SIZE = 64;

interface Config {
  avatar?: string;
}

function parseConfig(): Config | null {
  try {
    const raw = readFileSync(CONFIG_PATH, "utf-8");
    return yaml.parse(raw);
  } catch (err) {
    console.error("❌ Failed to read config.yaml:", err);
    return null;
  }
}

async function generateFavicon(inputPath: string) {
  const size = FAVICON_SIZE;

  // 1. Create a circular mask as a raw SVG buffer
  const roundedSvg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${size / 2}" ry="${size / 2}" />
    </svg>`,
  );

  // 2. Resize and apply the mask
  const roundedPngBuffer = await sharp(inputPath)
    .resize(size, size)
    .composite([
      {
        input: roundedSvg,
        blend: "dest-in", // mask the image
      },
    ])
    .png()
    .toBuffer();

  // 3. Wrap the masked PNG in an SVG for favicon usage
  const base64 = roundedPngBuffer.toString("base64");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <image href="data:image/png;base64,${base64}" width="${size}" height="${size}" />
    </svg>
  `.trim();

  writeFileSync(OUTPUT_PATH, svg);
  console.log(
    `✅ Generated rounded favicon.svg from: ${inputPath.replace(PUBLIC_DIR + "/", "")}`,
  );
}

async function run() {
  const config = parseConfig();
  if (!config || !config.avatar) {
    console.error("❌ No avatar defined in config.yaml.");
    process.exit(1);
  }

  const avatarRelativePath = config.avatar.replace(/^\/+/, "");
  const avatarPath = resolve(PUBLIC_DIR, avatarRelativePath);
  await generateFavicon(avatarPath);
}

run();
