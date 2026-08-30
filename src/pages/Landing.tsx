import { useIsMobile } from "../hooks/useIsMobile";
import LandingDesktop from "./landing/LandingDesktop";
import LandingMobile from "./landing/LandingMobile";

const Landing = () => (useIsMobile() ? <LandingMobile /> : <LandingDesktop />);

export default Landing;
