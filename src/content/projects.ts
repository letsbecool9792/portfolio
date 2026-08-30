import { useEffect, useMemo, useState } from "react";

export type Project = {
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

/** Single source of truth for project content, shared by both Projects layouts. */
export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/projects.json')
            .then(res => res.json())
            .then(data => setProjects(data as Project[]))
            .catch(err => console.error('Failed to load projects data:', err));
    }, []);

    return useMemo(() => ({
        highlighted: projects.filter(p => p.highlighted),
        regular: projects.filter(p => !p.highlighted),
    }), [projects]);
};
