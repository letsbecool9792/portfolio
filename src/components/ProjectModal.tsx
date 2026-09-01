import Modal from "./Modal";
import ProjectDetail from "./ProjectDetail";
import type { Project } from "../content/projects";

type ProjectModalProps = {
    project: Project | null;
    onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => (
    <Modal open={Boolean(project)} onClose={onClose}>
        {project && <ProjectDetail project={project} />}
    </Modal>
);

export default ProjectModal;
