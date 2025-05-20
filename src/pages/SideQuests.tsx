import ReturnHomeButton from "../components/ReturnHomeButton";

const SideQuests = () => {
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-pixel text-center">SideQuests</h1>
                <p className="text-sm md:text-base lg:text-lg font-serif mt-2 text-gray-700 text-center">Because sticking to the main path is for NPCs</p>
            </div>

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 z-10">
                {[
                    {
                        title: "Monkeytype",
                        desc: "Can type somewhat fast ig",
                        img: "/assets/sidequests/typing.png"
                    },
                    {
                        title: "ML",
                        desc: "Discovered ML from an event in college, somehow got 3rd in a Kaggle Challenge",
                        img: "/assets/sidequests/ml.png"
                    },
                    {
                        title: "Minecraft",
                        desc: "This game changed my life, and shaped me as a person",
                        img: "/assets/sidequests/minecraft.png"
                    },
                    {
                        title: "OSINT/CTFs",
                        desc: "These are fun idk",
                        img: "/assets/sidequests/osint.png"
                    },
                ].map((quest, i) => (
                    <div
                        key={i}
                        className="relative bg-no-repeat bg-cover text-black shadow-xl rounded-xl p-12 max-w-xs h-[460px] w-[320px] font-serif flex flex-col justify-center"
                        style={{
                            backgroundImage: `url('/assets/other/cardbg.png')`, 
                            imageRendering: 'crisp-edges',
                            transform: `rotate(${i % 2 === 0 ? '3deg' : '-3deg'})`,
                        }}
                        >
                        <img src={quest.img} className="w-full h-60 object-cover rounded-md mb-4" />
                        <h2 className="text-lg font-bold mb-1">{quest.title}</h2>
                        <p className="text-sm">{quest.desc}</p>
                    </div>

                ))}
            </div>

            <ReturnHomeButton />

        </div>
    );
}

export default SideQuests;