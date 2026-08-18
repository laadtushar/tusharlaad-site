"use client";

import { useState } from "react";

/**
 * The address stays a real mailto link, because that is what a mail client
 * expects. The copy control sits beside it for readers who do not want a
 * client to open. The state change carries the feedback: no toast, nothing
 * to dismiss.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // No clipboard permission or no secure context. Hand it to the client.
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <span className="inline-flex items-baseline gap-2">
      <a
        href={`mailto:${email}`}
        className="text-amber underline decoration-amber/40 transition-colors hover:decoration-amber"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${email} to the clipboard`}
        className="border border-rule-2 px-1.5 py-0.5 text-[0.62rem] uppercase tracking-[0.1em] text-ink-3 transition-colors hover:border-amber hover:text-amber"
      >
        <span role="status">{copied ? "Copied" : "Copy"}</span>
      </button>
    </span>
  );
}
