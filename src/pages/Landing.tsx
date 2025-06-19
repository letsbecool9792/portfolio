import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "motion/react"
import { useState } from "react";
import ExternalLink from "../components/ExternalLink";

const Landing = () => {
    const sharedAnimate = { opacity: 1, x: 0, y: 0 };
    const sharedTransition = { duration: 0.8, delay: 1.8, ease: "easeInOut" };
    const [isHovering, setIsHovering] = useState(false);

    return (
    <div className="h-screen bg-fixed bg-blue-200 p-4 md:p-8 flex items-center"
        style={{
            backgroundImage: `
                url('/assets/background/background_clouds.svg'),
                url('/assets/background/background_color_trees.svg'),
                url('/assets/background/background_solid_grass.svg')
            `,
            backgroundRepeat: "repeat-x, repeat-x, repeat-x",
            backgroundPosition: "0 0, 0 40%, 0 80%",
            backgroundSize: "auto 33%, auto 33%, auto 100%",
            backgroundAttachment: "fixed, fixed, fixed",
        }}
    >
        <div className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-5 gap-4 md:gap-8 w-full overflow-y-auto md:overflow-visible max-h-screen md:max-h-none">
        
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
                <h1 className="text-3xl md:text-4xl font-pixel">Suparno Saha</h1>
                <h2 className="text-xl md:text-3xl font-pixel2 mt-2 text-gray-700">Software Developer</h2>
                </div>

                <p className="text-gray-950 mt-6 mb-6 pr-4 text-lg font-serif">
                    <p>Started my journey in 2019 and never looked back.</p>
                    <p>Built games, joined hackathons, dabbled in AI, and wandered off-trail.</p>
                    <p>Now crafting in React and React Native—whatever the path demands.</p>
                </p>
            </div>
        </motion.div>

        <motion.div 
            className="bg-transparent aspect-square rounded-xl overflow-hidden max-h-screen md:col-start-6 md:col-end-9 md:row-start-1 md:row-end-4 row-span-2 order-2 mx-auto w-64 h-64 md:w-auto md:h-auto md:max-w-none"
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
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            >
            <motion.img
            src="/assets/other/pic.png"
            animate={{ opacity: isHovering ? 0 : 1,  x: isHovering ? "100%" : 0}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute w-full h-full object-cover"
            />

            <motion.img
            src="/assets/other/pic2.png"
            animate={{ opacity: isHovering ? 1 : "50%", x: isHovering ? 0 : "-100%"}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute w-full h-full object-cover"
            />
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
                <div className="bg-black bg-opacity-30 rounded-full p-2">
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
            </div>
            
            {/* Arrow that appears on hover */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className="bg-black bg-opacity-30 rounded-full p-2">
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
                <div className="bg-black bg-opacity-30 rounded-full p-2">
                    <ArrowUpRight size={24} className="text-white" />
                </div>
            </div>
        </motion.a>
        </div>   
    </div>
    );
};

export default Landing;