import { motion } from "framer-motion";
import { Gamepad2, Github, Instagram, Linkedin, Twitch, Twitter, Youtube } from "lucide-react";
import ReturnHomeButton from "../components/ReturnHomeButton";
import PageBackground from "../components/PageBackground";
import ArtifactPanel from "../components/artifacts/ArtifactPanel";
import ContributionGraph from "../components/artifacts/ContributionGraph";
import DiscordCard from "../components/artifacts/DiscordCard";
import LatestVideo from "../components/artifacts/LatestVideo";
import { ACCENTS, PROFILES } from "../content/socials";

/**
 * Desktop is a fixed 12x6 bento sized to the viewport so the whole inventory is
 * visible without scrolling; below `md` the same cards stack and the page scrolls
 * normally. Every placement class is `md:`-prefixed so mobile ignores the grid.
 */
const Artifacts = () => (
    <div className="relative flex min-h-screen flex-col items-center overflow-x-clip p-4 pb-28 md:h-dvh md:min-h-0 md:overflow-hidden md:p-6 md:pb-32">
        <PageBackground />

        <motion.div
            className="flex shrink-0 flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-center font-pixel text-2xl drop-shadow-lg sm:text-3xl md:text-4xl">
                Artifacts
            </h1>
            <p className="mt-2 text-center font-serif text-sm text-gray-700 md:text-base">
                Other places where I exist
            </p>
        </motion.div>

        <motion.div
            className="mt-6 grid w-full max-w-6xl grid-cols-1 gap-3 md:min-h-0 md:flex-1 md:grid-cols-12 md:grid-rows-6 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
        >
            <ArtifactPanel
                title="GITHUB"
                icon={<Github size={16} />}
                color={ACCENTS.github}
                href={PROFILES.github}
                className="md:col-span-8 md:col-start-1 md:row-span-3 md:row-start-1"
            >
                <ContributionGraph />
            </ArtifactPanel>

            <ArtifactPanel
                title="DISCORD"
                icon={<img src="/assets/other/discord.png" alt="" className="h-4 w-4" />}
                color={ACCENTS.discord}
                href={PROFILES.discord}
                className="md:col-span-4 md:col-start-9 md:row-span-3 md:row-start-1"
            >
                <DiscordCard />
            </ArtifactPanel>

            <ArtifactPanel
                title="LATEST VIDEO"
                icon={<Youtube size={16} />}
                color={ACCENTS.youtube}
                href={PROFILES.youtube}
                className="md:col-span-4 md:col-start-1 md:row-span-3 md:row-start-4"
            >
                <LatestVideo />
            </ArtifactPanel>

            <div className="grid grid-cols-3 gap-3 md:col-span-8 md:col-start-5 md:row-span-3 md:row-start-4 md:grid-rows-2 md:gap-4">
                <ArtifactPanel
                    title="TWITTER"
                    icon={<Twitter size={26} />}
                    color={ACCENTS.x}
                    href={PROFILES.x}
                />
                <ArtifactPanel
                    title="LINKEDIN"
                    icon={<Linkedin size={26} />}
                    color={ACCENTS.linkedin}
                    href={PROFILES.linkedin}
                />
                <ArtifactPanel
                    title="INSTAGRAM"
                    icon={<Instagram size={26} />}
                    color={ACCENTS.instagram}
                    href={PROFILES.instagram}
                />
                <ArtifactPanel
                    title="TWITCH"
                    icon={<Twitch size={26} />}
                    color={ACCENTS.twitch}
                    href={PROFILES.twitch}
                />
                <ArtifactPanel
                    title="BLUESKY"
                    // The asset is a black glyph, so it's inverted to white for the blue card.
                    icon={
                        <img
                            src="/assets/other/bsky.png"
                            alt=""
                            className="h-6 w-6"
                            style={{ filter: "brightness(0) invert(1)" }}
                        />
                    }
                    color={ACCENTS.bluesky}
                    href={PROFILES.bluesky}
                />
                <ArtifactPanel
                    title="MY GAMES"
                    icon={<Gamepad2 size={26} />}
                    color={ACCENTS.itch}
                    href={PROFILES.itch}
                />
            </div>
        </motion.div>

        <ReturnHomeButton />
    </div>
);

export default Artifacts;
