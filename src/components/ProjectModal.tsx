import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type ProjectModalProps = {
    project: {
        title: string;
        desc: string;
        longDesc: string;
        img: string;
        modalImg: string;
        github: string;
        liveLink: string;
        techStack: string[];
    } | null;
    onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);

    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative flex flex-col"
                    style={{
                        backgroundImage: `url('/assets/other/modal_background.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        imageRendering: 'pixelated'
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg z-10 font-bold text-xl"
                    >
                        ×
                    </button>

                    <div 
                        className="p-8 md:p-10 overflow-y-auto max-h-[90vh]"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {/* Project Image */}
                        <div className="w-full aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden shadow-lg mb-6">
                            <img 
                                src={project.modalImg} 
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Title */}
                        <h2 className="text-4xl md:text-5xl font-pixel2 mb-4 text-black">
                            {project.title}
                        </h2>

                        {/* Short Description */}
                        <p className="text-lg font-serif text-gray-700 mb-4">
                            {project.desc}
                        </p>

                        {/* Long Description */}
                        <div className="mb-6">
                            <h3 className="text-2xl font-pixel mb-3 text-black">About</h3>
                            <p className="text-base font-serif text-gray-800 leading-relaxed">
                                {project.longDesc}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        {project.techStack && project.techStack.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-2xl font-pixel mb-3 text-black">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, idx) => (
                                        <span 
                                            key={idx}
                                            className="px-4 py-2 bg-blue-500 text-white font-mono text-sm rounded-lg shadow-md"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Links */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative w-40 h-12 transition-all duration-200 group"
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
                                    <span className="absolute inset-0 flex items-center justify-center text-sm font-mono font-semibold text-black pointer-events-none">
                                        GitHub →
                                    </span>
                                </a>
                            )}
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative w-40 h-12 transition-all duration-200 group"
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
                                    <span className="absolute inset-0 flex items-center justify-center text-sm font-mono font-semibold text-black pointer-events-none">
                                        Live Demo →
                                    </span>
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
