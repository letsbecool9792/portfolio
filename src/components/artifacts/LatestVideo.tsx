import { useEffect, useState } from "react";

type Video = { videoId: string; title: string; published: string };

/**
 * Reads the newest upload through `/api/youtube`, which proxies the channel's
 * RSS feed (YouTube serves it without CORS headers, so the browser can't).
 * The proxy only exists on Vercel, so this falls back gracefully under `vite dev`.
 */
const LatestVideo = () => {
    const [video, setVideo] = useState<Video | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let active = true;
        fetch("/api/youtube")
            .then(res => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
            .then(data => {
                if (!active) return;
                if (data?.videoId) setVideo(data as Video);
                else setFailed(true);
            })
            .catch(() => active && setFailed(true));
        return () => {
            active = false;
        };
    }, []);

    if (failed) {
        return (
            <p className="my-auto text-center font-serif text-sm text-white/80">
                Latest upload isn't loading — open the channel.
            </p>
        );
    }

    if (!video) {
        return <div className="aspect-video w-full animate-pulse rounded-lg bg-white/10" aria-hidden="true" />;
    }

    return (
        <div className="flex h-full min-h-0 flex-col">
            {/* `hqdefault` is 480x360 with letterbox bars baked in, which is what made
                the thumbnail look mis-proportioned. `maxresdefault` is a true 16:9
                frame, falling back to `mqdefault` (also 16:9) when a video has no HD.

                It takes the leftover height rather than a fixed `aspect-video`, which
                overflowed the card and pushed the title out of sight. `object-cover`
                centre-crops the 16:9 source, so it still never looks stretched. */}
            <img
                src={`https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`}
                alt={video.title}
                loading="lazy"
                onError={event => {
                    const img = event.currentTarget;
                    if (img.dataset.fallback) return;
                    img.dataset.fallback = "1";
                    img.src = `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`;
                }}
                className="min-h-0 w-full flex-1 rounded-lg border-2 border-black/40 object-cover"
            />
            <h3 className="mt-2 line-clamp-2 shrink-0 font-serif text-sm font-bold leading-snug text-white">
                {video.title}
            </h3>
        </div>
    );
};

export default LatestVideo;
