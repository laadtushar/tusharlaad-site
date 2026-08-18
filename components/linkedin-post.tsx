"use client";

import { useState } from "react";
import type { LinkedInPost } from "@/lib/content";

/**
 * A LinkedIn post as a facade. The row is native: the site's type, the site's
 * rules, zero third-party bytes. The official embed only loads when a reader
 * asks for that specific post, so seven posts cost nothing until one is
 * wanted, and the performance budget holds.
 *
 * The iframe itself is LinkedIn's white card, which does not match this site
 * and cannot be themed. Loading it on request makes that LinkedIn's look
 * arriving by invitation rather than this site's look breaking.
 */
export function LinkedInPostRow({ post }: { post: LinkedInPost }) {
  const [open, setOpen] = useState(false);
  const embed = `https://www.linkedin.com/embed/feed/update/${post.urn}?collapsed=1`;

  return (
    <li className="post-row border-t border-rule py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-sm text-ink-2">
          Post on LinkedIn,{" "}
          <span className="tnum font-mono text-[0.8rem] text-amber">{post.date}</span>
        </p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={`${open ? "Hide" : "Show"} the LinkedIn post from ${post.date}`}
          className="border border-rule-2 px-2 py-1 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-ink-2 transition-colors hover:border-amber hover:text-amber"
        >
          {open ? "Hide post" : "Show post"}
        </button>
      </div>
      {open ? (
        <div className="mt-4 border border-rule bg-panel p-1">
          <iframe
            src={embed}
            height={post.height}
            title={`LinkedIn post from ${post.date}`}
            className="w-full max-w-[504px]"
            loading="lazy"
            allowFullScreen
          />
        </div>
      ) : null}
    </li>
  );
}
