import { ArrowUpRight, Github, Linkedin, Repeat2, Twitter } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ExternalLink from "../../components/ExternalLink";
import PageBackground from "../../components/PageBackground";
import { ALIAS, INTRO, NAME, TITLE } from "../../content/about";

// Touch has no hover, so the portrait swap is bound to a tap instead. Both are
// rendered stacked and cross-faded so neither flashes while loading.
const PORTRAITS = ["/assets/other/pic.jpg", "/assets/other/pic4.jpg"];

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
 * The hover portrait swap becomes a tap instead, since touch has no hover.
 */
const LandingMobile = () => {
    const [portrait, setPortrait] = useState(0);

    return (
    // No background colour here: it would paint over PageBackground's fixed layer.
    // `overflow-x-clip` (not `hidden`) keeps stray width from scrolling the page
    // sideways without turning this into a scroll container.
    <div className="flex min-h-dvh flex-col gap-4 overflow-x-clip p-4">
        <PageBackground />

        <section className="rounded-xl p-6" style={tile("terrain_snow_block_center")}>
            {/* Same hidden entry point to /about as desktop. Touch has no hover, so
                `active:` carries the affordance on tap instead of showing one up front. */}
            <h1 className="font-pixel text-2xl">
                <Link to="/about" className="underline-offset-8 active:underline">
                    {NAME}
                </Link>
            </h1>
            <h2 className="mt-2 font-pixel2 text-xl text-gray-700">{TITLE}</h2>
            <p className="mt-1 font-mono text-xs text-gray-600">aka {ALIAS}</p>
            <div className="mt-4 space-y-1 font-serif text-base text-gray-950">
                {INTRO.map(line => (
                    <p key={line}>{line}</p>
                ))}
            </div>
        </section>

        <button
            type="button"
            onClick={() => setPortrait(current => (current + 1) % PORTRAITS.length)}
            aria-label="Show a different photo"
            className="relative aspect-square w-full overflow-hidden rounded-xl"
        >
            {PORTRAITS.map((src, i) => (
                <motion.img
                    key={src}
                    src={src}
                    alt={i === 0 ? "Suparno Saha — portrait" : ""}
                    decoding="async"
                    initial={false}
                    animate={{ opacity: portrait === i ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ))}
            {/* Touch gets no hover cue, so the affordance has to be visible. */}
            <span className="absolute bottom-2 right-2 rounded-full bg-black/40 p-1.5 text-white">
                <Repeat2 size={16} />
            </span>
        </button>

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
};

export default LandingMobile;
