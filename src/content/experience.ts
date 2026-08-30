import { useEffect, useState } from "react";

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
export const useExperience = () => {
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        fetch('/experience.json')
            .then(res => res.json())
            .then(data => setRoles(data as Role[]))
            .catch(err => console.error('Failed to load experience data:', err));
    }, []);

    return roles;
};
