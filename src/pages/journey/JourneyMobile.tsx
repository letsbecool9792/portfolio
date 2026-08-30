import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { JourneyEntry } from "../../content/journey";

const pixelated = { imageRendering: "pixelated" } as const;

type JourneyMobileProps = {
    events: JourneyEntry[];
    spriteSrc: string;
};

/**
 * Single-column story feed with the ladder reduced to a thin rail down the left
 * edge. The sprite is `sticky` rather than `fixed` so it climbs alongside the
 * cards and comes to rest at the top and bottom of the ladder instead of
 * floating over the heading and the footer.
 */
const JourneyMobile = ({ events, spriteSrc }: JourneyMobileProps) => (
    <div className="relative w-full pt-10 pb-28">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-10 flex-col" aria-hidden="true">
            <img src="/assets/other/ladder_top.png" alt="" className="w-full" style={pixelated} />
            <div
                className="flex-1"
                style={{
                    backgroundImage: "url('/assets/other/ladder_middle.png')",
                    backgroundRepeat: "repeat-y",
                    backgroundSize: "100% auto",
                    ...pixelated,
                }}
            >
                {/* The sprite is deliberately wider than the rail so it straddles it.
                    `justify-center` splits the overhang evenly, so its width can be
                    changed on its own without a matching offset. Roughly a fifth of
                    the source PNG is transparent padding on each side, so the visible
                    character is ~64% of the width set here. */}
                <div className="sticky top-[40svh] flex justify-center">
                    <img src={spriteSrc} alt="" className="w-24 max-w-none" style={pixelated} />
                </div>
            </div>
            <img src="/assets/other/ladder_bottom.png" alt="" className="w-full" style={pixelated} />
        </div>

        <ol className="ml-14 space-y-6">
            {events.map((event, i) => (
                <motion.li
                    key={event.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: i === 0 ? 0.15 : 0 }}
                    className="rounded-lg bg-white p-4 shadow-md"
                >
                    <img
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                        className="mb-3 aspect-[2/1] w-full rounded-md object-cover"
                    />
                    <h2 className="font-pixel2 text-xl text-blue-700">{event.title}</h2>
                    <p className="mt-1 font-serif text-sm text-gray-600">{event.subtext}</p>
                    <Link
                        to={`/journey/${event.slug}`}
                        className="mt-3 inline-block font-mono text-sm text-green-600 underline-offset-2 transition-colors active:text-green-800 active:underline"
                    >
                        {event.linkText} →
                    </Link>
                </motion.li>
            ))}
        </ol>
    </div>
);

export default JourneyMobile;
