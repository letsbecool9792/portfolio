import { useEffect, useRef, useState } from "react";

const IDLE_DELAY = 200;
const FRAME_DURATION = 150;

/**
 * Animates the character sprite between its two climb frames while the page is
 * scrolling, falling back to the idle frame once scrolling stops. Returns the
 * sprite path to render.
 */
export const useClimbAnimation = () => {
    const [isClimbing, setIsClimbing] = useState(false);
    const [frame, setFrame] = useState<"a" | "b">("a");
    const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsClimbing(true);
            if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
            stopTimerRef.current = setTimeout(() => setIsClimbing(false), IDLE_DELAY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
        };
    }, []);

    useEffect(() => {
        if (!isClimbing) {
            setFrame("a");
            return;
        }
        const interval = setInterval(() => setFrame(f => (f === "a" ? "b" : "a")), FRAME_DURATION);
        return () => clearInterval(interval);
    }, [isClimbing]);

    return isClimbing
        ? `/assets/other/character_pink_climb_${frame}.png`
        : "/assets/other/character_pink_idle.png";
};
