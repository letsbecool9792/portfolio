export type BackgroundVariant = "grass" | "desert";

const LAYERS: Record<BackgroundVariant, string> = {
    grass: `
        url('/assets/background/background_clouds.svg'),
        url('/assets/background/background_color_trees.svg'),
        url('/assets/background/background_solid_grass.svg')
    `,
    desert: `
        url('/assets/background/background_clouds.svg'),
        url('/assets/background/background_color_desert.svg'),
        url('/assets/background/background_solid_sand.svg')
    `,
};

/** Shared parallax layer properties, minus the attachment. */
export const backgroundStyle = (variant: BackgroundVariant = "grass") => ({
    backgroundImage: LAYERS[variant],
    backgroundRepeat: "repeat-x, repeat-x, repeat-x",
    backgroundPosition: "0 0, 0 40%, 0 100%",
    backgroundSize: "auto 33%, auto 33%, auto 100%",
});
