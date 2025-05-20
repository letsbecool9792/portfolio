import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative"
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
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 md:p-12 max-w-lg text-center">
        <h1 className="text-4xl md:text-5xl font-pixel mb-4 text-gray-800">404</h1>
        <h2 className="text-2xl md:text-3xl font-pixel mb-6 text-gray-700">Lost in the void</h2>
        <p className="text-lg md:text-xl font-serif mb-8 text-gray-600">
            You wandered off the path. There's nothing here.
        </p>
        
        <Link 
            to="/" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-pixel py-3 px-8 rounded-full transition-colors duration-200 text-lg"
        >
            Return to Safety
        </Link>
        </div>
    </div>
    );
}

export default NotFound;