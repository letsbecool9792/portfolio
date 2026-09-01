import type { Project } from "../content/projects";

/** Pixel button used for the outbound project links. */
const LinkButton = ({ href, label }: { href: string; label: string }) => (
    <a
        href={href}
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
            {label}
        </span>
    </a>
);

/**
 * One project's content, as shown in the modal on /projects.
 *
 * Projects deliberately have no page of their own — they'd be the same content at
 * a second URL for no real gain, and the modal is the intended way to read them.
 */
const ProjectDetail = ({ project }: { project: Project }) => {
    return (
        <>
            <div className="w-full aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden shadow-lg mb-6">
                <img
                    src={project.modalImg}
                    alt={`${project.title} — screenshot of the app`}
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

            {project.techStack.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg md:text-2xl font-pixel mb-3 text-black">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tech => (
                            <span
                                key={tech}
                                className="px-4 py-2 bg-blue-500 text-white font-mono text-sm rounded-lg shadow-md"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-4 mt-8">
                {project.github && <LinkButton href={project.github} label="GitHub →" />}
                {project.liveLink && <LinkButton href={project.liveLink} label="Live Demo →" />}
            </div>
        </>
    );
};

export default ProjectDetail;
