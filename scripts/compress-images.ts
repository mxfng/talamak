import { readdirSync, statSync, unlinkSync } from "fs";
import { join, resolve, extname, basename, dirname } from "path";
import sharp from "sharp";

const INPUT_DIR = resolve("public/images");
const OUTPUT_FORMAT = "webp";
const DELETE_ORIGINAL = false;
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png"];

async function compressImage(filePath: string) {
  const ext = extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.includes(ext)) return;

  const outputPath = join(
    dirname(filePath),
    `${basename(filePath, ext)}.${OUTPUT_FORMAT}`,
  );
  console.log(`📦 Compressing: ${filePath} → ${outputPath}`);

  try {
    await sharp(filePath)
      .toFormat(OUTPUT_FORMAT, { quality: 80 })
      .toFile(outputPath);

    if (DELETE_ORIGINAL) unlinkSync(filePath);
    console.log(`✅ Compressed to ${outputPath}`);
  } catch (err) {
    console.error(`❌ Failed to compress ${filePath}:`, err);
  }
}

function getAllImageFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  let files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files = files.concat(getAllImageFiles(fullPath));
    } else if (stat.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

async function run() {
  const files = getAllImageFiles(INPUT_DIR);
  console.log(`🔍 Found ${files.length} image(s)...`);

  for (const file of files) {
    await compressImage(file);
  }

  console.log("🎉 Compression complete.");
}

run();
