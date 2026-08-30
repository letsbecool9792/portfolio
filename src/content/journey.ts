import { useEffect, useState } from "react";

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

// The timeline and the story pages read the same file, so navigating between
// them shouldn't refetch it. The promise is shared rather than the result, so
// two components mounting in the same tick still make one request.
let cached: Promise<JourneyEntry[]> | null = null;

const loadJourney = () =>
    (cached ??= fetch("/journey.json")
        .then(res => res.json() as Promise<JourneyEntry[]>)
        .catch(err => {
            console.error("Failed to load journey data:", err);
            cached = null; // let a later mount retry
            return [];
        }));

/**
 * Single source of truth for journey content — newest entry first. Shared by
 * both Journey layouts and by the individual story pages.
 */
export const useJourney = () => {
    const [entries, setEntries] = useState<JourneyEntry[]>([]);

    useEffect(() => {
        let active = true;
        loadJourney().then(data => {
            if (active) setEntries(data);
        });
        return () => {
            active = false;
        };
    }, []);

    return entries;
};

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
 * Resolves one story plus its neighbours. `undefined` while loading, `null` when
 * the slug matches nothing — the two need different handling (spinner vs 404).
 */
export const useJourneyStory = (slug?: string): StoryContext | null | undefined => {
    const entries = useJourney();

    if (entries.length === 0) return undefined;

    const index = entries.findIndex(entry => entry.slug === slug);
    if (index === -1) return null;

    // The file is newest-first; chapter numbers count from the oldest.
    return {
        entry: entries[index],
        chapter: entries.length - index,
        total: entries.length,
        previous: entries[index + 1],
        next: entries[index - 1],
    };
};
