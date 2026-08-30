import type { CSSProperties, ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const ExternalLink = ({ href, children, className, style }: ExternalLinkProps) => (
    <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    style={style}
    >
        {children}
    </a>
);

export default ExternalLink;
