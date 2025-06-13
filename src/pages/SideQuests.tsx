import { useState, useEffect } from "react";
import { motion } from "motion/react"
import ReturnHomeButton from "../components/ReturnHomeButton";

const SideQuests = () => {
    type SideQuest = {
        title: string;
        desc: string;
        img: string;
    };

    const [sideQuests, setSideQuests] = useState<SideQuest[]>([]);

    useEffect(() => {
        fetch('/sideQuests.json')
            .then(res => res.json())
            .then(data => setSideQuests(data as SideQuest[]))
            .catch(err => console.error('Failed to load side quests data:', err));
    }, []);

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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-pixel text-center">SideQuests</h1>
                <p className="text-sm md:text-base lg:text-lg font-serif mt-2 text-gray-700 text-center">Because sticking to the main path is for NPCs</p>
            </div>

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 z-10">
                {sideQuests.map((quest, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 40, rotate: i % 2 === 0 ? 3 : -3 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ rotate: 0 }}
                        viewport={{ amount: 0.1 }}
                        transition={{
                            opacity: { delay: i % 3 === 0 ? 0.2 : (i % 3 === 1 ? 0.4 : 0.6), duration: 0.7, ease: "easeOut" }, // for whileInView
                            x: { duration: 0.7, ease: "easeInOut" },       // for whileInView
                            rotate: { duration: 0.5, ease: "anticipate" },  // for whileHover
                        }}
                        className="relative bg-no-repeat bg-cover text-black shadow-xl rounded-xl p-12 max-w-xs h-[460px] w-[320px] font-serif flex flex-col justify-center"
                        style={{
                            backgroundImage: `url('/assets/other/cardbg.png')`, 
                            imageRendering: 'crisp-edges',
                        }}
                        >
                        <img src={quest.img} className="w-full h-60 object-cover rounded-md mb-4" />
                        <h2 className="text-lg font-bold mb-1">{quest.title}</h2>
                        <p className="text-sm">{quest.desc}</p>
                    </motion.div>
                ))}
            </div>

            <ReturnHomeButton />

        </div>
    );
}

export default SideQuests;