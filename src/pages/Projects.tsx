import { useState } from "react";
import { motion } from "framer-motion";
import ReturnHomeButton from "../components/ReturnHomeButton";
import ProjectModal from "../components/ProjectModal";
import PageBackground from "../components/PageBackground";
import ExperienceSection from "../components/ExperienceSection";
import { backgroundStyle } from "../styles/background";
import { useProjects, type Project } from "../content/projects";
import { useIsMobile } from "../hooks/useIsMobile";
import ProjectsDesktop from "./projects/ProjectsDesktop";
import ProjectsMobile from "./projects/ProjectsMobile";

const Projects = () => {
    const { highlighted, regular } = useProjects();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const isMobile = useIsMobile();

    return (
    <>
    <div
        className="min-h-screen flex flex-col items-center p-4 md:p-8 relative"
        style={isMobile ? undefined : { ...backgroundStyle("grass"), backgroundAttachment: "fixed, fixed, fixed" }}
    >
        {isMobile && <PageBackground />}

        <div className="flex flex-col items-center mt-8 md:mt-10">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-pixel text-center drop-shadow-lg"
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

        <ExperienceSection />

        {isMobile ? (
            <ProjectsMobile highlighted={highlighted} regular={regular} onSelect={setSelectedProject} />
        ) : (
            <ProjectsDesktop highlighted={highlighted} regular={regular} onSelect={setSelectedProject} />
        )}

        <ReturnHomeButton />

        {/* View Resume Button */}
        <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-32 h-11 md:w-40 md:h-12 transition-all duration-200 group"
        >
            <img
                src="/assets/other/button_rectangle_depth_flat_y.png"
                alt=""
                className="absolute inset-0 w-full h-full object-fill group-hover:opacity-0 transition-opacity duration-200"
            />
            <img
                src="/assets/other/button_rectangle_depth_gloss_y.png"
                alt=""
                className="absolute inset-0 w-full h-full object-fill opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs md:text-sm font-mono font-semibold text-black pointer-events-none">
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
