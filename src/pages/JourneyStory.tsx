import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import PageBackground from "../components/PageBackground";
import ReturnHomeButton from "../components/ReturnHomeButton";
import Seo from "../components/Seo";
import StoryBody from "../components/StoryBody";
import { chapterSeo, journeyStory, type JourneyEntry } from "../content/journey";
import { NOT_FOUND } from "../content/seo";
import { useIsMobile } from "../hooks/useIsMobile";
import { PANEL_BEVEL, PANEL_BORDER, PARCHMENT, frame } from "../styles/panel";

const pixelated = { imageRendering: "pixelated" } as const;

/** Prev/next chapter tile. `direction` decides which edge the arrow sits on. */
const ChapterLink = ({
    entry,
    direction,
}: {
    entry: JourneyEntry;
    direction: "previous" | "next";
}) => {
    const isPrevious = direction === "previous";

    return (
        <Link
            to={`/journey/${entry.slug}`}
            className={`group flex flex-1 items-center gap-3 rounded-lg bg-white/90 p-3 shadow-md transition-transform duration-200 hover:-translate-y-0.5 active:-translate-y-0.5 ${
                isPrevious ? "" : "flex-row-reverse text-right"
            }`}
            style={{ border: `3px solid ${PANEL_BORDER}` }}
        >
            <img
                src={entry.image}
                alt=""
                loading="lazy"
                className="h-14 w-14 shrink-0 rounded-md object-cover"
                style={{ border: `2px solid ${PANEL_BEVEL}` }}
            />
            <span className="min-w-0">
                <span className="block font-mono text-[0.65rem] tracking-wide text-gray-500 uppercase">
                    {isPrevious ? "← Earlier" : "Later →"}
                </span>
                <span className="block truncate font-pixel2 text-lg text-blue-800 group-hover:text-blue-950">
                    {entry.title}
                </span>
            </span>
        </Link>
    );
};

/**
 * One chapter of the Journey, rendered on-site.
 *
 * Genuinely responsive — a single column of prose has nothing that needs the
 * desktop/mobile fork the timeline itself needs, so this page is shared and only
 * its entrance animation is gated.
 */
const JourneyStory = () => {
    const { slug } = useParams<{ slug: string }>();
    // Memoised for referential stability — the lookup builds a fresh object each
    // call, which would otherwise re-fire the title effect on every render.
    const story = useMemo(() => journeyStory(slug), [slug]);
    const isMobile = useIsMobile();

    // Chapter-to-chapter links keep the scroll position otherwise, dropping the
    // reader into the middle of the next story.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // An unknown slug is the closest an SPA gets to a 404 — noindex it rather than
    // let a mistyped chapter URL into the index under a real-looking title.
    const seo = (slug && chapterSeo(slug)) || NOT_FOUND;

    return (
        <div className="relative flex min-h-screen flex-col items-center overflow-x-clip p-4 pb-32 md:p-8">
            <Seo {...seo} />
            <PageBackground />

            {story === null ? (
                <div className="mt-32 flex flex-col items-center gap-4 text-center">
                    <img
                        src="/assets/other/character_pink_idle.png"
                        alt=""
                        className="h-24 w-24"
                        style={pixelated}
                    />
                    <h1 className="font-pixel text-lg text-gray-800">Chapter not found</h1>
                    <p className="max-w-md font-serif text-gray-700">
                        There’s no story on this rung of the ladder.
                    </p>
                    <Link
                        to="/journey"
                        className="font-mono text-sm text-green-700 underline-offset-2 hover:underline"
                    >
                        ← Back to the Journey
                    </Link>
                </div>
            ) : (
                <motion.article
                    className="w-full max-w-3xl"
                    initial={isMobile ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link
                        to="/journey"
                        className="mb-6 inline-block font-mono text-xs text-blue-900 underline-offset-2 hover:underline active:underline sm:text-sm"
                    >
                        ← Back to the Journey
                    </Link>

                    {/* Chapter marker: the sprite parks on the rung this story sits on. */}
                    <div className="mb-4 flex items-center gap-3">
                        <img
                            src="/assets/other/character_pink_idle.png"
                            alt=""
                            className="h-10 w-10 shrink-0"
                            style={pixelated}
                        />
                        <div className="min-w-0">
                            <p className="font-pixel text-[0.6rem] text-blue-900 sm:text-xs">
                                Chapter {story.chapter} of {story.total}
                            </p>
                            <p className="mt-1 font-mono text-xs text-gray-600 sm:text-sm">
                                {story.entry.era}
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl shadow-lg" style={frame}>
                        <img
                            src={story.entry.image}
                            alt={story.entry.title}
                            className="aspect-[2/1] w-full object-cover"
                        />
                    </div>

                    <h1 className="mt-6 font-pixel2 text-4xl leading-tight text-blue-900 drop-shadow-sm sm:text-5xl">
                        {story.entry.title}
                    </h1>
                    <p className="mt-2 font-serif text-base text-gray-700 italic sm:text-lg">
                        {story.entry.subtext}
                    </p>

                    <div
                        className="mt-6 rounded-xl p-5 shadow-lg sm:p-8"
                        style={{ ...frame, backgroundColor: PARCHMENT }}
                    >
                        <StoryBody blocks={story.entry.blocks} />
                    </div>

                    <nav className="mt-8 flex flex-col gap-3 sm:flex-row" aria-label="Chapters">
                        {story.previous ? (
                            <ChapterLink entry={story.previous} direction="previous" />
                        ) : (
                            <span className="flex-1" />
                        )}
                        {story.next ? (
                            <ChapterLink entry={story.next} direction="next" />
                        ) : (
                            <span className="flex-1" />
                        )}
                    </nav>
                </motion.article>
            )}

            <ReturnHomeButton />
        </div>
    );
};

export default JourneyStory;
