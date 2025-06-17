import { useState, useEffect } from "react";
import ReturnHomeButton from "../components/ReturnHomeButton";
import { motion } from "framer-motion";

const Projects = () => {
    type Project = {
        title: string;
        desc: string;
        img: string;
        link: string;
    };

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/projects.json')
            .then(res => res.json())
            .then(data => setProjects(data as Project[]))
            .catch(err => console.error('Failed to load projects data:', err));
    }, []);

    return (
    <div
        className="min-h-screen flex flex-col items-center p-4 md:p-8 relative"
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-pixel text-center">Projects</h1>
            <p className="text-sm md:text-base lg:text-lg font-serif mt-2 text-gray-700 text-center">A journey through my development adventures</p>
        </div>

        <div className="max-w-4xl mx-auto mt-12 z-10 w-full px-4">
            <div className="space-y-8">
                {projects.map((proj, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40}} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 40 }}
                        viewport={{ amount: 0.3 }} 
                        transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
                        className="bg-no-repeat bg-cover text-black shadow-lg rounded-xl overflow-hidden w-full mx-auto"
                        style={{
                            backgroundImage: `url('/assets/other/projects_card.png')`, 
                            imageRendering: 'pixelated',
                            width: '600px',
                            height: '300px'
                        }}
                    >
                        <div className="flex h-full min-h-[200px]">
                            {/* Image Section */}
                            <div className="w-5/13 pl-10 flex items-center justify-center">
                                <div className="w-50 h-50 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden shadow-md flex items-center justify-center">
                                    <img 
                                        src={proj.img} 
                                        alt={proj.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const span = target.nextElementSibling as HTMLElement;
                                            if (span) span.style.display = 'block';
                                        }}
                                        onLoad={(e) => {
                                            const span = e.currentTarget.nextElementSibling as HTMLElement;
                                            if (span) span.style.display = 'none';
                                        }}
                                    />
                                    <span className="text-gray-600 font-serif text-sm">Preview</span>
                                </div>
                            </div>
                            
                            {/* Content Section */}
                            <div className="w-8/13 py-2 pl-6 pr-10 flex flex-col justify-center relative">
                                <h2 className="text-4xl font-pixel2 mb-3 text-black">{proj.title}</h2>
                                <p className="text-base font-serif text-gray-800 leading-relaxed mb-4">{proj.desc}</p>
                                <a
                                    href={proj.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute bottom-13 right-13 w-30 h-10 transition-all duration-200 group"
                                >
                                    <img 
                                        src="assets/other/button_rectangle_depth_flat.png" 
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-200"
                                    />
                                    <img 
                                        src="assets/other/button_rectangle_depth_gloss.png" 
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    />
                                    <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-semibold text-black pointer-events-none">
                                        View Project →
                                    </span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        <ReturnHomeButton />
    </div>
    );
};

export default Projects;