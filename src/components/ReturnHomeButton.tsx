import { useNavigate } from 'react-router-dom';

const ReturnHomeButton = () => {
    const navigate = useNavigate();

    return (
        <button
        onClick={() => navigate('/')}
        className="fixed bottom-0 left-4 z-50"
        >
        <img
            src="/assets/other/sign_exit.png"
            alt="Return Home"
            className="w-30 h-30 hover:scale-110 transition-transform duration-200"
            style={{imageRendering: "crisp-edges"}}
        />
        </button>
    );
};

export default ReturnHomeButton;
