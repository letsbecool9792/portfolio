import { graphJson } from "../content/schema";
import {
    DEFAULT_OG_IMAGE,
    OG_IMAGE_ALT,
    OG_IMAGE_HEIGHT,
    OG_IMAGE_WIDTH,
    ORIGIN,
    SITE_NAME,
    TWITTER_HANDLE,
    type PageSeo,
} from "../content/seo";

/**
 * Per-route head tags.
 *
 * React 19 hoists `<title>`, `<meta>` and `<link>` into `<head>` from anywhere in
 * the tree, so this needs no helmet library — it just renders them. `index.html`
 * deliberately carries none of these any more: one shell serves every route, so a
 * static `canonical` or `og:url` there would point the whole site at the homepage,
 * and a static `<title>` would win over the hoisted one (browsers honour the first
 * `<title>` in document order).
 *
 * The prerenderer bakes whatever this renders into each route's HTML file, which
 * is what gets these tags in front of social scrapers — they never run JS.
 */
/** Extra JSON-LD nodes this route contributes on top of the sitewide Person + WebSite. */
type SeoProps = PageSeo & { schema?: Record<string, unknown>[] };

const Seo = ({ title, description, path, type = "website", image, noindex, schema }: SeoProps) => {
    const url = `${ORIGIN}${path}`;
    const card = image ?? DEFAULT_OG_IMAGE;
    const isDefaultCard = card === DEFAULT_OG_IMAGE;

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            {/* No canonical on a noindex page — it would name a URL we're asking
                Google not to keep. */}
            {!noindex && <link rel="canonical" href={url} />}
            <meta
                name="robots"
                content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}
            />

            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={card} />
            <meta property="og:locale" content="en_US" />
            {/* Dimensions only for the site card, whose size is known. Chapter heroes
                vary, and a wrong width makes some scrapers skip the image entirely. */}
            {isDefaultCard && <meta property="og:image:width" content={OG_IMAGE_WIDTH} />}
            {isDefaultCard && <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />}
            {isDefaultCard && <meta property="og:image:alt" content={OG_IMAGE_ALT} />}

            {type === "profile" && <meta property="profile:first_name" content="Suparno" />}
            {type === "profile" && <meta property="profile:last_name" content="Saha" />}
            {type === "profile" && <meta property="profile:username" content="letsbecool9792" />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={TWITTER_HANDLE} />
            <meta name="twitter:creator" content={TWITTER_HANDLE} />

            {/* React 19 hoists title/meta/link but not this, so it renders in the
                tree. `<Seo>` is the first child of every page, which makes it the
                first body node — and `scripts/prerender.mjs` peels it into <head>
                from there, so it survives even on the forked pages whose body is
                dropped. `dangerouslySetInnerHTML` because JSX would HTML-escape
                the JSON; `graphJson` escapes `<` so the tag can't close early. */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: graphJson(schema) }}
            />
        </>
    );
};

export default Seo;
