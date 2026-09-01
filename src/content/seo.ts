/**
 * Per-route metadata. One home for every title and description so the `<Seo>`
 * component and the prerenderer can't drift.
 *
 * This module must **not** import content JSON. Landing imports it, so anything
 * pulled in here lands in the entry bundle — importing `journey.json` for the
 * chapter lookup put 15 KB of story prose on the homepage. `chapterSeo` lives in
 * `journey.ts` instead, next to the data it reads.
 *
 * Titles keep the RPG vocabulary but pair it with the plain meaning — "Artifacts"
 * alone tells a searcher nothing, and every title carries the name, since ranking
 * for "Suparno Saha" is the whole point.
 *
 * Descriptions stay near 155 characters; Google truncates around there.
 */

export const ORIGIN = "https://suparno.me";
export const SITE_NAME = "Suparno Saha";
export const TWITTER_HANDLE = "@letsbecool9792";

export const DEFAULT_OG_IMAGE = `${ORIGIN}/og.png`;
export const OG_IMAGE_WIDTH = "1200";
export const OG_IMAGE_HEIGHT = "630";
export const OG_IMAGE_ALT = "Suparno Saha, letsbecool9792 — software developer";

export type PageSeo = {
    title: string;
    description: string;
    /** Canonical path — leading slash, no origin, no trailing slash except on "/". */
    path: string;
    type?: "website" | "profile" | "article";
    image?: string;
    noindex?: boolean;
    /**
     * Set on the desktop/mobile forked pages. The prerenderer gives these head
     * tags but leaves `#root` empty.
     *
     * `useIsMobile`'s server snapshot is `true`, so prerendered markup is always
     * the mobile tree. On the forked pages that tree is a different layout from
     * the desktop one, and `main.tsx` mounts with `createRoot` (not `hydrateRoot`),
     * so React throws the markup away and re-renders — a desktop visitor would
     * watch the mobile layout paint and then snap. The unforked pages render the
     * same tree at both breakpoints, so they carry their full body safely.
     */
    forked?: boolean;
};

export const HOME: PageSeo = {
    title: "Suparno Saha (letsbecool9792) — Software Developer",
    description:
        "I'm Suparno Saha — letsbecool9792 most places online. I build Android apps for a living, websites because I want to, and games back when I had the time.",
    path: "/",
    type: "profile",
    forked: true,
};

export const JOURNEY_INDEX: PageSeo = {
    title: "The Journey — Suparno Saha's developer timeline",
    description:
        "Scribbling Java in school notebooks to shipping Android apps, and the mess in between — Suparno Saha's timeline. Games, hackathons, and everything after.",
    path: "/journey",
    forked: true,
};

export const PROJECTS: PageSeo = {
    title: "Projects & Experience — Suparno Saha",
    description:
        "Everything Suparno Saha (letsbecool9792) has actually shipped — two apps real people use, a pile of side projects, and the hackathon builds that survived.",
    path: "/projects",
    forked: true,
};

export const SIDE_QUESTS: PageSeo = {
    title: "Side Quests — Suparno Saha's hobbies",
    description:
        "What Suparno Saha does when nobody's paying — gaming, CTFs, machine learning rabbit holes, and whatever else looked interesting that week.",
    path: "/sidequests",
};

export const ARTIFACTS: PageSeo = {
    title: "Artifacts — Where to find Suparno Saha",
    description:
        "Every corner of the internet Suparno Saha (letsbecool9792) turns up in — GitHub, YouTube, itch.io, Bluesky, LeetCode — most of them showing live activity.",
    path: "/artifacts",
};

export const CONTACT: PageSeo = {
    title: "Contact Suparno Saha",
    description:
        "Got a quest? Send it over. Suparno Saha (letsbecool9792) — Android and web developer, Kolkata, usually up for something interesting.",
    path: "/contact",
};

export const NOT_FOUND: PageSeo = {
    title: "Lost in the void — Suparno Saha",
    description: "This page doesn't exist.",
    path: "/404",
    noindex: true,
};

/** The fixed routes, in sitemap order. Chapters are appended by the prerenderer. */
export const STATIC_ROUTES: PageSeo[] = [
    HOME,
    JOURNEY_INDEX,
    PROJECTS,
    SIDE_QUESTS,
    ARTIFACTS,
    CONTACT,
];
