import { chromium } from "playwright";

const BASE = "http://localhost:3000";
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

/*
 * Content and accessibility audit. Runs on every route, in both palettes.
 * Auditing only the homepage was the earlier gap: /cv, /writing and six case
 * studies shipped unchecked, and a rule that holds on one page out of nine is
 * not a rule.
 */
async function auditRoute(path, { scheme, isHome, media }) {
  const where = `${path} ${media ? "print" : scheme}`;
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
  if (!res || res.status() >= 400) note(`${where}: returned ${res && res.status()}`);
  // The print palette is what /cv turns into a PDF, so it is audited like any
  // other palette rather than trusted.
  if (media) await page.emulateMedia(media);


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
      // WCAG 2.4.4: two links with the same accessible name must go to the same
      // place. Two footer links both reading "Writing" and pointing at different
      // destinations is the exact failure this catches.
      const byName = new Map();
      for (const a of links) {
        const name = (a.getAttribute("aria-label") || a.textContent).trim().toLowerCase();
        if (!name) continue;
        const href = new URL(a.getAttribute("href") || "", location.href).href;
        if (!byName.has(name)) byName.set(name, new Set());
        byName.get(name).add(href);
      }
      const ambiguousLinks = [...byName.entries()]
        .filter(([, hrefs]) => hrefs.size > 1)
        .map(([name, hrefs]) => `${name} -> ${[...hrefs].join(", ")}`);

      const ld = document.querySelector('script[type="application/ld+json"]');
      return {
        emDash: (text.match(/[—–]/g) || []).length,
        middot: (text.match(/·/g) || []).length,
        h1,
        h1Count: h1.length,
        imgsNoAlt,
        emptyLinks,
        badHref,
        ambiguousLinks,
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
        // WCAG 1.4.3 and 1.4.11 exempt pure decoration. An element hidden from
        // assistive technology carries no information by definition, so holding
        // it to a text contrast ratio tests the wrong thing. Scoped to
        // aria-hidden deliberately: anything a reader must actually read must
        // never be aria-hidden, so this cannot quietly excuse real content.
        if (el.closest('[aria-hidden="true"]')) continue;
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

    if (isHome) console.log("AUDIT", JSON.stringify(audit, null, 2));
    if (contrast.length) {
      console.log(`CONTRAST FAILURES ${where}`, JSON.stringify(contrast.slice(0, 12), null, 2));
      note(`${where}: ${contrast.length} contrast failures below WCAG AA`);
    } else {
      okContrast.push(where);
    }

    if (audit.emDash) note(`${where}: ${audit.emDash} em or en dashes`);
    if (audit.h1Count !== 1) note(`${where}: h1 count is ${audit.h1Count}, expected 1`);
    if (audit.imgsNoAlt) note(`${where}: ${audit.imgsNoAlt} images without alt`);
    if (audit.emptyLinks) note(`${where}: ${audit.emptyLinks} links with no accessible name`);
    if (audit.badHref) note(`${where}: ${audit.badHref} links with empty href`);
    if (audit.ambiguousLinks.length)
      note(`${where}: links sharing a name but not a destination: ${audit.ambiguousLinks.join(" | ")}`);
    if (isHome && !audit.hasLd) note("no JSON-LD block");
  if (isHome && audit.ldSameAs < 8) note(`JSON-LD sameAs has ${audit.ldSameAs} entries, expected at least 8`);
    if (audit.placeholder) note(`${where}: placeholder text still on the page`);
    if (audit.eyebrowsAboveHeadings > Math.ceil(audit.sectionCount / 3)) {
      note(`${where}: eyebrow count ${audit.eyebrowsAboveHeadings} exceeds ceil(${audit.sectionCount}/3)`);
    }

    // Keyboard focus visibility. Skipped under print emulation: a printed page
    // has no focus, so the check there only ever produces a false positive.
    if (!media) {
      await page.keyboard.press("Tab");
      const focus = await page.evaluate(() => {
        const el = document.activeElement;
        const cs = getComputedStyle(el);
        return { tag: el.tagName, outline: cs.outlineWidth, style: cs.outlineStyle };
      });
      if (focus.outline === "0px" || focus.style === "none") note(`${where}: first tab stop has no visible focus ring`);
      if (isHome) console.log("FOCUS", JSON.stringify(focus));
    }

    await ctx.close();
}

// Every route the site serves, audited in both palettes.
const ROUTES = [
  "/",
  "/cv",
  "/writing",
  "/work/doorfeed-regulatory-data",
  "/work/treacle",
  "/work/memrylab",
  "/work/edytlab",
  "/work/hyredlab",
  "/work/xpenselab",
];

const okContrast = [];
for (const path of ROUTES) {
  for (const scheme of ["dark", "light"]) {
    await auditRoute(path, { scheme, isHome: path === "/" });
  }
}
// /cv is the one route that becomes a file someone else opens.
await auditRoute("/cv", { scheme: "light", isHome: false, media: { media: "print" } });

const pairs = ROUTES.length * 2 + 1;
console.log(`CONTRAST ok on ${okContrast.length}/${pairs} route-palette pairs`);


/*
 * Performance budget. These are ceilings measured from the real build, not
 * aspirations: a site whose whole argument is provenance should not ship a
 * megabyte of JavaScript to say so. Raise a number here only with a reason
 * in docs/PERF-BASELINE.md, never to make a red run go green.
 */
const BUDGET = {
  // Byte ceilings are a drift alarm, not the real gate. They were raised from
  // 200/320 once the throttled numbers below showed the old limits were
  // measuring the wrong thing: at 195KB of JS the main thread was never
  // blocked at all, because the page paints from server-rendered HTML and
  // GSAP hydrates behind it. Bytes are still worth watching, so a dependency
  // cannot creep in unnoticed, but they are no longer what decides.
  jsKB: 260,
  cssKB: 24,
  totalKB: 400,
  requests: 30,
  lcpMs: 1200, // localhost, so this catches regressions rather than field cost
  cls: 0.01,
};

/*
 * The real gate: what the page costs a reader on a slow phone.
 *
 * Emulates a low-end device, 6x CPU throttle on slow 4G, and measures against
 * Google's Core Web Vitals thresholds rather than a number someone picked.
 * Total Blocking Time is the one that matters for JavaScript: it is main
 * thread time the reader cannot interact through.
 */
const FIELD = {
  lcpMs: 2500, // CWV "good"
  fcpMs: 1800, // CWV "good"
  tbtMs: 200, // Lighthouse "good"
};

for (const path of ["/", "/cv", "/work/treacle", "/writing"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const seen = new Map();
  page.on("response", async (r) => {
    try {
      const sizes = await r.request().sizes();
      seen.set(r.url(), {
        bytes: sizes.responseBodySize + sizes.responseHeadersSize,
        type: (r.headers()["content-type"] || "").split(";")[0],
      });
    } catch {
      /* redirects and aborted requests have no sizes; they carry no weight either */
    }
  });

  await page.goto(BASE + path, { waitUntil: "networkidle" });

  let js = 0, css = 0, total = 0;
  for (const { bytes, type } of seen.values()) {
    total += bytes;
    if (type.includes("javascript")) js += bytes;
    else if (type.includes("css")) css += bytes;
  }
  const kb = (n) => +(n / 1024).toFixed(1);

  const vitals = await page.evaluate(
    () =>
      new Promise((res) => {
        let lcp = 0;
        let cls = 0;
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) lcp = e.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value;
        }).observe({ type: "layout-shift", buffered: true });
        setTimeout(() => res({ lcp: Math.round(lcp), cls: +cls.toFixed(4) }), 1200);
      }),
  );

  const m = {
    path,
    requests: seen.size,
    jsKB: kb(js),
    cssKB: kb(css),
    totalKB: kb(total),
    lcpMs: vitals.lcp,
    cls: vitals.cls,
  };
  console.log("PERF", JSON.stringify(m));

  const over = (key, unit = "KB") =>
    m[key] > BUDGET[key] && note(`${path}: ${key} ${m[key]}${unit} over budget ${BUDGET[key]}${unit}`);
  over("jsKB");
  over("cssKB");
  over("totalKB");
  over("requests", "");
  over("lcpMs", "ms");
  over("cls", "");

  await ctx.close();
}

