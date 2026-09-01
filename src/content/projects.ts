import data from "./projects.json";

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
export const PROJECTS = data as Project[];

/** The `highlighted` flag splits the page into Highlight and Other sections. */
export const HIGHLIGHTED_PROJECTS = PROJECTS.filter(project => project.highlighted);
export const OTHER_PROJECTS = PROJECTS.filter(project => !project.highlighted);

