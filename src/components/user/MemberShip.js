import { FaPlayCircle } from 'react-icons/fa';

export default function MemberShip() {
    return (
        <section className="relative h-[500px] w-full mt-10">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=2072&auto=format&fit=crop"
                    alt="Yoga Class"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Floating Card */}
            <div className="absolute inset-0 flex items-center justify-end px-6 md:px-20">
                <div className="bg-white p-12 rounded-xl max-w-lg shadow-2xl">
                    <h2 className="text-3xl font-bold text-[#2C2C2C] mb-4">Free 30 Day MemberShip</h2>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                        Enjoy a complimentary 30-day free trial of our yoga and fitness classes.
                        Experience our serene studio, expert trainers, and diverse class offerings without any commitment.
                    </p>

                    <div className="flex gap-4 items-center">
                        <button className="bg-[#4C5D4F] text-white px-6 py-3 rounded text-sm font-medium hover:bg-[#3e4d41] transition">
                            Book A Session
                        </button>
                        <button className="text-gray-700 text-sm font-medium flex items-center gap-2 hover:text-[#4C5D4F]">
                            Contact Us <FaPlayCircle className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}