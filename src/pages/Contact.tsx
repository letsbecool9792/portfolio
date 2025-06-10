import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import ReturnHomeButton from '../components/ReturnHomeButton';

const Contact = () => {
    const form = useRef<HTMLFormElement | null>(null);
    const [emailSent, setEmailSent] = useState(false);
    const [userName, setUserName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!form.current) return;
        
        // Save the user's name for the thank you message
        const formData = new FormData(form.current);
        const name = formData.get('from_name') as string;
        setUserName(name);

        emailjs
            .sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, {
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            })
            .then(
            () => {
                console.log('SUCCESS!');
                setIsSubmitting(false);
                setEmailSent(true);
            },
            (error) => {
                console.log('FAILED...', error.text);
                setIsSubmitting(false);
            }
            );
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-4 md:p-8 relative"
            style={{
                backgroundImage: `
                    url('/assets/background/background_clouds.svg'),
                    url('/assets/background/background_color_desert.svg'),
                    url('/assets/background/background_solid_sand.svg')
                `,
                backgroundRepeat: "repeat-x, repeat-x, repeat-x",
                backgroundPosition: "0 0, 0 40%, 0 100%",
                backgroundSize: "auto 33%, auto 33%, auto 100%",
                backgroundAttachment: "fixed, fixed, fixed",
            }}
        >
            <div className="flex flex-col items-center mt-8 md:mt-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-pixel text-center">
                    Contact
                </h1>
                <p className="text-sm md:text-base lg:text-lg font-serif mt-2 text-gray-700 text-center">
                    Got a quest for me? Let's talk.
                </p>
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-700 font-serif mb-2">You can reach out to me on any of my social platforms</p>
                <Link 
                    to="/artifacts" 
                    className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-pixel py-2 px-6 rounded-full transition-colors duration-200"
                >
                    Check My Socials
                </Link>
            </div>

            <div className="w-full max-w-md mt-20 bg-white bg-opacity-90 rounded-lg shadow-lg p-6 md:p-8">
                {emailSent ? (
                    <div className="flex flex-col items-center text-center">
                        <div className="text-5xl mb-4">✉️</div>
                        <h2 className="text-xl md:text-2xl font-pixel text-gray-800 mb-2">Message Sent!</h2>
                        <p className="text-gray-700 mb-4">
                            Thanks {userName}! Your message has been delivered successfully. I'll get back to you as soon as possible.
                        </p>
                        <button 
                            onClick={() => setEmailSent(false)}
                            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-pixel py-2 px-6 rounded transition-colors duration-200"
                        >
                            Send Another Message
                        </button>
                    </div>
                ) : (
                    <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="font-pixel text-sm md:text-base mb-1 text-gray-700">Name</label>
                            <input 
                                type="text" 
                                name="from_name" 
                                required 
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div className="flex flex-col">
                            <label className="font-pixel text-sm md:text-base mb-1 text-gray-700">Email</label>
                            <input 
                                type="email" 
                                name="from_email" 
                                required 
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div className="flex flex-col">
                            <label className="font-pixel text-sm md:text-base mb-1 text-gray-700">Message</label>
                            <textarea 
                                name="message" 
                                required 
                                rows={5}
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-pixel py-2 px-4 rounded mt-2 transition-colors duration-200 flex items-center justify-center"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <img 
                                        src="/assets/other/icon_repeat_outline.png" 
                                        alt="Loading" 
                                        className="w-5 h-5 mr-2 animate-spin"
                                    />
                                    Sending...
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </form>
                )}
            </div> 
            <ReturnHomeButton />
        </div>
    );
}

export default Contact;