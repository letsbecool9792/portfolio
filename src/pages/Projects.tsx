import { useState, useEffect } from "react";
import ReturnHomeButton from "../components/ReturnHomeButton";
import ProjectModal from "../components/ProjectModal";
import { motion } from "framer-motion";

const Projects = () => {
    type Project = {
        title: string;
        desc: string;
        longDesc: string;
        img: string;
        modalImg: string;
        github: string;
        liveLink: string;
        techStack: string[];
        highlighted: boolean;
    };

    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        fetch('/projects.json')
            .then(res => res.json())
            .then(data => setProjects(data as Project[]))
            .catch(err => console.error('Failed to load projects data:', err));
    }, []);

    const highlightedProjects = projects.filter(p => p.highlighted);
    const regularProjects = projects.filter(p => !p.highlighted);

    const ProjectCard = ({ proj }: { proj: Project }) => (
        <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-no-repeat bg-cover text-black shadow-lg rounded-xl overflow-hidden cursor-pointer"
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
                    <button
                        onClick={() => setSelectedProject(proj)}
                        className="absolute bottom-13 right-13 w-30 h-10 transition-all duration-200 group"
                    >
                        <img 
                            src="/assets/other/button_rectangle_depth_flat.png" 
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-200"
                        />
                        <img 
                            src="/assets/other/button_rectangle_depth_gloss.png" 
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-semibold text-black pointer-events-none">
                            View Project →
                        </span>
                    </button>
                </div>
            </div>
        </motion.div>
    );

    return (
    <>
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
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-pixel text-center drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Projects
            </motion.h1>
            <motion.p
              className="text-sm md:text-base lg:text-lg font-serif mt-2 text-gray-700 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              A journey through my development adventures
            </motion.p>
        </div>

        {/* Highlight Projects Section */}
        {highlightedProjects.length > 0 && (
            <div className="max-w-7xl mx-auto mt-12 z-10 w-full px-4">
                <motion.h2
                    className="text-2xl md:text-3xl font-pixel mb-8 text-black drop-shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Highlight Projects
                </motion.h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {highlightedProjects.map((proj, i) => (
                        <ProjectCard key={`highlight-${i}`} proj={proj} />
                    ))}
                </div>
            </div>
        )}

        {/* All Projects Section */}
        {regularProjects.length > 0 && (
            <div className="max-w-7xl mx-auto mt-16 z-10 w-full px-4">
                <motion.h2
                    className="text-2xl md:text-3xl font-pixel mb-8 text-black drop-shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Other Projects
                </motion.h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {regularProjects.map((proj, i) => (
                        <ProjectCard key={`regular-${i}`} proj={proj} />
                    ))}
                </div>
            </div>
        )}

        <ReturnHomeButton />

        {/* View Resume Button */}
        <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-40 h-12 transition-all duration-200 group"
        >
            <img 
                src="/assets/other/button_rectangle_depth_flat_y.png" 
                alt=""
                className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-200"
            />
            <img 
                src="/assets/other/button_rectangle_depth_gloss_y.png" 
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
            <span className="absolute inset-0 flex items-center justify-center text-sm font-mono font-semibold text-black pointer-events-none">
                View Resume →
            </span>
        </a>
    </div>

    <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
    />
    </>
    );
};

export default Projects;