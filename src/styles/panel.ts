/**
 * The pixel panel, redrawn in CSS.
 *
 * These are the colours sampled out of `projects_card.jpg` — the desktop relic
 * card art is a fixed 2:1 frame that can neither stretch nor crop onto a tall
 * panel, so anything that has to grow with its content paints the same look in
 * CSS instead. Kept here so the mobile relic cards and the journey story pages
 * can't drift apart.
 */
export const PANEL_BORDER = "#1f487e";
export const PANEL_BEVEL = "#3166af";
export const PANEL_FILL = "#80b0e8";
export const PANEL_GRID = "#5898d8";

/** The blue blueprint grid — for chrome, not for long-form reading. */
export const panelSurface = {
    backgroundColor: PANEL_FILL,
    backgroundImage: `
        repeating-linear-gradient(0deg, ${PANEL_GRID} 0 2px, transparent 2px 44px),
        repeating-linear-gradient(90deg, ${PANEL_GRID} 0 2px, transparent 2px 44px)
    `,
};

/** Warm page colour for story prose — the blueprint grid is unreadable under paragraphs. */
export const PARCHMENT = "#fbf5e6";

/** Double border that reads as a bevelled pixel frame at any size. */
export const frame = {
    border: `4px solid ${PANEL_BORDER}`,
    outline: `2px solid ${PANEL_BEVEL}`,
    outlineOffset: "-6px",
};
