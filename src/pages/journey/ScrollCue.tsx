import { AnimatePresence, motion } from "framer-motion";

/**
 * A pixel-art chevron, drawn as rects on a 7x5 grid so it stays crisp at any
 * size, with a 1-unit drop shadow in the ladder's dark wood for the same depth
 * the Kenney sprites have. The fill is the climber's pink.
 */
const CHEVRON_PIXELS = [
    [0, 0], [6, 0],
    [0, 1], [1, 1], [5, 1], [6, 1],
    [1, 2], [2, 2], [4, 2], [5, 2],
    [2, 3], [3, 3], [4, 3],
    [3, 4],
];

const Chevron = () => (
    <svg viewBox="0 0 7 6" width="28" height="24" shapeRendering="crispEdges" aria-hidden="true">
        {CHEVRON_PIXELS.map(([x, y]) => (
            <rect key={`s${x}-${y}`} x={x} y={y + 1} width="1" height="1" fill="#5b3a29" />
        ))}
        {CHEVRON_PIXELS.map(([x, y]) => (
            <rect key={`f${x}-${y}`} x={x} y={y} width="1" height="1" fill="#f472b6" />
        ))}
    </svg>
);

type ScrollCueProps = {
    visible: boolean;
    reduced: boolean;
    onClimb: () => void;
};

/**
 * Three chevrons under the climber's feet that light up one after another down
 * the ladder, like runway lights: the page goes *down* and the reader starts at
 * the top with nothing below the fold to hint at it. Clicking them climbs to the
 * first chapter. Fades out as soon as the reader starts scrolling.
 *
 * Must stay outside any transformed ancestor — it's `position: fixed`, and a
 * transform above it would pin it to that ancestor instead of the viewport.
 */
const ScrollCue = ({ visible, reduced, onClimb }: ScrollCueProps) => (
    <AnimatePresence>
        {visible && (
            <motion.button
                type="button"
                onClick={onClimb}
                aria-label="Climb down to the first chapter"
                title="Climb down"
                // Sits just under the sprite, which is 128px tall and centred on the viewport.
                className="fixed left-1/2 top-[calc(50%+72px)] z-10 -translate-x-1/2 flex flex-col items-center gap-0.5 rounded-md p-2 transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12, transition: { duration: 0.3 } }}
                // Waits for the ladder to unroll and the sprite to drop in.
                transition={{ duration: 0.5, delay: 1.8 }}
            >
                {[0, 1, 2].map(i => (
                    <motion.span
                        key={i}
                        className="block"
                        animate={reduced ? { opacity: 1 - i * 0.25 } : { opacity: [0.2, 1, 0.2], y: [0, 3, 0] }}
                        transition={
                            reduced
                                ? undefined
                                : { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                        }
                    >
                        <Chevron />
                    </motion.span>
                ))}
            </motion.button>
        )}
    </AnimatePresence>
);

export default ScrollCue;