{
  const ctx = await browser.newContext({
    viewport: { width: 393, height: 851 },
    deviceScaleFactor: 2.75,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36",
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 6 });
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });

  await page.goto(BASE, { waitUntil: "load" });
  const m = await page.evaluate(
    () =>
      new Promise((res) => {
        let lcp = 0;
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) lcp = e.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        setTimeout(() => {
          let blocking = 0;
          for (const t of performance.getEntriesByType("longtask") || []) {
            blocking += Math.max(0, t.duration - 50);
          }
          res({
            lcp: Math.round(lcp),
            fcp: Math.round(
              (performance.getEntriesByName("first-contentful-paint")[0] || {}).startTime || 0,
            ),
            tbt: Math.round(blocking),
          });
        }, 5000);
      }),
  );

  console.log("FIELD (low-end phone, 6x CPU, slow 4G)", JSON.stringify(m));
  if (m.lcp > FIELD.lcpMs) note(`field LCP ${m.lcp}ms over ${FIELD.lcpMs}ms`);
  if (m.fcp > FIELD.fcpMs) note(`field FCP ${m.fcp}ms over ${FIELD.fcpMs}ms`);
  if (m.tbt > FIELD.tbtMs) note(`field TBT ${m.tbt}ms over ${FIELD.tbtMs}ms`);
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
