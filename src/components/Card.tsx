import React from "react";
import { ArrowUpRight } from "lucide-react";

type CardProps = {
    title: string;
    description: string;
    href?: string;
    onClick?: () => void;
    bgClass?: string;
    hoverBgClass?: string;
};

const Card: React.FC<CardProps> = ({
        title,
        description,
        href,
        onClick,
        bgClass = "bg-white",
        hoverBgClass = "hover:bg-gray-100",
    }) => {
    const baseClasses = `${bgClass} rounded-xl p-6 flex flex-col justify-between transition-colors cursor-pointer ${hoverBgClass}`;

    const content = (
    <>
        <h2 className="text-2xl font-medium font-pixel">{title}</h2>
        <p className="text-sm mt-2 text-gray-700">{description}</p>
        <div className="flex justify-end items-center mt-4">
        <div className="rounded-full bg-gray-200 p-2 rendering-pixelated">
            <ArrowUpRight size={16} />
        </div>
        </div>
    </>
    );

    if (href) {
    return (
        <a href={href} className={baseClasses}>
        {content}
        </a>
    );
    }

    return (
    <div onClick={onClick} className={baseClasses}>
        {content}
    </div>
    );
};

export default Card;