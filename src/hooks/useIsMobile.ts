import { useSyncExternalStore } from "react";

/** Kept in sync with Tailwind's `md` breakpoint so forked layouts and utility classes agree. */
export const MOBILE_BREAKPOINT = 768;

const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 0.02}px)`;

// Resolved lazily so the module stays importable where `window` doesn't exist.
let mediaQuery: MediaQueryList | null = null;
const getMediaQuery = () => (mediaQuery ??= window.matchMedia(QUERY));

const subscribe = (onChange: () => void) => {
    const query = getMediaQuery();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
};

const getSnapshot = () => getMediaQuery().matches;

// If this ever gets prerendered for SEO, the static HTML is what crawlers read
// first and Google indexes mobile-first, so the build-time snapshot is mobile.
const getServerSnapshot = () => true;

/**
 * True below the `md` breakpoint. Pages use this to mount a mobile layout
 * instead of a desktop one — only the chosen tree ever renders, so crawlers
 * never see duplicated copy.
 */
export const useIsMobile = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
