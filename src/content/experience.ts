import data from "./experience.json";

export type ShippedProduct = {
    name: string;
    tagline: string;
    icon: string;
    links: { label: string; url: string }[];
};

export type Role = {
    company: string;
    role: string;
    period: string;
    location: string;
    summary: string;
    /** Supports the inline markup in `InlineText` — `**bold**` and `` `code` ``. */
    highlights: string[];
    stack: string[];
    products: ShippedProduct[];
};

/** Single source of truth for professional experience, newest role first. */
export const EXPERIENCE = data as Role[];
