import { motion } from "framer-motion";
import { useState } from "react";
import ExternalLink from "./ExternalLink";
import RoleModal from "./RoleModal";
import type { Role, ShippedProduct } from "../content/experience";
import { EXPERIENCE } from "../content/experience";
import { useIsMobile } from "../hooks/useIsMobile";
import { PANEL_BEVEL, PANEL_BORDER, frame, panelSurface } from "../styles/panel";

/** Small outbound pill — the border colour is a shared token, so it's set inline. */
const ChipLink = ({ href, label }: { href: string; label: string }) => (
    <ExternalLink
        href={href}
        className="rounded border-2 bg-white/80 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-blue-900 transition-colors hover:bg-white active:bg-white"
        style={{ borderColor: PANEL_BORDER }}
    >
        {label} ↗
    </ExternalLink>
);

/** A shipped app: icon, what it is, and every place you can go look at it. */
const ProductTile = ({ product }: { product: ShippedProduct }) => (
    <div
        className="flex gap-3 rounded-lg p-3"
        style={{ border: `2px solid ${PANEL_BEVEL}`, ...panelSurface }}
    >
        <img
            src={product.icon}
            alt={`${product.name} app icon`}
            loading="lazy"
            width={72}
            height={72}
            className="h-14 w-14 shrink-0 rounded-xl shadow-md sm:h-16 sm:w-16"
            style={{ border: `2px solid ${PANEL_BORDER}` }}
        />
        <div className="min-w-0">
            <h4 className="font-pixel2 text-2xl leading-none text-blue-950">{product.name}</h4>
            <p className="mt-1 font-serif text-sm leading-snug text-gray-900">{product.tagline}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
                {product.links.map(link => (
                    <ChipLink key={link.url} href={link.url} label={link.label} />
                ))}
            </div>
        </div>
    </div>
);

type RoleCardProps = {
    role: Role;
    isMobile: boolean;
    onSelect: (role: Role) => void;
};

const RoleCard = ({ role, isMobile, onSelect }: RoleCardProps) => (
    <motion.article
        initial={isMobile ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl p-5 shadow-lg sm:p-7"
        style={{ ...frame, backgroundColor: "rgba(255,255,255,0.94)" }}
    >
        <header className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0">
                <h3 className="font-pixel2 text-3xl leading-tight text-blue-900 sm:text-4xl">
                    {role.role}
                </h3>
                <p className="mt-1 font-serif text-base text-gray-800 sm:text-lg">{role.company}</p>
            </div>
            <p className="shrink-0 font-mono text-xs text-gray-600 sm:text-right sm:text-sm">
                {role.period}
                <span className="sm:block"> · {role.location}</span>
            </p>
        </header>

        <p className="mt-4 font-serif text-base leading-relaxed text-gray-800">{role.summary}</p>

        {role.products.length > 0 && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {role.products.map(product => (
                    <ProductTile key={product.name} product={product} />
                ))}
            </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
            {role.stack.map(tech => (
                <span
                    key={tech}
                    className="rounded-lg bg-blue-600 px-2.5 py-1 font-mono text-[0.7rem] text-white shadow-sm sm:text-xs"
                >
                    {tech}
                </span>
            ))}
        </div>

        {/* The highlights live behind this rather than on the card, so a list of
            roles stays scannable — same treatment the relics get. */}
        {role.highlights.length > 0 && (
            <button
                onClick={() => onSelect(role)}
                className="group relative mt-5 h-12 w-44 transition-all duration-200"
            >
                <img
                    src="/assets/other/button_rectangle_depth_flat.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-fill transition-opacity duration-200 group-hover:opacity-0"
                />
                <img
                    src="/assets/other/button_rectangle_depth_gloss.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-fill opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold text-black">
                    What I did →
                </span>
            </button>
        )}
    </motion.article>
);

/**
 * Professional experience, above the relics. Shared by both Projects layouts —
 * a stack of prose cards has nothing that needs the desktop/mobile fork, so only
 * the entrance animation is gated.
 */
const ExperienceSection = () => {
    const roles = EXPERIENCE;
    const isMobile = useIsMobile();
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    if (roles.length === 0) return null;

    // `md:px-4` matches the relic sections below, which add it on desktop only.
    return (
        <section className="z-10 mx-auto mt-10 w-full max-w-7xl md:mt-12 md:px-4">
            <motion.h2
                className="mb-6 font-pixel text-xl text-black drop-shadow-md sm:text-2xl md:text-3xl"
                initial={isMobile ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
            >
                Professional Experience
            </motion.h2>
            <div className="flex flex-col gap-6">
                {roles.map(role => (
                    <RoleCard
                        key={`${role.company}-${role.role}`}
                        role={role}
                        isMobile={isMobile}
                        onSelect={setSelectedRole}
                    />
                ))}
            </div>

            <RoleModal role={selectedRole} onClose={() => setSelectedRole(null)} />
        </section>
    );
};

export default ExperienceSection;
