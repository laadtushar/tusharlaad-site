import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = `${profile.name}, software engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card. Generated at build time, so it costs nothing at runtime and
 * nothing in the page budget.
 *
 * Until now the site declared twitter:card summary_large_image and shipped no
 * image, which meant every share on LinkedIn or Slack rendered as a blank
 * card. It carries the site's own language: the dark ground, one amber cell in
 * a resolved lattice, radius zero.
 */
export default function OpenGraphImage() {
  const cells = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const live = r === 1 && c === 1;
      cells.push(
        <div
          key={`${r}-${c}`}
          style={{
            width: 34,
            height: 34,
            background: live ? "#e5a03c" : "#808d9c",
          }}
        />,
      );
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#06090d",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", width: 130 }}>
          {cells}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 700,
              color: "#e3eaf2",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#94a1af", letterSpacing: "-0.02em" }}>
            {profile.headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#808d9c",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {`${profile.domain} · ${profile.location}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
