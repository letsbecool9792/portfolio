import { motion } from "framer-motion";
import ReturnHomeButton from "../components/ReturnHomeButton";
import { useTimelineEvents } from "../content/journey";
import { useClimbAnimation } from "../hooks/useClimbAnimation";
import { useIsMobile } from "../hooks/useIsMobile";
import PageBackground from "../components/PageBackground";
import { backgroundStyle } from "../styles/background";
import JourneyDesktop from "./journey/JourneyDesktop";
import JourneyMobile from "./journey/JourneyMobile";

/**
 * Owns the shared page chrome and picks a timeline layout. The two variants are
 * purely presentational — content and scroll behaviour live in shared hooks so
 * the copy has one home.
 */
const Journey = () => {
    const events = useTimelineEvents();
    const isMobile = useIsMobile();
    const spriteSrc = useClimbAnimation();

    return (
        <div
            // `overflow-x-hidden` is desktop-only: it clips the absolutely placed
            // cards there, but it would also turn this into a scroll container and
            // break the mobile variant's sticky sprite.
            className={`min-h-screen flex flex-col items-center p-4 md:p-8 relative ${isMobile ? "" : "overflow-x-hidden"}`}
            style={isMobile ? undefined : { ...backgroundStyle("grass"), backgroundAttachment: "fixed, fixed, fixed" }}
        >
            {isMobile && <PageBackground />}

            <div className="flex flex-col items-center mt-8 md:mt-10">
                <motion.h1
                    className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-pixel text-center drop-shadow-lg"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
                >
                    My Developer Journey
                </motion.h1>
                <motion.p
                    className="text-sm md:text-base lg:text-lg font-serif mt-2 text-gray-700 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                >
                    Climb down the ladder. We’re starting from the latest and going back to where it all began.
                </motion.p>
            </div>

            {isMobile ? (
                <JourneyMobile events={events} spriteSrc={spriteSrc} />
            ) : (
                <JourneyDesktop events={events} spriteSrc={spriteSrc} />
            )}

            <ReturnHomeButton />
        </div>
    );
};

export default Journey;
