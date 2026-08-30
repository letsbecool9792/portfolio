// YouTube's RSS feed serves no CORS headers, so the browser can't read it directly.
// This proxies the feed and returns just the newest video. Edge runtime keeps it
// dependency-free; the response is cached at the edge so the feed isn't hit per visitor.
export const config = { runtime: "edge" };

const CHANNEL_ID = "UCgnMGbWGe_trMg8WBYAoZYA";
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const ENTITIES: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
};

const decode = (value: string) =>
    value.replace(/&(?:amp|lt|gt|quot|#39);/g, match => ENTITIES[match] ?? match).trim();

const pick = (xml: string, tag: string) => {
    const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
    return match ? decode(match[1]) : "";
};

export default async function handler() {
    try {
        const feed = await fetch(FEED, { headers: { "User-Agent": "suparno.me" } });
        if (!feed.ok) throw new Error(`feed responded ${feed.status}`);

        const xml = await feed.text();
        // The channel has its own <title> before the entries, so start at the first entry.
        const start = xml.indexOf("<entry>");
        if (start === -1) throw new Error("feed had no entries");
        const entry = xml.slice(start, xml.indexOf("</entry>", start));

        const videoId = pick(entry, "yt:videoId");
        if (!videoId) throw new Error("entry had no video id");

        return Response.json(
            { videoId, title: pick(entry, "title"), published: pick(entry, "published") },
            { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
        );
    } catch {
        return Response.json({ error: "unavailable" }, { status: 502 });
    }
}
