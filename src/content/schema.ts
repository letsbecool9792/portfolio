import { ORIGIN, type PageSeo } from "./seo";

/**
 * The JSON-LD graph, rendered per-route by `<Seo>`.
 *
 * This used to be a static block in `index.html`. Moving it here lets `/` declare
 * itself a `ProfilePage` about the Person and each chapter declare itself an
 * `Article` by him — neither of which a single shared shell could say.
 *
 * Must **not** import content JSON: `<Seo>` is on every page including Landing,
 * so an import here would land in the entry bundle.
 *
 * At least five other people share the name "Suparno Saha", several on far
 * higher-authority domains. `sameAs` is the field that separates them — every URL
 * in it also links back to suparno.me, and the pair is what turns the claim into a
 * confirmed identity. Keep it in sync with `src/content/socials.ts`.
 */

export const PERSON_ID = `${ORIGIN}/#person`;
export const WEBSITE_ID = `${ORIGIN}/#website`;

type Node = Record<string, unknown>;

const PERSON: Node = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Suparno Saha",
    // Every display name he actually uses somewhere. Deliberately varied across
    // platforms — "suparno" on X, "letsbecool" on Bluesky, "LetsBeCool" on
    // YouTube — so this list is what ties the variants back to one entity.
    // Add a name here whenever he starts using one; never ask him to unify them.
    alternateName: ["letsbecool9792", "letsbecool", "LetsBeCool", "suparno"],
    url: `${ORIGIN}/`,
    image: `${ORIGIN}/og.png`,
    jobTitle: "Software Developer",
    description:
        "Software developer from Kolkata, India. Android in Kotlin and Jetpack Compose, cross-platform in React Native, web in React — and a run of Unity games before that.",
    homeLocation: { "@type": "Place", name: "Kolkata, West Bengal, India" },
    // Machine-only, and the single strongest signal separating him from his
    // namesakes. Deliberately never surfaced as visible copy — see CLAUDE.md.
    affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Heritage Institute of Technology",
        url: "https://www.heritageit.edu/",
        sameAs: "https://en.wikipedia.org/wiki/Heritage_Institute_of_Technology",
    },
    knowsAbout: [
        "Android development",
        "Kotlin",
        "Jetpack Compose",
        "React Native",
        "React",
        "TypeScript",
        "Django",
        "Game development",
        "Unity",
        "Pixel art",
    ],
    sameAs: [
        "https://github.com/letsbecool9792",
        "https://www.linkedin.com/in/letsbecool9792",
        "https://x.com/letsbecool9792",
        "https://www.youtube.com/@letsbecool9792",
        "https://www.instagram.com/letsbecool9792",
        "https://www.twitch.tv/letsbecool9792",
        "https://bsky.app/profile/suparno.me",
        "https://letsbecool.itch.io",
        "https://leetcode.com/u/letsbecool/",
        "https://www.kaggle.com/letsbecool",
        "https://devfolio.co/@letsbecool",
        "https://discord.com/users/672367440977592350",
    ],
};

const WEBSITE: Node = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${ORIGIN}/`,
    name: "Suparno Saha",
    alternateName: ["letsbecool9792", "suparno.me"],
    description: "The personal site and developer portfolio of Suparno Saha (letsbecool9792).",
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
};

/** One crumb: the label shown, and the path it points at. */
export type Crumb = { name: string; path: string };

export const breadcrumb = (trail: Crumb[]): Node => ({
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${ORIGIN}${crumb.path}`,
    })),
});

export const itemList = (name: string, items: string[]): Node => ({
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item,
    })),
});

/** `/about` — the prose page *about* the Person, as distinct from his profile hub. */
export const aboutPage = (seo: PageSeo): Node => ({
    "@type": "AboutPage",
    "@id": `${ORIGIN}${seo.path}#page`,
    url: `${ORIGIN}${seo.path}`,
    name: seo.title,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
});

/** `/` — declares the Person as what the page is actually about. */
export const profilePage = (seo: PageSeo): Node => ({
    "@type": "ProfilePage",
    "@id": `${ORIGIN}${seo.path}#page`,
    url: `${ORIGIN}${seo.path}`,
    name: seo.title,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
});

/**
 * A journey chapter. No `datePublished` — nothing in `journey.json` carries a real
 * one, and an invented date is worse than an absent one. Add a `published` field
 * to the entries and thread it through here when the real dates are known.
 */
export const article = (seo: PageSeo, headline: string): Node => ({
    "@type": "Article",
    "@id": `${ORIGIN}${seo.path}#article`,
    headline,
    description: seo.description,
    image: seo.image,
    mainEntityOfPage: `${ORIGIN}${seo.path}`,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
});

/**
 * The full graph for one page: the sitewide Person and WebSite, plus whatever that
 * route adds. Serialised with `<` escaped so the JSON can never close the script
 * tag early.
 */
export const graphJson = (extra: Node[] = []) =>
    JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [PERSON, WEBSITE, ...extra],
    }).replace(/</g, "\\u003c");
