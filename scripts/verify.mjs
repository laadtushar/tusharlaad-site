import { chromium } from "playwright";

const BASE = "http://localhost:3115";
const OUT = "/tmp/claude-0/-home-user-tusharlaad-site/be5df31a-dc5a-5229-a729-628f250d1b0a/scratchpad/shots";
const fails = [];
const note = (m) => fails.push(m);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });

async function shot(name, { width, height, scheme = "dark", path = "/", media }) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    colorScheme: scheme,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
  if (!res || res.status() >= 400) note(`${path} returned ${res && res.status()}`);
  if (media) await page.emulateMedia(media);
  await page.waitForTimeout(400);

  // horizontal overflow check
  const overflow = await page.evaluate(() => {
    const d = document.documentElement;
    return { scroll: d.scrollWidth, client: d.clientWidth };
  });
  if (overflow.scroll > overflow.client + 1) {
    note(`${name}: horizontal overflow, scrollWidth ${overflow.scroll} vs ${overflow.client}`);
  }

  if (errors.length) note(`${name}: console errors ${JSON.stringify(errors.slice(0, 3))}`);

  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  await ctx.close();
}

// ---- content and a11y audit on the homepage
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: "dark" });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  const audit = await page.evaluate(() => {
    const text = document.body.innerText;
    const h1 = [...document.querySelectorAll("h1")].map((e) => e.textContent.trim());
    const imgsNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.getAttribute("alt")).length;
    const links = [...document.querySelectorAll("a")];
    const emptyLinks = links.filter((a) => !a.textContent.trim() && !a.getAttribute("aria-label")).length;
    const badHref = links.filter((a) => {
      const h = a.getAttribute("href");
      return !h || h === "#" || h === "";
    }).length;
    const ld = document.querySelector('script[type="application/ld+json"]');
    return {
      emDash: (text.match(/[—–]/g) || []).length,
      middot: (text.match(/·/g) || []).length,
      h1,
      h1Count: h1.length,
      imgsNoAlt,
      emptyLinks,
      badHref,
      hasLd: !!ld,
      ldSameAs: ld ? (JSON.parse(ld.textContent).sameAs || []).length : 0,
      lorem: /lorem ipsum/i.test(text),
      placeholder: /\[ dates \]|TODO|FIXME|Lorem/i.test(text),
      textLen: text.length,
      // eyebrow count: uppercase tracked micro-labels sitting directly above a heading
      eyebrowsAboveHeadings: [...document.querySelectorAll("h2,h3")].filter((h) => {
        const prev = h.previousElementSibling;
        if (!prev) return false;
        const cs = getComputedStyle(prev);
        return cs.textTransform === "uppercase" && parseFloat(cs.letterSpacing) > 1;
      }).length,
      sectionCount: document.querySelectorAll("section").length,
    };
  });

  // contrast sampling on body copy
  const contrast = await page.evaluate(() => {
    const lum = (c) => {
      const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number).map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const bgOf = (el) => {
      let n = el;
      while (n) {
        const bg = getComputedStyle(n).backgroundColor;
        if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) return bg;
        n = n.parentElement;
      }
      return "rgb(0,0,0)";
    };
    const ratio = (a, b) => {
      const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
      return (x + 0.05) / (y + 0.05);
    };
    const out = [];
    for (const el of document.querySelectorAll("p, li, span, dd, dt, blockquote, h1, h2, h3, a")) {
      if (!el.textContent.trim()) continue;
      const cs = getComputedStyle(el);
      if (el.children.length && el.childElementCount === el.childNodes.length) continue;
      const size = parseFloat(cs.fontSize);
      const weight = parseInt(cs.fontWeight, 10) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const r = ratio(cs.color, bgOf(el));
      const min = large ? 3 : 4.5;
      if (r < min) out.push({ t: el.textContent.trim().slice(0, 42), r: +r.toFixed(2), size, min });
    }
    return out;
  });

  console.log("AUDIT", JSON.stringify(audit, null, 2));
  if (contrast.length) {
    console.log("CONTRAST FAILURES", JSON.stringify(contrast.slice(0, 12), null, 2));
    note(`${contrast.length} contrast failures below WCAG AA`);
  } else {
    console.log("CONTRAST ok, all sampled text passes AA");
  }

  if (audit.emDash) note(`em or en dashes on page: ${audit.emDash}`);
  if (audit.h1Count !== 1) note(`h1 count is ${audit.h1Count}, expected 1`);
  if (audit.imgsNoAlt) note(`${audit.imgsNoAlt} images without alt`);
  if (audit.emptyLinks) note(`${audit.emptyLinks} links with no accessible name`);
  if (audit.badHref) note(`${audit.badHref} links with empty href`);
  if (!audit.hasLd) note("no JSON-LD block");
  if (audit.placeholder) note("placeholder text still on the page");
  if (audit.eyebrowsAboveHeadings > Math.ceil(audit.sectionCount / 3)) {
    note(`eyebrow count ${audit.eyebrowsAboveHeadings} exceeds ceil(${audit.sectionCount}/3)`);
  }

  // keyboard focus visibility
  await page.keyboard.press("Tab");
  const focus = await page.evaluate(() => {
    const el = document.activeElement;
    const cs = getComputedStyle(el);
    return { tag: el.tagName, outline: cs.outlineWidth, style: cs.outlineStyle };
  });
  if (focus.outline === "0px" || focus.style === "none") note("first tab stop has no visible focus ring");
  console.log("FOCUS", JSON.stringify(focus));

  await ctx.close();
}

await shot("home-desktop-dark", { width: 1440, height: 1000 });
await shot("home-desktop-light", { width: 1440, height: 1000, scheme: "light" });
await shot("home-mobile-dark", { width: 390, height: 844 });
await shot("work-treacle", { width: 1440, height: 1000, path: "/work/treacle" });
await shot("cv-screen", { width: 1440, height: 1000, path: "/cv" });
await shot("cv-print", { width: 1000, height: 1400, path: "/cv", scheme: "light", media: { media: "print" } });

await browser.close();

console.log("\n=== RESULT ===");
if (fails.length) {
  console.log("FAILURES:");
  fails.forEach((f) => console.log(" - " + f));
  process.exit(1);
}
console.log("All checks passed.");
