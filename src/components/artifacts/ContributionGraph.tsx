import { useEffect, useMemo, useRef, useState } from "react";
import { GITHUB_USERNAME } from "../../content/socials";
import LatestCommit from "./LatestCommit";

const ENDPOINT = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

type Day = { date: string; count: number; level: number };

// Drawn from raw JSON rather than an embedded third-party image, so the palette
// is ours. Tuned to read against the dark card behind it.
const LEVEL_COLORS = ["#21262d", "#0e4429", "#006d32", "#26a641", "#39d353"];

const ROWS = 7;
const GAP = 2;
// Cells are measured to fill whatever space the card gives, rather than fixed:
// a fixed size left dead space under the commit line whenever the card grew.
const MIN_CELL = 6;
const MAX_CELL = 22;

const ContributionGraph = () => {
    const [graph, setGraph] = useState<{ days: Day[]; total: number } | null>(null);
    const [failed, setFailed] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let active = true;
        fetch(ENDPOINT)
            .then(res => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
            .then(data => {
                if (!active) return;
                const days = data.contributions as Day[];
                // The API's yearly total spans a slightly wider window than the 365
                // days it returns, and it's the figure GitHub itself shows — so prefer
                // it over summing, which would disagree with the profile page.
                const total = data.total?.lastYear ?? days.reduce((sum, day) => sum + day.count, 0);
                setGraph({ days, total });
            })
            .catch(() => active && setFailed(true));
        return () => {
            active = false;
        };
    }, []);

    const weeks = useMemo(() => {
        const days = graph?.days;
        if (!days?.length) return [];
        // Pad so every column starts on Sunday, the way GitHub lays it out.
        const lead = new Date(days[0].date).getUTCDay();
        const cells: (Day | null)[] = [...Array<null>(lead).fill(null), ...days];
        const out: (Day | null)[][] = [];
        for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7));
        return out;
    }, [graph]);

    // Square cells sized to fill the box on whichever axis runs out first, so the
    // graph grows into a taller card instead of leaving a gap under it.
    const [cell, setCell] = useState(9);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el || weeks.length === 0) return;

        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            const byHeight = (height - (ROWS - 1) * GAP) / ROWS;
            const byWidth = (width - (weeks.length - 1) * GAP) / weeks.length;
            const fitted = Math.floor(Math.min(byHeight, byWidth));
            setCell(Math.max(MIN_CELL, Math.min(MAX_CELL, fitted)));
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, [weeks.length]);

    // Newest weeks sit on the right, so start scrolled there when space is tight
    // enough that MIN_CELL still overflows (narrow phones).
    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollLeft = el.scrollWidth;
    }, [weeks, cell]);

    return (
        <div className="flex h-full min-h-0 flex-col">
            <div className="flex shrink-0 items-baseline justify-between gap-3">
                <span className="font-mono text-xs text-slate-400">github activity</span>
                {graph && (
                    <span className="font-mono text-xs text-slate-200">
                        <strong className="font-semibold">{graph.total}</strong> this year
                    </span>
                )}
            </div>

            {failed ? (
                <p className="my-auto text-center font-serif text-sm text-slate-400">
                    Couldn't reach the contribution data right now.
                </p>
            ) : !graph ? (
                <div className="mt-2 min-h-0 flex-1 animate-pulse rounded-lg bg-white/5" aria-hidden="true" />
            ) : (
                <div
                    ref={scrollRef}
                    className="no-scrollbar mt-2 flex min-h-0 flex-1 items-center overflow-x-auto overflow-y-hidden"
                >
                    <div className="inline-flex" style={{ gap: GAP }}>
                        {weeks.map((week, w) => (
                            <div key={w} className="flex shrink-0 flex-col" style={{ gap: GAP }}>
                                {week.map((day, d) => (
                                    <div
                                        key={d}
                                        className="rounded-[2px]"
                                        style={{
                                            width: cell,
                                            height: cell,
                                            backgroundColor: day ? LEVEL_COLORS[day.level] : "transparent",
                                        }}
                                        title={day ? `${day.count} on ${day.date}` : undefined}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-1.5 shrink-0 border-t border-white/10 pb-1 pt-2">
                <LatestCommit />
            </div>
        </div>
    );
};

export default ContributionGraph;
