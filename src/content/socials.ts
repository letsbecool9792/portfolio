export const GITHUB_USERNAME = "letsbecool9792";
export const DISCORD_ID = "672367440977592350";

export const PROFILES = {
    github: `https://github.com/${GITHUB_USERNAME}`,
    youtube: "https://www.youtube.com/@letsbecool9792",
    x: "https://twitter.com/letsbecool9792",
    linkedin: "https://www.linkedin.com/in/letsbecool9792",
    discord: `https://discordapp.com/users/${DISCORD_ID}`,
    instagram: "https://www.instagram.com/letsbecool9792",
    twitch: "https://www.twitch.tv/letsbecool9792",
    bluesky: "https://bsky.app/profile/letsbecool.bsky.social",
    itch: "https://letsbecool.itch.io",
};

/** Card fills — deepened brand colours so nine of them still read as one set. */
export const ACCENTS = {
    github: "#161b22",
    youtube: "#a32b28",
    x: "#16181c",
    linkedin: "#0a66c2",
    discord: "#5865f2",
    instagram: "#b5347e",
    twitch: "#772ce8",
    bluesky: "#1185fe",
    itch: "#e0504f",
};

export const timeAgo = (iso: string) => {
    const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (minutes < 60) return `${Math.max(minutes, 1)}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return months < 12 ? `${months}mo ago` : `${Math.floor(months / 12)}y ago`;
};
