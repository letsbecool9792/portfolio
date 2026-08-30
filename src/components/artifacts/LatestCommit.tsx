import { GitCommitHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { GITHUB_USERNAME, timeAgo } from "../../content/socials";

type Commit = { message: string; date: string };

/**
 * GitHub stopped including commit details in the public events payload, so this
 * takes two hops: find the most recent PushEvent to learn the repo, then read
 * that repo's newest commit. Both endpoints are public and CORS-open.
 */
const LatestCommit = () => {
    const [commit, setCommit] = useState<Commit | null>(null);

    useEffect(() => {
        let active = true;

        const load = async () => {
            const events = await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
            ).then(res => (res.ok ? res.json() : Promise.reject(new Error("events"))));

            const push = (events as { type: string; repo: { name: string } }[]).find(
                event => event.type === "PushEvent",
            );
            if (!push) throw new Error("no recent push");

            const commits = await fetch(
                `https://api.github.com/repos/${push.repo.name}/commits?per_page=1`,
            ).then(res => (res.ok ? res.json() : Promise.reject(new Error("commits"))));

            const latest = commits[0];
            if (!active || !latest) return;
            setCommit({
                message: latest.commit.message.split("\n")[0],
                date: latest.commit.author.date,
            });
        };

        load().catch(() => {
            /* The commit line is a bonus; the graph above still stands on its own. */
        });
        return () => {
            active = false;
        };
    }, []);

    if (!commit) return null;

    // Deliberately one line: the card is height-constrained, and a second line
    // pushed this past the bottom edge where it got clipped.
    return (
        <div className="flex min-w-0 items-center gap-2">
            <GitCommitHorizontal size={16} className="shrink-0 text-slate-500" />
            <p className="truncate font-mono text-xs text-slate-200">{commit.message}</p>
            <span className="shrink-0 font-mono text-[11px] text-slate-500">{timeAgo(commit.date)}</span>
        </div>
    );
};

export default LatestCommit;
