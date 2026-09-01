import { motion } from "framer-motion";
import PageBackground from "../components/PageBackground";
import ReturnHomeButton from "../components/ReturnHomeButton";
import Seo from "../components/Seo";
import StoryBody from "../components/StoryBody";
import { ABOUT_BLOCKS, ALIAS, NAME, TITLE } from "../content/about";
import { aboutPage, breadcrumb } from "../content/schema";
import { ABOUT } from "../content/seo";
import { useIsMobile } from "../hooks/useIsMobile";
import { PARCHMENT, frame } from "../styles/panel";

const pixelated = { imageRendering: "pixelated" } as const;

/**
 * The plain-language page about the person, for a search that's looking for him
 * rather than for his projects.
 *
 * Genuinely responsive — one column of prose needs no desktop/mobile fork — so
 * the prerenderer bakes its full body into the HTML.
 */
const About = () => {
    const isMobile = useIsMobile();

    return (
        <div className="relative flex min-h-screen flex-col items-center overflow-x-clip p-4 pb-32 md:p-8">
            <Seo
                {...ABOUT}
                schema={[
                    aboutPage(ABOUT),
                    breadcrumb([
                        { name: "Home", path: "/" },
                        { name: "About", path: "/about" },
                    ]),
                ]}
            />
            <PageBackground />

            <motion.article
                className="w-full max-w-3xl"
                initial={isMobile ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="mb-6 flex items-center gap-4">
                    <img
                        src="/assets/other/character_pink_idle.png"
                        alt=""
                        className="h-12 w-12 shrink-0"
                        style={pixelated}
                    />
                    <div className="min-w-0">
                        <h1 className="font-pixel text-lg text-blue-900 sm:text-2xl">{NAME}</h1>
                        {/* The alias as readable text, not just a URL slug — the two
                            names have to appear together somewhere Google can see. */}
                        <p className="mt-2 font-mono text-xs text-gray-700 sm:text-sm">
                            {TITLE} · aka {ALIAS}
                        </p>
                    </div>
                </div>

                <div
                    className="rounded-xl p-5 shadow-lg sm:p-8"
                    style={{ ...frame, backgroundColor: PARCHMENT }}
                >
                    <StoryBody blocks={ABOUT_BLOCKS} />
                </div>
            </motion.article>

            <ReturnHomeButton />
        </div>
    );
};

export default About;
