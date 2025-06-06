import { useState, useEffect, useRef } from "react";
import ReturnHomeButton from "../components/ReturnHomeButton";

const Journey = () => {
    const [climbingFrame, setClimbingFrame] = useState('a');
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    type TimelineEvent = {
        title: string;
        subtext: string;
        image: string;
        link: {
            text: string;
            url: string;
        };
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimers();
        };
    }, []);

    const clearTimers = () => {
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };

    const resetStopTimer = () => {
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 200);
    };

    const handleScroll = () => {
        if (!isScrolling) setIsScrolling(true);
        resetStopTimer();
    };

    // Effect for managing the climbing animation
    useEffect(() => {
        if (isScrolling) {
            animationIntervalRef.current = setInterval(() => {
            setClimbingFrame(f => (f === 'a' ? 'b' : 'a'));
            }, 150); // swap every 150ms for a smooth animation
        } else {
            if (animationIntervalRef.current) {
            clearInterval(animationIntervalRef.current);
            animationIntervalRef.current = null;
            }
            setClimbingFrame('a'); // reset to initial frame
        }
    }, [isScrolling]);

    // Enhanced timeline events with title, subtext, image, and link
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);

    useEffect(() => {
        fetch('/timelineEvents.json')
        .then(res => res.json())
        .then(data => setTimelineEvents(data as TimelineEvent[]))
        .catch(err => console.error('Failed to load timeline data:', err));
    }, []);

    return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 relative"
        style={{
        backgroundImage: `
            url('/assets/background/background_clouds.svg'),
            url('/assets/background/background_color_trees.svg'),
            url('/assets/background/background_solid_grass.svg')
        `,
        backgroundRepeat: "repeat-x, repeat-x, repeat-x",
        backgroundPosition: "0 0, 0 40%, 0 100%",
        backgroundSize: "auto 33%, auto 33%, auto 100%",
        backgroundAttachment: "fixed, fixed, fixed",
        }}
    >
        <div className="flex flex-col items-center mt-8 md:mt-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-pixel text-center">
            My Developer Journey
        </h1>
        <p className="text-sm md:text-base lg:text-lg font-serif mt-2 text-gray-700 text-center">
            Climb down the ladder. Trace the path.
        </p>
        </div>

        <div className="mt-40">
            <img src="/assets/other/ladder_top.png" className="w-full" />
            <div className="h-[2560px] bg-[url('/assets/other/ladder_middle.png')] bg-repeat-y w-full" />
            <img src="/assets/other/ladder_bottom.png" className="w-full" />

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <img
                    src={
                    isScrolling
                        ? `/assets/other/character_pink_climb_${climbingFrame}.png`
                        : '/assets/other/character_pink_idle.png'
                    }
                    className="w-32 h-32"
                />
            </div>
        </div>

        <div className="w-full max-w-4xl pt-32 mb-10 z-20">
        {timelineEvents.map((event, i) => (
            <div
            key={i}
            className={`
                w-5/12 absolute
                ${i % 2 === 0 ? 'left-0 text-right pr-8' : 'right-0 text-left pl-8'}
            `}
            style={{ top: `${500 + i * 400}px` }}
            >
            <div className="bg-white p-6 rounded-lg shadow-md w-96 inline-block">
                <div className="flex flex-col items-center">
                    <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-80 h-40 object-cover rounded-md mb-4" 
                    />
                </div>
                <h3 className="font-pixel text-lg md:text-xl text-blue-700 mb-2">
                    {event.title}
                </h3>
                <p className="font-serif text-sm md:text-base text-gray-600 mb-3">
                    {event.subtext}
                </p>
                <a 
                    href={event.link.url} 
                    className="font-mono text-sm text-green-600 hover:text-green-800 hover:underline transition-colors"
                >
                    {event.link.text} →
                </a>
            </div>
            </div>
        ))}
        </div>
        <ReturnHomeButton />
    </div>
    );
};

export default Journey;