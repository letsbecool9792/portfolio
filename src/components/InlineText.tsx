import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ExternalLink from "./ExternalLink";

/**
 * The only markup the JSON content files understand: `[label](url)`, `**bold**`
 * and `` `code` ``. Deliberately tiny — anything structural is its own block, so
 * a stray bracket in the copy can never swallow a paragraph, and no markdown
 * dependency ships to the browser.
 *
 * One alternation rather than three passes, so the groups can't nest or fight
 * over the same span.
 */
const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;

const LINK_CLASS =
    "font-semibold text-blue-700 underline decoration-blue-400 underline-offset-2 transition-colors hover:text-blue-900 active:text-blue-900";

const renderInline = (text: string): ReactNode[] => {
    const nodes: ReactNode[] = [];
    let cursor = 0;

    for (const match of text.matchAll(TOKEN)) {
        const [full, label, url, bold, code] = match;
        const start = match.index ?? 0;

        if (start > cursor) nodes.push(text.slice(cursor, start));

        if (url) {
            // A root-relative target is another page on this site, so it routes
            // client-side instead of opening a new tab at a full page load.
            nodes.push(
                url.startsWith("/") ? (
                    <Link key={start} to={url} className={LINK_CLASS}>
                        {label}
                    </Link>
                ) : (
                    <ExternalLink key={start} href={url} className={LINK_CLASS}>
                        {label}
                    </ExternalLink>
                ),
            );
        } else if (bold) {
            nodes.push(
                <strong key={start} className="font-semibold text-black">
                    {bold}
                </strong>,
            );
        } else {
            nodes.push(
                <code key={start} className="rounded bg-black/10 px-1 font-mono text-[0.9em]">
                    {code}
                </code>,
            );
        }

        cursor = start + full.length;
    }

    if (cursor < text.length) nodes.push(text.slice(cursor));
    return nodes;
};

/**
 * Renders one string of content markup. The parser stays unexported so this
 * file only exports a component — a second export would break fast refresh for
 * every file that imports it.
 */
const InlineText = ({ text }: { text: string }) => <>{renderInline(text)}</>;

export default InlineText;
