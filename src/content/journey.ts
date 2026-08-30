import { useEffect, useState } from "react";

export type TimelineEvent = {
    title: string;
    subtext: string;
    image: string;
    link: {
        text: string;
        url: string;
    };
};

/** Single source of truth for timeline content, shared by both Journey layouts. */
export const useTimelineEvents = () => {
    const [events, setEvents] = useState<TimelineEvent[]>([]);

    useEffect(() => {
        fetch('/timelineEvents.json')
            .then(res => res.json())
            .then(data => setEvents(data as TimelineEvent[]))
            .catch(err => console.error('Failed to load timeline data:', err));
    }, []);

    return events;
};
