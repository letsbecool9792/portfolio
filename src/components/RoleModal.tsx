import InlineText from "./InlineText";
import Modal from "./Modal";
import type { Role } from "../content/experience";

type RoleModalProps = {
    role: Role | null;
    onClose: () => void;
};

/**
 * The detail of what a role actually involved. Lives behind a button rather than
 * on the card so the experience list stays scannable — the same treatment the
 * relics get with "View Project".
 */
const RoleModal = ({ role, onClose }: RoleModalProps) => (
    <Modal open={Boolean(role)} onClose={onClose}>
        {role && (
            <>
                <h2 className="font-pixel2 text-3xl leading-tight text-blue-900 md:text-5xl">
                    {role.role}
                </h2>
                <p className="mt-1 font-serif text-lg text-gray-800">{role.company}</p>
                <p className="mt-1 font-mono text-xs text-gray-600 md:text-sm">
                    {role.period} · {role.location}
                </p>

                <p className="mt-5 font-serif text-base leading-relaxed text-gray-800">
                    {role.summary}
                </p>

                <div className="mt-6">
                    <h3 className="mb-3 font-pixel text-lg text-black md:text-2xl">What I did</h3>
                    <ul className="ml-5 list-disc space-y-2.5 font-serif text-base leading-relaxed text-gray-800 marker:text-blue-600">
                        {role.highlights.map((highlight, i) => (
                            <li key={i}>
                                <InlineText text={highlight} />
                            </li>
                        ))}
                    </ul>
                </div>

                {role.stack.length > 0 && (
                    <div className="mt-6">
                        <h3 className="mb-3 font-pixel text-lg text-black md:text-2xl">Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {role.stack.map(tech => (
                                <span
                                    key={tech}
                                    className="rounded-lg bg-blue-500 px-4 py-2 font-mono text-sm text-white shadow-md"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </>
        )}
    </Modal>
);

export default RoleModal;
