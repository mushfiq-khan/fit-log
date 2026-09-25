import Image from "next/image";

export default function Hero() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
            
            <div className="bg-[#12141c] border border-zinc-800/60 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">

                {/* Left Text Block */}
                <div className="flex-1 space-y-5 z-10">
                    <span className="text-[#ccff00] font-black text-xs tracking-widest uppercase">
                        WORKOUT LIBRARY
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-[1.1]">
                        TRAIN WITH INTENT. <br /> LOG EVERY SET.
                    </h1>

                    <p className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
                    </p>

                    <a
                        href="#workouts"
                        className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold px-6 py-3 rounded-xl transition-all text-xs tracking-wider uppercase shadow-md hover:scale-[1.02]"
                    >
                        BROWSE WORKOUTS
                    </a>
                </div>

                {/* Right Gym Machine Image */}
                <div className="w-full md:w-auto flex justify-center z-10">
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                        <Image
                            src="/assets/banner.png"
                            alt="Gym Equipment Banner"
                            width={340}
                            height={340}
                            className="object-contain filter drop-shadow-2xl"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}