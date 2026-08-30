import { backgroundStyle, type BackgroundVariant } from "../styles/background";

/**
 * Paints the parallax background as a real fixed layer behind the page.
 *
 * iOS Safari ignores `background-attachment: fixed`, so mobile layouts use this
 * instead of setting the background on the scrolling container. It also keeps
 * the background covering the viewport if content ever overflows sideways.
 */
const PageBackground = ({ variant = "grass" }: { variant?: BackgroundVariant }) => (
    <div className="fixed inset-0 -z-10" style={backgroundStyle(variant)} aria-hidden="true" />
);

export default PageBackground;
