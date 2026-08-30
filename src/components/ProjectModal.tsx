import Modal from "./Modal";

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

const ProjectModal = ({ project, onClose }: ProjectModalProps) => (
    <Modal open={Boolean(project)} onClose={onClose}>
        {project && (
            <>
                {/* Project Image */}
                <div className="w-full aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden shadow-lg mb-6">
                    <img
                        src={project.modalImg}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <h2 className="text-3xl md:text-5xl font-pixel2 mb-4 text-black">{project.title}</h2>

                <p className="text-lg font-serif text-gray-700 mb-4">{project.desc}</p>

                <div className="mb-6">
                    <h3 className="text-lg md:text-2xl font-pixel mb-3 text-black">About</h3>
                    <p className="text-base font-serif text-gray-800 leading-relaxed">
                        {project.longDesc}
                    </p>
                </div>

                {project.techStack && project.techStack.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg md:text-2xl font-pixel mb-3 text-black">Tech Stack</h3>
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
            </>
        )}
    </Modal>
);

export default ProjectModal;
