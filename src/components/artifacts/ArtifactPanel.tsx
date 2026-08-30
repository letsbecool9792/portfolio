import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type ArtifactPanelProps = {
    title: string;
    icon: ReactNode;
    color: string;
    href: string;
    className?: string;
    /** Omit for a compact tile: centred icon and label, no header or body. */
    children?: ReactNode;
};

/**
 * One slot in the artifact inventory. The whole card carries the platform colour
 * rather than a white body with a coloured header, so nine of them read as a set
 * of inventory items instead of a wall of paper.
 */
const ArtifactPanel = ({ title, icon, color, href, className = "", children }: ArtifactPanelProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex min-h-0 flex-col overflow-hidden rounded-xl border-4 border-slate-900 shadow-lg transition-transform duration-200 hover:-translate-y-1 active:translate-y-0.5 ${className}`}
        style={{ backgroundColor: color }}
    >
        {children ? (
            <>
                <header className="flex shrink-0 items-center gap-2 border-b-2 border-black/25 px-3 py-2 text-white">
                    <span className="flex shrink-0 items-center">{icon}</span>
                    <h2 className="font-pixel text-[10px] leading-tight">{title}</h2>
                    <ArrowUpRight size={14} className="ml-auto shrink-0 opacity-60" />
                </header>
                <div className="min-h-0 flex-1 p-3">{children}</div>
            </>
        ) : (
            // A desktop min-height would exceed the fixed grid row, overflowing the
            // panel's `overflow-hidden` — which pushed the icon low and clipped the
            // label off entirely. Only mobile, where rows are auto-sized, needs one.
            <div className="flex h-full min-h-[4.5rem] flex-col items-center justify-center gap-1.5 p-2 text-white md:min-h-0">
                <span className="transition-transform duration-200 group-hover:scale-110">{icon}</span>
                <span className="text-center font-pixel text-[10px] leading-tight">{title}</span>
            </div>
        )}
    </a>
);

export default ArtifactPanel;
