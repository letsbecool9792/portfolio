import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import ExternalLink from "../../components/ExternalLink";
import PageBackground from "../../components/PageBackground";

const tile = (texture: string) => ({
    backgroundImage: `url('/assets/cards/${texture}.png')`,
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
    imageRendering: "pixelated" as const,
});

const navCards = [
    {
        href: "/journey",
        texture: "terrain_grass_block_center",
        title: "Begin the Journey",
        blurb: "Explore my developer timeline and growth",
    },
    {
        href: "/projects",
        texture: "terrain_stone_block_center",
        title: "View the Relics",
        blurb: "A collection of projects forged across quests, experiments and late-night bug hunts.",
        note: "→ Recruiters start here",
    },
    {
        href: "/sidequests",
        texture: "lava",
        title: "Open Side Quests",
        blurb: "Gaming, CTFs, ML interests and more",
    },
];

/**
 * Straight top-to-bottom stack. The desktop entrance choreography is dropped
 * here on purpose: it animates from `position: fixed` into a grid slot, which
 * has nothing to settle into once the grid is a single column.
 *
 * The hover portrait swap is dropped too — touch can't trigger it, and the
 * alternate image is by far the heaviest asset on the site.
 */
const LandingMobile = () => (
    // No background colour here: it would paint over PageBackground's fixed layer.
    // `overflow-x-clip` (not `hidden`) keeps stray width from scrolling the page
    // sideways without turning this into a scroll container.
    <div className="flex min-h-dvh flex-col gap-4 overflow-x-clip p-4">
        <PageBackground />

        <section className="rounded-xl p-6" style={tile("terrain_snow_block_center")}>
            <h1 className="font-pixel text-2xl">Suparno Saha</h1>
            <h2 className="mt-2 font-pixel2 text-xl text-gray-700">Software Developer</h2>
            <div className="mt-4 space-y-1 font-serif text-base text-gray-950">
                <p>Started my journey in 2019 and never looked back.</p>
                <p>Built games, joined hackathons, dabbled in AI, and wandered off-trail.</p>
                <p>Now crafting in React and React Native—whatever the path demands.</p>
            </div>
        </section>

        <img
            src="/assets/other/pic.png"
            alt="Suparno Saha"
            className="aspect-square w-full rounded-xl object-cover"
        />

        <section className="rounded-xl p-6" style={tile("water")}>
            <h2 className="mb-4 font-pixel text-lg">See Artifacts</h2>
            <div className="mb-3 flex justify-between items-center">
                <ExternalLink href="https://github.com/letsbecool9792" className="rounded-full bg-rose-200 p-3 active:bg-rose-300">
                    <Github size={20} />
                </ExternalLink>
                <ExternalLink href="https://www.linkedin.com/in/letsbecool9792" className="rounded-full bg-rose-200 p-3 active:bg-rose-300">
                    <Linkedin size={20} />
                </ExternalLink>
                <ExternalLink href="https://twitter.com/letsbecool9792" className="rounded-full bg-rose-200 p-3 active:bg-rose-300">
                    <Twitter size={20} />
                </ExternalLink>
            </div>
            <a href="/artifacts" className="flex w-full items-center justify-center rounded-lg bg-rose-300 py-2 active:bg-rose-400">
                <span className="mr-2 font-serif">View More</span>
                <ArrowUpRight size={16} />
            </a>
        </section>

        {navCards.map(card => (
            <a
                key={card.href}
                href={card.href}
                className="relative overflow-hidden rounded-xl p-6 active:brightness-95"
                style={tile(card.texture)}
            >
                <h2 className="font-pixel text-xl">{card.title}</h2>
                <p className="mt-2 pr-10 font-serif text-base text-gray-950">{card.blurb}</p>
                {card.note && <p className="mt-2 font-serif text-sm text-gray-700">{card.note}</p>}
                {/* Desktop reveals this on hover; on touch it has to be visible from the start. */}
                <div className="absolute bottom-4 right-4 rounded-full bg-black/30 p-2">
                    <ArrowUpRight size={20} className="text-white" />
                </div>
            </a>
        ))}
    </div>
);

export default LandingMobile;
