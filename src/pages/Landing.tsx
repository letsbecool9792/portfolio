import Seo from "../components/Seo";
import { HOME } from "../content/seo";
import { useIsMobile } from "../hooks/useIsMobile";
import LandingDesktop from "./landing/LandingDesktop";
import LandingMobile from "./landing/LandingMobile";

const Landing = () => {
    const isMobile = useIsMobile();

    return (
        <>
            <Seo {...HOME} />
            {isMobile ? <LandingMobile /> : <LandingDesktop />}
        </>
    );
};

export default Landing;
