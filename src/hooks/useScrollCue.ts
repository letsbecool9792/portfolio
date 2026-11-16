import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Scrolled less than this and the reader hasn't started the climb yet. */
const AT_TOP_THRESHOLD = 40;

/** Hold off until the ladder has unrolled and the sprite has dropped in (~1.8s). */
const FIRST_HOP_DELAY = 2000;
const HOP_EVERY = 2600;
const HOP_LENGTH = 600;
const FRAME_DURATION = 150;

const isAtTop = () => typeof window === "undefined" || window.scrollY < AT_TOP_THRESHOLD;

/**
 * Drives the Journey's "scroll down" cue on desktop. While the reader is still
 * at the top, the climber fidgets: every few seconds it plays its two climb
 * frames for a moment, as if it can't wait to get going. Returns whether the
 * reader is at the top, and the frame to show mid-hop (null when not hopping).
 *
 * Reduced motion gets no hops; the cue itself still shows, just still.
 */
export const useScrollCue = () => {
    const reduced = useReducedMotion() ?? false;
    const [atTop, setAtTop] = useState(isAtTop);
    const [hopFrame, setHopFrame] = useState<"a" | "b" | null>(null);

    useEffect(() => {
        const onScroll = () => setAtTop(isAtTop());
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!atTop || reduced) {
            setHopFrame(null);
            return;
        }

        let frameTimer: ReturnType<typeof setInterval> | undefined;
        const hop = () => {
            let elapsed = 0;
            setHopFrame("a");
            clearInterval(frameTimer);
            frameTimer = setInterval(() => {
                elapsed += FRAME_DURATION;
                if (elapsed >= HOP_LENGTH) {
                    clearInterval(frameTimer);
                    setHopFrame(null);
                } else {
                    setHopFrame(frame => (frame === "a" ? "b" : "a"));
                }
            }, FRAME_DURATION);
        };

        let loop: ReturnType<typeof setInterval> | undefined;
        const first = setTimeout(() => {
            hop();
            loop = setInterval(hop, HOP_EVERY);
        }, FIRST_HOP_DELAY);

        return () => {
            clearTimeout(first);
            clearInterval(loop);
            clearInterval(frameTimer);
        };
    }, [atTop, reduced]);

    return {
        atTop,
        reduced,
        hopSrc: hopFrame ? `/assets/other/character_pink_climb_${hopFrame}.png` : null,
    };
};
