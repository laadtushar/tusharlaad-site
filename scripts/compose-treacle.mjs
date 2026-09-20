/**
 * Compose the Treacle product shot from phone screenshots.
 *
 * Treacle is the one product here that cannot be driven headlessly: it is a
 * React Native app on the Play Store, not something Chromium can open. So its
 * shot is taken by hand on the phone and composed here instead of captured.
 *
 * Usage:
 *   node scripts/compose-treacle.mjs <dir-of-screenshots>
 *
 * The raw screenshots are deliberately NOT in this repo. They are from a live
 * TestFlight build on a real account, so they carry a name, a date of birth, an
 * email address and an answer about sexual orientation. Only the composed image,
 * which contains none of that, is committed.
 *
 * The crops below are doing privacy work, not composition work. Every panel is a
 * contiguous region of a real screenshot, chosen so the personal parts fall
 * outside it. Nothing is redacted, blurred or painted over: if a screen cannot be
 * cropped clear of personal data, it does not go in.
 *
 * Nothing is upscaled either. The sources are 273px wide and stay 273px wide, so
 * the type is as sharp here as it is on the phone, and the canvas is sized around
 * the panels rather than the panels stretched to fill a canvas.
 */

import sharp from "sharp";
import path from "node:path";

const dir = process.argv[2];
if (!dir) {
  console.error("usage: node scripts/compose-treacle.mjs <dir-of-screenshots>");
  process.exit(1);
}

const W = 1024;
const H = 640; // 16:10. See public/shots/README.md for why this one is not 1600.
const BG = { r: 0x12, g: 0x0b, b: 0x0c, alpha: 1 }; // the app's own near-black
const RULE = "#3a2b2e"; // a hairline, never a shadow

const PW = 273;
const COL_GAP = 44;
const ROW_GAP = 28;

/** The weekly match: the whole proposition in one screen, and no personal data on it. */
const hero = { file: "treacle_2.png", top: 52, height: 476 };

const stack = [
  /** Treacle opening the conversation. Ends before the name and the date of birth. */
  { file: "treacle_4.png", top: 186, height: 118 },
  /** The voice call, which is the actual mechanism. Starts after the orientation answer. */
  { file: "treacle_5.png", top: 424, height: 164 },
];

const stackH =
  stack.reduce((a, p) => a + p.height, 0) + ROW_GAP * (stack.length - 1);
const x0 = Math.round((W - (PW * 2 + COL_GAP)) / 2);
const xRight = x0 + PW + COL_GAP;

const placed = [{ ...hero, x: x0, y: Math.round((H - hero.height) / 2) }];
let y = Math.round((H - stackH) / 2);
for (const p of stack) {
  placed.push({ ...p, x: xRight, y });
  y += p.height + ROW_GAP;
}

const composites = [];
for (const p of placed) {
  const cropped = await sharp(path.join(dir, p.file))
    .extract({ left: 0, top: p.top, width: PW, height: p.height })
    .toBuffer();

  const frame = await sharp({
    create: {
      width: PW + 2,
      height: p.height + 2,
      channels: 4,
      background: RULE,
    },
  })
    .png()
    .toBuffer();

  composites.push({ input: frame, left: p.x - 1, top: p.y - 1 });
  composites.push({ input: cropped, left: p.x, top: p.y });
}

const out = "public/shots/treacle.webp";
await sharp({ create: { width: W, height: H, channels: 4, background: BG } })
  .composite(composites)
  .webp({ quality: 88 })
  .toFile(out);

console.log(`${out}: ${W}x${H} from ${placed.length} panels at native scale`);
