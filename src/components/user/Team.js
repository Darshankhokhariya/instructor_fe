const TrainerCard = ({ img }) => (
    <div className="overflow-hidden rounded-xl h-[300px] w-full">
        <img src={img} alt="Trainer" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
    </div>
);

export default function Team() {
    const images = [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60"
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto text-center px-6">
                <h2 className="text-4xl font-serif text-[#2C2C2C] mb-2">Our Great Team</h2>
                <p className="text-sm text-gray-500 font-medium mb-6">Sub heading to explain more</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-12 mx-auto max-w-2xl">
                    Meet our team of expert trainers, dedicated to guiding you on your wellness journey.
                    With extensive experience and a deep understanding of yoga and fitness, our trainers
                    offer personalized attention to help you reach your goals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {images.map((img, i) => <TrainerCard key={i} img={img} />)}
                </div>

                <button className="border border-gray-400 px-8 py-3 rounded text-xs font-semibold hover:bg-gray-50 transition">
                    Learn More About Us
                </button>
            </div>
        </section>
    );
}