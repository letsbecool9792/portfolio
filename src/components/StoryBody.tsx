import ExternalLink from "./ExternalLink";
import InlineText from "./InlineText";
import type { StoryBlock, StoryListItem } from "../content/blocks";
import { PANEL_BEVEL } from "../styles/panel";

/** The terrain tile from the landing cards, run as a ground line between sections. */
const Divider = () => (
    <div
        aria-hidden="true"
        className="my-8 h-5 w-full rounded-sm"
        style={{
            backgroundImage: "url('/assets/cards/terrain_grass_block_center.png')",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            imageRendering: "pixelated",
            boxShadow: `inset 0 0 0 2px ${PANEL_BEVEL}`,
        }}
    />
);

const Bullet = ({ item }: { item: StoryListItem }) => {
    if (typeof item === "string") {
        return (
            <li className="ml-1">
                <InlineText text={item} />
            </li>
        );
    }

    return (
        <li className="ml-1">
            <InlineText text={item.text} />
            <ul className="mt-2 ml-5 list-[circle] space-y-1.5 marker:text-blue-600">
                {item.items.map(child => (
                    <li key={child}>
                        <InlineText text={child} />
                    </li>
                ))}
            </ul>
        </li>
    );
};

/** A row of pixel buttons for the outbound links a story points at. */
const LinkRow = ({ items }: { items: { text: string; url: string }[] }) => (
    <div className="my-6 flex flex-wrap gap-3">
        {items.map(link => (
            <ExternalLink
                key={link.url}
                href={link.url}
                className="group relative inline-block h-12 min-w-[11rem] px-2"
            >
                <img
                    src="/assets/other/button_rectangle_depth_flat.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-fill transition-opacity duration-200 group-hover:opacity-0 group-active:opacity-0"
                />
                <img
                    src="/assets/other/button_rectangle_depth_gloss.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-fill opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-active:opacity-100"
                />
                <span className="absolute inset-0 flex items-center justify-center px-4 font-mono text-xs font-semibold text-black sm:text-sm">
                    {link.text} →
                </span>
            </ExternalLink>
        ))}
    </div>
);

/** Renders a story body. Block types are closed, so an unknown one is a type error, not a blank page. */
const StoryBody = ({ blocks }: { blocks: StoryBlock[] }) => (
    <div className="font-serif text-base leading-relaxed text-gray-800 sm:text-lg sm:leading-8">
        {blocks.map((block, i) => {
            switch (block.type) {
                case "h":
                    return (
                        <h2
                            key={i}
                            className="mt-8 mb-3 font-pixel text-sm leading-relaxed text-blue-900 first:mt-0 sm:text-base"
                        >
                            {block.text}
                        </h2>
                    );
                case "hr":
                    return <Divider key={i} />;
                case "ul":
                    return (
                        <ul key={i} className="my-5 ml-5 list-disc space-y-2.5 marker:text-blue-600">
                            {block.items.map((item, j) => (
                                <Bullet key={j} item={item} />
                            ))}
                        </ul>
                    );
                case "links":
                    return <LinkRow key={i} items={block.items} />;
                case "p":
                default:
                    return (
                        <p key={i} className="my-4">
                            <InlineText text={block.text} />
                        </p>
                    );
            }
        })}
    </div>
);

export default StoryBody;
