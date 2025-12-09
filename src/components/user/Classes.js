export default function Classes() {
    const steps = [
        { num: 1, title: "Free Rugs", desc: "Perfect for newcomers, our beginners yoga classes focus on foundational poses and techniques to build strength." },
        { num: 2, title: "Changing Room", desc: "Perfect for newcomers, our beginners yoga classes focus on foundational poses and techniques to build strength." },
        { num: 3, title: "Free Rugs", desc: "Perfect for newcomers, our beginners yoga classes focus on foundational poses and techniques to build strength." },
        { num: 4, title: "Changing Room", desc: "Perfect for newcomers, our beginners yoga classes focus on foundational poses and techniques to build strength." }
    ];

    return (
        <section className="py-20 bg-[#F2F1EC]">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-serif text-[#2C2C2C] mb-2">Latest Classes</h2>
                <p className="text-sm text-gray-500 font-medium">Sub heading to explain more</p>
            </div>

            <div className="flex justify-center gap-4 mb-12 flex-wrap px-4">
                {['Beginners Yoga', 'Stretching', 'Fly-Yoga', 'Yin-Yoga', 'zoomba'].map((tab, idx) => (
                    <button
                        key={tab}
                        className={`px-6 py-2 rounded border border-gray-300 text-sm font-medium transition
              ${idx === 0 ? 'bg-white text-black shadow-sm' : 'bg-transparent text-gray-600 hover:bg-white/50'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="h-full w-full">
                    <img
                        src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2069&auto=format&fit=crop"
                        alt="Yoga Pose"
                        className="rounded-lg object-cover w-full h-[600px] shadow-lg"
                    />
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-4">Beginners Yoga</h3>
                    <p className="text-gray-500 text-sm mb-10 leading-relaxed">
                        Perfect for newcomers, our beginners yoga classes focus on foundational poses
                        and techniques to build strength. Start your yoga journey with us in a supportive environment.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                        {steps.map((step) => (
                            <div key={step.num} className="flex flex-col gap-3">
                                <div className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center text-2xl text-gray-400 font-light">
                                    {step.num}
                                </div>
                                <h4 className="font-bold text-gray-800">{step.title}</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <button className="bg-[#4C5D4F] text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-wider hover:bg-[#3e4d41] transition">
                            Get Your FreeTrial
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}