/**
 * The prose block union, shared by the journey stories and the about page.
 *
 * Lives in its own module rather than in `journey.ts` so a page can author prose
 * without importing `journey.json` — `about.ts` is reachable from Landing, and a
 * content import there would put 15 KB of story text in the entry bundle.
 *
 * Deliberately not markdown: the block union is closed, so adding a type is a
 * compile error until `StoryBody` handles it, and a stray bracket can never
 * swallow a paragraph. Inline text supports exactly `[label](url)`, `**bold**`
 * and `` `code` ``, parsed by `InlineText`.
 */

/** One bullet, optionally with a nested sub-list. Text supports inline `[label](url)`. */
export type StoryListItem = string | { text: string; items: string[] };

export type StoryLink = { text: string; url: string };

export type StoryBlock =
    | { type: "p"; text: string }
    | { type: "h"; text: string }
    | { type: "hr" }
    | { type: "ul"; items: StoryListItem[] }
    | { type: "links"; items: StoryLink[] };
