import { family } from "@/lib/family";
import { Shell } from "@/components/ui";

/**
 * The LabyNator family block, on every route. The content and order are the
 * same on every site in the family: part of LabyNator, the four apps, built by
 * Tushar Laad. The list itself lives in lib/family.ts.
 *
 * Plain anchors, on purpose. ExternalLink opens a new tab and these are the
 * owner's own sites, so they open in the same tab, carry no rel, and point at
 * the final host rather than at a redirect. Server rendered, so it is complete
 * with JavaScript off. The colon stands where the family spec has a dash,
 * because this site prints no dashes. Hidden in print: /cv becomes a file.
 */
export function FamilyFooter() {
  const link = "text-ink-2 underline decoration-ink-3 hover:text-ink";
  return (
    <footer className="no-print">
      <Shell>
        <nav
          aria-label="LabyNator family"
          className="flex flex-col gap-x-8 gap-y-3 border-t border-rule py-8 text-sm leading-relaxed text-ink-2"
        >
          <p>
            Part of{" "}
            <a href={family.studio.url} className={`${link} font-semibold`}>
              {family.studio.name}
            </a>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {family.apps.map((app) => (
              <li key={app.slug}>
                <a href={app.url} className={link}>
                  {app.name}: {app.blurb}
                </a>
              </li>
            ))}
          </ul>
          <p>
            Built by{" "}
            <a href={family.founder.url} className={`${link} font-semibold`}>
              {family.founder.name}
            </a>
          </p>
        </nav>
      </Shell>
    </footer>
  );
}
