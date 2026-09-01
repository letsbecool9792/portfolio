import Seo from "../components/Seo";
import { profilePage } from "../content/schema";
import { HOME } from "../content/seo";
import { useIsMobile } from "../hooks/useIsMobile";
import LandingDesktop from "./landing/LandingDesktop";
import LandingMobile from "./landing/LandingMobile";

const Landing = () => {
    const isMobile = useIsMobile();

    return (
        <>
            <Seo {...HOME} schema={[profilePage(HOME)]} />
            {isMobile ? <LandingMobile /> : <LandingDesktop />}
        </>
    );
};

export default Landing;
