import { StrictMode } from "react";
import { StaticRouter } from "react-router";
import { JOURNEY, chapterSeo } from "./content/journey";
import { NOT_FOUND, STATIC_ROUTES, type PageSeo } from "./content/seo";
import AppRoutes from "./routes";

/**
 * The build-time entry point, consumed by `scripts/prerender.mjs`.
 *
 * `StaticRouter` comes from `react-router` rather than `react-router-dom/server` —
 * v7 consolidated the packages and that subpath no longer exists.
 *
 * No `index.css` import here: the client build already emits the stylesheet and
 * links it from the template, so importing it again would only duplicate the asset
 * into the throwaway SSR bundle.
 */
export const render = (url: string) => (
    <StrictMode>
        <StaticRouter location={url}>
            <AppRoutes />
        </StaticRouter>
    </StrictMode>
);

/** Every route that gets its own HTML file, in sitemap order. */
export const ROUTES: PageSeo[] = [
    ...STATIC_ROUTES,
    ...JOURNEY.map(entry => chapterSeo(entry.slug)!),
];

/** Rendered separately to `dist/404.html`, which Vercel serves with a real 404. */
export const NOT_FOUND_ROUTE = NOT_FOUND;
