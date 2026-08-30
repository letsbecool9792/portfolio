import { motion } from "framer-motion";
import type { Project } from "../../content/projects";

type ProjectCardProps = {
    proj: Project;
    index: number;
    onSelect: (project: Project) => void;
};

// Relics surfacing: each card is dug up from below with a slight tilt that
// settles, staggered so they arrive one after another rather than all at once.
const cardVariants = {
    hidden: { opacity: 0, y: 48, scale: 0.94, rotate: -1.5 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: { delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
};

// Hoisted out of the page component: defining it inline remounted every card on
// each render, restarting their entrance animations.
const ProjectCard = ({ proj, index, onSelect }: ProjectCardProps) => (
    <motion.div
        variants={cardVariants}
        custom={index}
        initial="hidden"
        animate="visible"
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
                    onClick={() => onSelect(proj)}
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

type ProjectsDesktopProps = {
    highlighted: Project[];
    regular: Project[];
    onSelect: (project: Project) => void;
};

const ProjectsDesktop = ({ highlighted, regular, onSelect }: ProjectsDesktopProps) => (
    <>
        {highlighted.length > 0 && (
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
                    {highlighted.map((proj, i) => (
                        <ProjectCard key={proj.title} proj={proj} index={i} onSelect={onSelect} />
                    ))}
                </div>
            </div>
        )}

        {regular.length > 0 && (
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
                    {regular.map((proj, i) => (
                        // Offset so the second section continues the cascade instead of
                        // restarting it while the first is still arriving.
                        <ProjectCard
                            key={proj.title}
                            proj={proj}
                            index={highlighted.length + i}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            </div>
        )}
    </>
);

export default ProjectsDesktop;
