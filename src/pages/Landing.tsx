import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";

const Landing = () => {
    return (
    <div className="min-h-screen bg-fixed p-4 md:p-8"
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
        <div className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-5 gap-4 md:gap-8">
        
        <div
            className="md:col-start-1 md:col-end-6 md:row-start-1 md:row-end-4 row-span-2 p-6 rounded-xl"
            style={{
                backgroundImage: "url('/assets/cards/terrain_snow_block_center.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
                imageRendering: "pixelated"
            }}
            >
            <div className="p-4">
                <div className="mb-4">
                <h1 className="text-5xl md:text-4xl font-pixel">Suparno Saha</h1>
                <h2 className="text-2xl md:text-2xl font-pixel mt-2 text-gray-700">Software Developer</h2>
                </div>

                <p className="text-gray-950 mt-6 mb-6 pr-4 text-lg font-serif">
                Started my journey in 2019 and haven’t stopped exploring since. From crafting games and diving into hackathons to experimenting with AI and chasing strange side quests—I’ve always followed curiosity. These days, I roam the lands of React and React Native, building whatever the path demands.
                </p>
            </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden max-h-screen md:col-start-6 md:col-end-9 md:row-start-1 md:row-end-4 row-span-2">
            <img 
                src="/assets/other/pic.png"
                alt="Suparno Saha" 
                className="w-full h-full object-scale-down block"
            />
        </div>

        
        <div className="md:col-start-9 md:col-end-11 md:row-start-1 md:row-end-3 rounded-xl p-6 justify-between"
            style={{
                backgroundImage: "url('/assets/cards/water.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
                imageRendering: "pixelated"
            }}
            >
            <h2 className="text-lg font-pixel mb-4">See Artifacts</h2>
            
            <div className="flex justify-between items-center mb-3">
                <a href="https://github.com/letsbecool9792" className="rounded-full bg-rose-200 p-3 hover:bg-rose-300 transition-colors">
                    <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/letsbecool9792" className="rounded-full bg-rose-200 p-3 hover:bg-rose-300 transition-colors">
                    <Linkedin size={20} />
                </a>
                <a href="https://twitter.com/letsbecool9792" className="rounded-full bg-rose-200 p-3 hover:bg-rose-300 transition-colors">
                    <Twitter size={20} />
                </a>
            </div>
            
            <a href="/artifacts" className="w-full py-2 bg-rose-300 rounded-lg hover:bg-rose-400 transition-colors flex justify-center items-center">
            <span className="mr-2 font-serif">View More</span>
            <ArrowUpRight size={16} />
            </a>
        </div>
        
        <a
            className="md:col-start-1 md:col-end-5 md:row-start-4 md:row-end-6 row-span-2 p-6 rounded-xl cursor-pointer relative overflow-hidden group"
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
        </a>
        
        <a 
            className="md:col-start-5 md:col-end-9 md:row-start-4 md:row-end-6 row-span-2 p-6 rounded-xl cursor-pointer relative overflow-hidden group"
            href="/contact"
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
                <h2 className="text-2xl font-pixel">Contact the Adventurer</h2>
                <p className="text-lg mt-2 text-gray-950 font-serif">Get in touch for collaborations</p>
            </div>
            
            {/* Arrow that appears on hover */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className="bg-black bg-opacity-30 rounded-full p-2">
                    <ArrowUpRight size={24} className="text-white" />
                </div>
            </div>
        </a>
        
        <a 
            className="md:col-start-9 md:col-end-11 md:row-start-3 md:row-end-6 row-span-2 p-6 rounded-xl cursor-pointer relative overflow-hidden group"
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
        </a>
        </div>   
    </div>
    );
};

export default Landing;