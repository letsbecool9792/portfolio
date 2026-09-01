import { Link } from 'react-router-dom';
import PageBackground from '../components/PageBackground';
import Seo from '../components/Seo';
import { NOT_FOUND } from '../content/seo';

const NotFound = () => {
    return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative">
        <Seo {...NOT_FOUND} />
        <PageBackground />
        <div className="bg-white/90 rounded-lg shadow-lg p-6 md:p-12 max-w-lg text-center">
        <h1 className="text-3xl md:text-5xl font-pixel mb-4 text-gray-800">404</h1>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-pixel mb-6 text-gray-700">Lost in the void</h2>
        <p className="text-base md:text-xl font-serif mb-8 text-gray-600">
            You wandered off the path. There's nothing here.
        </p>

        <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-pixel py-3 px-8 rounded-full transition-colors duration-200 text-base md:text-lg"
        >
            Return to Safety
        </Link>
        </div>
    </div>
    );
}

export default NotFound;
