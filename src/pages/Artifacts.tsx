import { Twitter, Github, Linkedin, Instagram, Twitch, Youtube } from "lucide-react";
import ReturnHomeButton from "../components/ReturnHomeButton";
import ExternalLink from "../components/ExternalLink";

const Artifacts = () => {
    return (
        <div className="min-h-screen flex flex-col items-center p-4 md:p-8 relative"
            style={{
                backgroundImage: `
                    url('/assets/background/background_clouds.svg'),
                    url('/assets/background/background_color_trees.svg'),
                    url('/assets/background/background_solid_grass.svg')
                `,
                backgroundRepeat: "repeat-x, repeat-x, repeat-x",
                backgroundPosition: "0 0, 0 40%, 0 100%",
                backgroundSize: "auto 33%, auto 33%, auto 100%",
                backgroundAttachment: "fixed, fixed, fixed",
            }}
        >
            <div className="flex flex-col items-center mt-8 md:mt-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-pixel text-center">Artifacts</h1>
                <p className="text-sm md:text-base lg:text-lg font-serif mt-2 text-gray-700 text-center">Other places where I exist</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt- md:mt-10">
                <ExternalLink href="https://github.com/letsbecool9792" className="hover:scale-110 transition-transform">
                    <Github className="w-6 h-6 md:w-8 md:h-8" />
                </ExternalLink>
                <ExternalLink href="https://twitter.com/letsbecool9792" className="hover:scale-110 transition-transform">
                    <Twitter className="w-6 h-6 md:w-8 md:h-8" />
                </ExternalLink>
                <ExternalLink href="https://www.linkedin.com/in/letsbecool9792" className="hover:scale-110 transition-transform">
                    <Linkedin className="w-6 h-6 md:w-8 md:h-8" />
                </ExternalLink>
                <ExternalLink href="https://www.instagram.com/letsbecool9792" className="hover:scale-110 transition-transform">
                    <Instagram className="w-6 h-6 md:w-8 md:h-8" />
                </ExternalLink>
                <ExternalLink href="https://www.twitch.tv/letsbecool9792" className="hover:scale-110 transition-transform">
                    <Twitch className="w-6 h-6 md:w-8 md:h-8" />
                </ExternalLink>
                <ExternalLink href="https://www.youtube.com/@letsbecool9792" className="hover:scale-110 transition-transform">
                    <Youtube className="w-6 h-6 md:w-8 md:h-8" />
                </ExternalLink>
                <ExternalLink href="https://bsky.app/profile/letsbecool.bsky.social" className="hover:scale-110 transition-transform">
                    <img src="/assets/other/bsky.png" alt="Bsky" className="w-6 h-6 md:w-8 md:h-8" />
                </ExternalLink>
                <ExternalLink href="https://discordapp.com/users/672367440977592350" className="hover:scale-110 transition-transform">
                    <img src="/assets/other/discord.png" alt="Discord" className="w-7 h-7 md:w-9.5 md:h-9.5" />
                </ExternalLink>
            </div>

            {/* Programming Platforms */}
            <div className="w-full mt-12 md:mt-20 lg:mt-50 flex flex-col items-center">
                <div className="flex flex-wrap justify-center gap-4 max-w-lg md:max-w-2xl">
                    <ExternalLink href="https://github.com/letsbecool9792" className="hover:underline text-sm md:text-base lg:text-lg font-mono text-gray-800">
                        LeetCode
                    </ExternalLink>
                    <ExternalLink href="https://www.hackerrank.com/profile/letsbecool" className="hover:underline text-sm md:text-base lg:text-lg font-mono text-gray-800">
                        HackerRank
                    </ExternalLink>
                    <ExternalLink href="https://codeforces.com/profile/letsbecool" className="hover:underline text-sm md:text-base lg:text-lg font-mono text-gray-800">
                        Codeforces
                    </ExternalLink>
                    <ExternalLink href="https://devfolio.co/@letsbecool" className="hover:underline text-sm md:text-base lg:text-lg font-mono text-gray-800">
                        Devfolio
                    </ExternalLink>
                    <ExternalLink href="https://stackoverflow.com/users/13383275/suparno-saha" className="hover:underline text-sm md:text-base lg:text-lg font-mono text-gray-800">
                        StackOverflow
                    </ExternalLink>
                </div>
            </div>

            {/* Games Link */}
            <div className="mt-8 md:mt-12 mb-8 md:mb-12">
                <ExternalLink href="https://letsbecool.itch.io" className="hover:underline text-base md:text-lg lg:text-xl font-mono text-gray-800">
                    Check out my games!
                </ExternalLink>
            </div>
            <ReturnHomeButton />
        </div>
    );
}

export default Artifacts;