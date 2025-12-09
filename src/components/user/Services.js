import { GrYoga } from "react-icons/gr";
import { FaArrowLeft, FaArrowRight, FaSpa, FaTshirt, FaChild } from 'react-icons/fa';

const ServiceCard = ({ icon: Icon, title, desc }) => (
    <div className="min-w-[280px] bg-[#F8F9FA] p-8 rounded-lg text-center flex flex-col items-center hover:shadow-lg transition">
        <Icon className="text-[#4C5D4F] text-4xl mb-4" />
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-xs text-gray-500 mb-6 leading-relaxed px-2">{desc}</p>
        <button className="border border-gray-400 px-6 py-2 rounded text-xs font-semibold hover:bg-gray-100 transition">
            Learn More
        </button>
    </div>
);

export default function Services() {
    return (
        <section className="py-20 px-6 md:px-12 bg-white">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-serif text-[#2C2C2C] mb-2">Our Services</h2>
                <p className="text-sm text-gray-500 font-medium">Sub heading to explain more</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-8 justify-center items-stretch">

                {/* Highlight Card */}
                <div className="min-w-[280px] md:w-[300px] bg-[#4C5D4F] p-8 rounded-lg flex flex-col justify-center items-start text-white shadow-xl">
                    <h3 className="text-2xl font-serif mb-4">Get Started With<br />Your Free Trial</h3>
                    <p className="text-xs text-gray-300 mb-8 leading-relaxed">
                        Explore yoga at our serene studio with a complimentary session.
                        Meet our instructors and discover the benefits.
                    </p>
                    <button className="bg-[#F5F5F0] text-[#4C5D4F] px-6 py-3 rounded font-bold text-sm hover:bg-white transition">
                        Get Started Today
                    </button>
                </div>

                {/* Service Cards */}
                <ServiceCard
                    icon={FaSpa}
                    title="Spa area"
                    desc="Indulge in a world of relaxation and rejuvenation with our exceptional spa services. At our LA center."
                />
                <ServiceCard
                    icon={FaTshirt}
                    title="Changing Room"
                    desc="Indulge in a world of relaxation and rejuvenation with our exceptional spa services. At our LA center."
                />
                <ServiceCard
                    icon={FaChild}
                    title="Free Lessons"
                    desc="Indulge in a world of relaxation and rejuvenation with our exceptional spa services. At our LA center."
                />
                <ServiceCard
                    icon={GrYoga}
                    title="Free Rug"
                    desc="Indulge in a world of relaxation and rejuvenation with our exceptional spa services. At our LA center."
                />
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-end gap-3 mt-4 px-12">
                <button className="p-2 border rounded-full hover:bg-gray-100"><FaArrowLeft /></button>
                <button className="p-2 border rounded-full hover:bg-gray-100"><FaArrowRight /></button>
            </div>
        </section>
    );
}