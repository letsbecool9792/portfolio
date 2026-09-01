import type { StoryBlock } from "./blocks";

export const NAME = "Suparno Saha";
export const TITLE = "Software Developer";

/** The handle everything online is under. Rendered as visible text, not just in URLs. */
export const ALIAS = "letsbecool9792";

/**
 * The landing card intro. Kept here rather than inline because both Landing
 * variants render it, and the SEO work wants the same wording for the meta
 * description and Person schema.
 */
export const INTRO = [
    "Started building things in 2019 and haven't really stopped.",
    "Games first, then hackathons, then production Android.",
    "These days it's Kotlin, React and React Native — wherever the quest leads.",
];

/**
 * The `/about` page body.
 *
 * This is the page a search for the owner's name should land on, so it says the
 * plain version of everything the rest of the site says in RPG vocabulary, and it
 * puts "Suparno Saha" and "letsbecool9792" in the same sentences — Google can't
 * bind two names it only ever sees in separate URLs.
 *
 * Per the convention in CLAUDE.md: no college, no department, no "student". He is
 * identified by what he builds.
 */
export const ABOUT_BLOCKS: StoryBlock[] = [
    {
        type: "p",
        text: "I'm **Suparno Saha**. Online I'm **letsbecool9792** almost everywhere — GitHub, YouTube, Twitch, Instagram, LeetCode — so if you've run into that handle somewhere, that was me.",
    },
    {
        type: "p",
        text: "I build software. Mostly Android these days, in Kotlin and Jetpack Compose, plus cross-platform work in React Native. Before that it was web apps in React and Django, and before *that* it was games in Unity, which is where the whole thing started.",
    },
    { type: "h", text: "What I actually do" },
    {
        type: "p",
        text: "I spent 2026 as an early engineer on a consumer social app, owning all the native Android code and most of the React Native frontend. Two products shipped: **yap**, a 10-second video messaging app that reached 16.6k users, and **iykyk**, a pass-the-phone party game that films the chaos as you play — I was the sole Android engineer on that one, in Kotlin and Compose with CameraX and Media3.",
    },
    {
        type: "p",
        text: "The work I'm proudest of there wasn't a feature. It was dragging the user-perceived crash rate from a 9.28% peak down to 1.45% by building a real crash-reporting and tracing layer and then root-causing about twenty production crash classes. Unglamorous, and the thing that made the app usable.",
    },
    { type: "hr" },
    { type: "h", text: "Before that" },
    {
        type: "p",
        text: "I started in class 8 with a school-issued Java textbook, BlueJ, and a diary I turned into a dev journal. My friends and I wrote code on paper during class because it was more interesting than the class. That habit never really went away.",
    },
    {
        type: "p",
        text: "Then a stretch of game dev — Unity, Blender, and a lot of half-finished projects, some of which are still on [itch.io](https://letsbecool.itch.io). Then hackathons, which turned out to be the format that suits me: a hard deadline, a blank repo, and no time to be precious about anything.",
    },
    {
        type: "p",
        text: "The long version, with the setbacks left in, is on [the Journey](/journey).",
    },
    { type: "hr" },
    { type: "h", text: "Elsewhere" },
    {
        type: "p",
        text: "I'm in Kolkata, India. Outside of work it's games, CTFs, machine learning rabbit holes, and whatever else looked interesting that week — that pile lives on [Side Quests](/sidequests).",
    },
    {
        type: "p",
        text: "Everything I've shipped is on [Projects](/projects), and every profile worth having is listed on [Artifacts](/artifacts).",
    },
    {
        type: "links",
        items: [
            { text: "GitHub", url: "https://github.com/letsbecool9792" },
            { text: "LinkedIn", url: "https://www.linkedin.com/in/letsbecool9792" },
            { text: "itch.io", url: "https://letsbecool.itch.io" },
            { text: "Bluesky", url: "https://bsky.app/profile/suparno.me" },
        ],
    },
];
