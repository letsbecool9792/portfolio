import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExternalLink from "../../components/ExternalLink";
import { ALIAS, INTRO, NAME, TITLE } from "../../content/about";
import { backgroundStyle } from "../../styles/background";

// The entrance runs from 0.5s to 2.5s and the cards land at 2.6s. The hover
// portrait is held back until after that so its fetch and decode can't compete
// with the animation for the main thread.
const INTRO_MS = 2700;

const LandingDesktop = () => {
    const sharedAnimate = { opacity: 1, x: 0, y: 0 };
    const sharedTransition = { duration: 0.8, delay: 1.8, ease: "easeInOut" };
    const [isHovering, setIsHovering] = useState(false);
    const [introDone, setIntroDone] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIntroDone(true), INTRO_MS);
        return () => clearTimeout(timer);
    }, []);

    return (
    // `overflow-x-clip` because the entrance transforms (x: 10%/30%/-110%) push
    // cards outside the container mid-flight, and transforms still extend the
    // scrollable area even though they don't affect layout. `clip` rather than
    // `hidden` so this never becomes a scroll container.
    <div className="h-screen overflow-x-clip bg-fixed bg-blue-200 p-4 md:p-8 flex items-center"
        style={{ ...backgroundStyle("grass"), backgroundAttachment: "fixed, fixed, fixed" }}
    >
        {/* Nothing is interactive until the entrance settles: cards are still
            sliding into place, so a click would land on a card that isn't where it
            appears to be, and the portrait would swap mid-flight. */}
        <div className={`grid grid-cols-1 md:grid-cols-10 md:grid-rows-5 gap-4 md:gap-8 w-full overflow-y-auto md:overflow-visible max-h-screen md:max-h-none ${introDone ? "" : "pointer-events-none"}`}>

        <motion.div
            className="md:col-start-1 md:col-end-6 md:row-start-1 md:row-end-4 row-span-2 p-6 rounded-xl order-1"
            initial={{ opacity: 0, x: "10%", y: "25%" }}
            animate={sharedAnimate}
            transition={sharedTransition}
            style={{
                backgroundImage: "url('/assets/cards/terrain_snow_block_center.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
                imageRendering: "pixelated"
            }}
            >
            <div className="p-4">
                <div className="mb-4">
                {/* The name is the way into /about. Deliberately unstyled until
                    hover — nothing should advertise that it's a link. */}
                <h1 className="text-3xl md:text-4xl font-pixel">
                    <Link to="/about" className="underline-offset-8 hover:underline">
                        {NAME}
                    </Link>
                </h1>
                <h2 className="text-xl md:text-3xl font-pixel2 mt-2 text-gray-700">{TITLE}</h2>
                {/* The alias as readable text. It exists in URLs and meta tags all
                    over the site, but Google can't bind two names it never sees in
                    the same sentence. */}
                <p className="mt-1 font-mono text-sm text-gray-600">aka {ALIAS}</p>
                </div>

                <div className="text-gray-950 mt-6 mb-6 pr-4 text-lg font-serif space-y-1">
                    {INTRO.map(line => (
                        <p key={line}>{line}</p>
                    ))}
                </div>
            </div>
        </motion.div>

        <motion.div
            // No `overflow-hidden` here: clipping an ancestor of a `preserve-3d`
            // subtree can flatten it in Safari and kill the flip. The faces carry
            // their own rounding instead.
            className="bg-transparent aspect-square rounded-xl max-h-screen md:col-start-6 md:col-end-9 md:row-start-1 md:row-end-4 row-span-2 order-2 mx-auto w-64 h-64 md:w-auto md:h-auto md:max-w-none"
            initial={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-110%",
                scale: 0.5,
            }}
            animate={{
                position: ["fixed", "static", "static", "static"],
                x: ["-50%", "-50%", "-50%", "0%"],
                y: ["-110%", "30%", "30%", "0%"],
                scale: [0.5, 0.5, 0.5, 1],
            }}
            transition={{
                duration: 2,
                times: [0, 0.3, 0.7, 1],
                ease: "easeInOut",
                delay: 0.5,
            }}
            style={{
                perspective: "1000px",
            }}
            // Guarded as well as blocked by pointer-events above, so the swap can
            // never fire early if that container's classes change.
            onMouseEnter={() => introDone && setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            >
            {/* Flips like a card rather than sliding. The container already carried
                `perspective`, so the two photos are just the front and back face of
                one rotating plane — `backface-visibility` hides whichever is turned
                away, so no cross-fade is needed. */}
            <motion.div
                className="relative h-full w-full"
                initial={false}
                animate={{ rotateY: isHovering ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <img
                    src="/assets/other/pic.jpg"
                    alt="Suparno Saha — portrait"
                    decoding="async"
                    className="absolute inset-0 h-full w-full rounded-xl object-cover"
                    style={{ backfaceVisibility: "hidden" }}
                />

                {/* Mounted only once the entrance is over, so its fetch and decode
                    can't compete with the animation for the main thread. Hover is
                    blocked until then anyway, so the back face is never missing. */}
                {introDone && (
                    <img
                        src="/assets/other/pic4.jpg"
                        alt=""
                        decoding="async"
                        fetchPriority="low"
                        className="absolute inset-0 h-full w-full rounded-xl object-cover"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    />
                )}
            </motion.div>
        </motion.div>


        <motion.div
            className="md:col-start-9 md:col-end-11 md:row-start-1 md:row-end-3 rounded-xl p-6 justify-between order-3"
            initial={{ opacity: 0, x: "-50%", y: "40%" }}
            animate={sharedAnimate}
            transition={sharedTransition}
            style={{
                backgroundImage: "url('/assets/cards/water.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
                imageRendering: "pixelated"
            }}
            >
            <h2 className="text-lg font-pixel mb-4">See Artifacts</h2>

            <div className="flex justify-between items-center mb-3">
                <ExternalLink href="https://github.com/letsbecool9792" className="rounded-full bg-rose-200 p-3 hover:bg-rose-300 transition-colors">
                    <Github size={20} />
                </ExternalLink>
                <ExternalLink href="https://www.linkedin.com/in/letsbecool9792" className="rounded-full bg-rose-200 p-3 hover:bg-rose-300 transition-colors">
                    <Linkedin size={20} />
                </ExternalLink>
                <ExternalLink href="https://twitter.com/letsbecool9792" className="rounded-full bg-rose-200 p-3 hover:bg-rose-300 transition-colors">
                    <Twitter size={20} />
                </ExternalLink>
            </div>

            <a href="/artifacts" className="w-full py-2 bg-rose-300 rounded-lg hover:bg-rose-400 transition-colors flex justify-center items-center">
            <span className="mr-2 font-serif">View More</span>
            <ArrowUpRight size={16} />
            </a>
        </motion.div>

        <motion.a
            className="md:col-start-1 md:col-end-5 md:row-start-4 md:row-end-6 row-span-2 p-6 rounded-xl cursor-pointer relative overflow-hidden group order-4"
            initial={{ opacity: 0, x: "30%", y: "-30%" }}
            animate={sharedAnimate}
            transition={sharedTransition}
            href='/journey'
            style={{
                backgroundImage: "url('/assets/cards/terrain_grass_block_center.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
                imageRendering: "pixelated"
            }}
            >
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

            <div className="relative z-10 transform group-hover:translate-y-1 transition-transform duration-300">
                <h2 className="text-2xl font-pixel">Begin the Journey</h2>
                <p className="text-lg mt-2 text-gray-950 font-serif">Explore my developer timeline and growth</p>
            </div>

            {/* Arrow that appears on hover */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className="bg-black/30 rounded-full p-2">
                    <ArrowUpRight size={24} className="text-white" />
                </div>
            </div>
        </motion.a>

        <motion.a
            className="md:col-start-5 md:col-end-9 md:row-start-4 md:row-end-6 row-span-2 p-6 rounded-xl cursor-pointer relative overflow-hidden group order-5"
            initial={{ opacity: 0, x: "0%", y: "-30%" }}
            animate={sharedAnimate}
            transition={sharedTransition}
            href="/projects"
            style={{
                backgroundImage: "url('/assets/cards/terrain_stone_block_center.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
                imageRendering: "pixelated"
            }}
            >
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gray-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

            <div className="relative z-10 transform group-hover:translate-y-1 transition-transform duration-300">
                <h2 className="text-2xl font-pixel">View the Relics</h2>
                <p className="text-lg mt-2 text-gray-950 font-serif">A collection of projects forged across quests, experiments and late-night bug hunts.</p>
                <p className="text-sm mt-2 text-gray-700 font-serif">→ Recruiters start here</p>
            </div>

            {/* Arrow that appears on hover */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className="bg-black/30 rounded-full p-2">
                    <ArrowUpRight size={24} className="text-white" />
                </div>
            </div>
        </motion.a>

        <motion.a
            className="md:col-start-9 md:col-end-11 md:row-start-3 md:row-end-6 row-span-2 p-6 rounded-xl cursor-pointer relative overflow-hidden group order-6"
            initial={{ opacity: 0, x: "-50%", y: "-10%" }}
            animate={sharedAnimate}
            transition={sharedTransition}
            href='/sidequests'
            style={{
                backgroundImage: "url('/assets/cards/lava.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
                imageRendering: "pixelated"
            }}
            >
            {/* Pulsing hover effect for lava */}
            <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

            <div className="relative z-10 transform group-hover:translate-y-1 transition-transform duration-300">
                <h2 className="text-2xl font-pixel">Open Side Quests</h2>
                <p className="text-lg mt-2 text-gray-950 font-serif">Gaming, CTFs, ML interests and more</p>
            </div>

            {/* Arrow that appears on hover */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className="bg-black/30 rounded-full p-2">
                    <ArrowUpRight size={24} className="text-white" />
                </div>
            </div>
        </motion.a>
        </div>
    </div>
    );
};

export default LandingDesktop;
