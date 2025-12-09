"use client";
import { FaSearchLocation } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

export default function Hero() {
    return (
        <div className="w-full bg-gradient-to-br from-pink-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

                {/* LEFT CONTENT */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        Find Best Yoga Classes <br /> in Your City
                    </h1>

                    <p className="mt-4 text-gray-600 text-lg">
                        Learn from certified yoga instructors. Flexible timings,
                        verified trainers & personalised sessions.
                    </p>

                    {/* Small highlights */}
                    <div className="mt-6 space-y-2">
                        <p className="flex items-center gap-2 text-gray-700">
                            🧘 120+ Certified Yoga Trainers
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                            ⭐ 4.9/5 Rated by Students
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                            🔒 Verified Profiles, No Commission
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="mt-8 bg-white shadow-lg rounded-full flex items-center p-3 gap-3 w-full max-w-xl border border-gray-200">
                        {/* Category */}
                        <input
                            type="text"
                            placeholder="Yoga Type (e.g., Hatha, Ashtanga...)"
                            className="w-full px-4 py-2 rounded-full outline-none text-gray-600"
                        />

                        <span className="h-6 w-px bg-gray-300"></span>

                        {/* Location */}
                        <div className="flex items-center gap-2 w-full">
                            <FaSearchLocation className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Enter City"
                                className="w-full py-2 outline-none text-gray-600"
                            />
                        </div>

                        {/* Search Button */}
                        <button className="bg-pink-500 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-600 transition-all flex items-center gap-2">
                            <BiSearch size={20} /> Search
                        </button>
                    </div>
                </div>

                {/* RIGHT IMAGES */}
                <div className="hidden md:flex justify-center gap-5">
                    <div className="rounded-3xl overflow-hidden h-[420px] w-[180px] bg-gray-200 shadow-md">
                        <img
                            src="/yoga1.jpg"
                            alt="Yoga pose"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="rounded-[100px] overflow-hidden h-[420px] w-[180px] bg-gray-200 shadow-md">
                        <img
                            src="/yoga2.jpg"
                            alt="Yoga pose"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="rounded-[70px] overflow-hidden h-[420px] w-[180px] bg-gray-200 shadow-md">
                        <img
                            src="/yoga3.jpg"
                            alt="Yoga pose"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
