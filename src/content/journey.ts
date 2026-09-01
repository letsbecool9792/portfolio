import data from "./journey.json";
import { ORIGIN, type PageSeo } from "./seo";

/** One bullet, optionally with a nested sub-list. Text supports inline `[label](url)`. */
export type StoryListItem = string | { text: string; items: string[] };

export type StoryLink = { text: string; url: string };

/**
 * A story body is a flat list of blocks rather than a markdown string: the
 * renderer stays tiny and typed, and the JSON keeps the RPG chrome (button rows
 * for outbound links) distinct from ordinary prose.
 */
export type StoryBlock =
    | { type: "p"; text: string }
    | { type: "h"; text: string }
    | { type: "hr" }
    | { type: "ul"; items: StoryListItem[] }
    | { type: "links"; items: StoryLink[] };

export type JourneyEntry = {
    slug: string;
    title: string;
    /** Card blurb on the timeline. */
    subtext: string;
    /** Small era label, e.g. "2021 — Unity, Blender & Chaos". */
    era: string;
    image: string;
    /** Call-to-action wording on the timeline card. */
    linkText: string;
    blocks: StoryBlock[];
};

/**
 * Single source of truth for journey content — newest entry first. Shared by
 * both Journey layouts and by the individual story pages.
 *
 * Resolved at build time rather than fetched, so the prerendered HTML carries
 * the prose instead of a loading state. The JSON's `blocks` widen to `string`
 * on import, so the cast is what re-applies the closed block union.
 */
export const JOURNEY = data as JourneyEntry[];

export type StoryContext = {
    entry: JourneyEntry;
    /** Position in the timeline, oldest-first, so chapters read 1..n chronologically. */
    chapter: number;
    total: number;
    /** Chronologically earlier / later entries — the ladder runs newest to oldest. */
    previous?: JourneyEntry;
    next?: JourneyEntry;
};

/**
 * A chapter's head metadata, derived from the entry so story copy has one home.
 * `og:type` is `article` and the share card is the chapter hero, not the site card.
 *
 * Lives here rather than in `seo.ts` because it reads `journey.json` — `seo.ts` is
 * imported by Landing, so a content import there lands in the entry bundle.
 */
export const chapterSeo = (slug: string): PageSeo | null => {
    const entry = JOURNEY.find(item => item.slug === slug);
    if (!entry) return null;

    return {
        title: `${entry.title} — Suparno Saha`,
        description: entry.subtext,
        path: `/journey/${entry.slug}`,
        type: "article",
        image: `${ORIGIN}${entry.image}`,
    };
};

/** Resolves one story plus its neighbours. `null` when the slug matches nothing. */
export const journeyStory = (slug?: string): StoryContext | null => {
    const index = JOURNEY.findIndex(entry => entry.slug === slug);
    if (index === -1) return null;

    // The file is newest-first; chapter numbers count from the oldest.
    return {
        entry: JOURNEY[index],
        chapter: JOURNEY.length - index,
        total: JOURNEY.length,
        previous: JOURNEY[index + 1],
        next: JOURNEY[index - 1],
    };
};
