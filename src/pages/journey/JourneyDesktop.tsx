import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { JourneyEntry } from "../../content/journey";

/**
 * Card placement is hand-tuned absolute positioning against the page container,
 * which is why this layout can't collapse to one column — the mobile variant
 * replaces it wholesale rather than restyling it.
 */
const FIRST_CARD_TOP = 500;
const CARD_SPACING = 400;

/** The ladder was sized by hand for the six events this shipped with; grow it as events are added. */
const BASE_LADDER_HEIGHT = 2560;
const BASE_EVENT_COUNT = 6;

type JourneyDesktopProps = {
    events: JourneyEntry[];
    spriteSrc: string;
};

const JourneyDesktop = ({ events, spriteSrc }: JourneyDesktopProps) => {
    const ladderHeight =
        BASE_LADDER_HEIGHT + Math.max(0, events.length - BASE_EVENT_COUNT) * CARD_SPACING;

    return (
        <>
            <div className="mt-40">
                {/* The ladder unrolls downwards on arrival, so the page opens with the
                    descent the copy promises. Kept as its own wrapper because a
                    transform on an ancestor would turn the fixed sprite below into an
                    absolutely positioned one and strand it mid-page. */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                    style={{ transformOrigin: "top" }}
                >
                    <img src="/assets/other/ladder_top.png" alt="" className="w-full" />
                    <div
                        className="bg-[url('/assets/other/ladder_middle.png')] bg-repeat-y w-full"
                        style={{ height: `${ladderHeight}px` }}
                    />
                    <img src="/assets/other/ladder_bottom.png" alt="" className="w-full" />
                </motion.div>

                <motion.div
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
                    initial={{ opacity: 0, y: -60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                >
                    <img src={spriteSrc} alt="" className="w-32 h-32" />
                </motion.div>
            </div>

            <div className="w-full max-w-4xl pt-32 mb-10 z-20">
                {events.map((event, i) => (
                    <motion.div
                        key={event.title}
                        initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                        viewport={{ amount: 0.5 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className={`
                            w-5/12 absolute
                            ${i % 2 === 0 ? 'left-0 text-right pr-8' : 'right-0 text-left pl-8'}
                        `}
                        style={{ top: `${FIRST_CARD_TOP + i * CARD_SPACING}px` }}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md w-96 inline-block">
                            <div className="flex flex-col items-center">
                                <img
                                    src={event.image}
                                    alt={`${event.title} — ${event.era}`}
                                    className="w-80 h-40 object-cover rounded-md mb-4"
                                />
                            </div>
                            <h3 className="font-pixel2 text-lg md:text-2xl text-blue-700 mb-2">
                                {event.title}
                            </h3>
                            <p className="font-serif text-sm md:text-base text-gray-600 mb-3">
                                {event.subtext}
                            </p>
                            <Link
                                to={`/journey/${event.slug}`}
                                className="font-mono text-sm text-green-600 hover:text-green-800 hover:underline transition-colors"
                            >
                                {event.linkText} →
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default JourneyDesktop;
