import { motion } from "framer-motion";
import type { Project } from "../../content/projects";

/**
 * The desktop card art (`projects_card.jpg`) is a fixed 2:1 frame, so it can
 * neither stretch nor crop onto a tall single-column card. These are the same
 * colours sampled out of that frame, redrawn in CSS so the panel works at any
 * height — and without pulling a 1.5 MB PNG over mobile data.
 */
const PANEL_BORDER = "#1f487e";
const PANEL_BEVEL = "#3166af";
const PANEL_FILL = "#80b0e8";
const PANEL_GRID = "#5898d8";

const panelSurface = {
    backgroundColor: PANEL_FILL,
    backgroundImage: `
        repeating-linear-gradient(0deg, ${PANEL_GRID} 0 2px, transparent 2px 44px),
        repeating-linear-gradient(90deg, ${PANEL_GRID} 0 2px, transparent 2px 44px)
    `,
};

type ProjectCardProps = {
    project: Project;
    onSelect: (project: Project) => void;
};

const ProjectCard = ({ project, onSelect }: ProjectCardProps) => (
    <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="overflow-hidden rounded-xl border-4 shadow-lg"
        style={{ borderColor: PANEL_BORDER }}
    >
        <div className="border-2 p-4" style={{ borderColor: PANEL_BEVEL, ...panelSurface }}>
            <img
                src={project.img}
                alt={`${project.title} — ${project.desc}`}
                loading="lazy"
                className="mb-4 aspect-[4/3] w-full rounded-lg border-2 object-cover shadow-md"
                style={{ borderColor: PANEL_BEVEL }}
            />

            <h3 className="font-pixel2 text-3xl text-black">{project.title}</h3>
            <p className="mt-2 font-serif text-base leading-relaxed text-gray-900">{project.desc}</p>

            <button
                onClick={() => onSelect(project)}
                className="group relative mt-4 h-12 w-full max-w-[200px]"
            >
                <img
                    src="/assets/other/button_rectangle_depth_flat.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-fill group-active:opacity-0"
                />
                <img
                    src="/assets/other/button_rectangle_depth_gloss.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-fill opacity-0 group-active:opacity-100"
                />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold text-black">
                    View Project →
                </span>
            </button>
        </div>
    </motion.article>
);

type ProjectsMobileProps = {
    highlighted: Project[];
    regular: Project[];
    onSelect: (project: Project) => void;
};

const ProjectsMobile = ({ highlighted, regular, onSelect }: ProjectsMobileProps) => {
    const sections = [
        { title: "Highlight Projects", items: highlighted },
        { title: "Other Projects", items: regular },
    ].filter(section => section.items.length > 0);

    return (
        <div className="w-full pb-28">
            {sections.map(section => (
                <section key={section.title} className="mt-10">
                    <h2 className="mb-5 font-pixel text-xl text-black drop-shadow-md">{section.title}</h2>
                    <div className="flex flex-col gap-6">
                        {section.items.map(project => (
                            <ProjectCard key={project.title} project={project} onSelect={onSelect} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default ProjectsMobile;
