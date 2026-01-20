"use client";

import {
    FaStar,
    FaUsers,
    FaPlayCircle,
    FaBell,
    FaArrowRight,
} from "react-icons/fa";

import {
    MdWorkspacePremium,
    MdTrendingUp,
    MdForum,
    MdCalendarMonth,
    MdBolt,
} from "react-icons/md";

export default function Hero() {
    return (
        <main className="pt-28 pb-24 px-6">
            <div className="max-w-7xl mx-auto">

                {/* HERO BANNER */}
                <div className="relative overflow-hidden rounded-3xl bg-[#1e1e1e] p-10 mb-12 min-h-[300px] flex items-center">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKxSlsRDbMDaeJLMdjanf9eQS2ov-BTTvia1hGCmpDZk5LzEbDizkJC1v5itwo_fyu7HqWxusYCvQFp0k9IwkyRIJFvkYIA_LukO_Wxdov1SMHLjV6SLHOsOvUL8CJNTl3m-xdQwzwygRg8r8ypPItKD0B7o0Rp1g6zjjNqFi22VcWTFEh06Cd3kck3DAfhQzjLQBVAcyK6vpbVW9VLGoETJMwsO_826KoAwK4Oq_DvoZq5dWpraNLJ2u4Xsv5mLNmZX73mTedhZU"
                            alt="Yoga background"
                            className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/60 to-transparent" />
                    </div>

                    <div className="relative z-10 px-12 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-slate-900 rounded-full text-xs font-bold uppercase mb-6">
                            <MdWorkspacePremium />
                            Instructor of the Month
                        </div>

                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                            Master the Flow with Elena Rose
                        </h2>

                        <p className="text-slate-300 text-lg mb-8">
                            Join Elena's exclusive 30-day Vinyasa challenge and get personalized
                            feedback through AI posture analysis.
                        </p>

                        <button className="px-8 py-4 bg-primary text-slate-900 font-bold rounded-2xl flex items-center gap-3 hover:scale-105 transition-all">
                            Visit Profile <FaArrowRight />
                        </button>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">

                        {/* INSTRUCTOR CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {/* CARD */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border group hover:shadow-2xl transition">
                                <div className="h-64 relative overflow-hidden">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2dLfUfAfZiTGS0wpJYV_neQVSSKWb0YOU8-O6SIIY8yc_Qx3h-eQYpYauKMpe2YMIUOKICW4dkuWEKL98kPS5p-nR4_QAqb1UK3eyteR5Lcza5ozbylYdSYen36jz_UwpFrS7I5Zm0XZhdodP9yyylCifwDsss9qiWWQTuy4g-i06qS29urntTBPrpJc4K4fpkf_VkrOFxTnkjLB-CV8A37yz2CAC9bBIPG9DraNfChJDLbMHDbasFAImHjx4FC8e7mMD8SEFP_g"
                                        alt="Instructor"
                                        className="w-full h-full object-cover group-hover:scale-105 transition"
                                    />
                                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg flex items-center gap-1">
                                        <FaStar className="text-yellow-500 text-sm" />
                                        <span className="text-sm font-bold">4.9</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold">Marcus Thorne</h3>
                                    <p className="text-primary text-sm mb-4">Vinyasa & Mobility</p>

                                    <div className="flex gap-4 text-sm text-slate-500 mb-6">
                                        <div className="flex items-center gap-1">
                                            <FaUsers className="text-primary" /> 1.2k Students
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaPlayCircle className="text-primary" /> 48 Classes
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 py-3 bg-primary font-bold rounded-xl">
                                            Join Class
                                        </button>
                                        <button className="px-4 py-3 bg-slate-100 rounded-xl">
                                            <FaBell />
                                        </button>
                                    </div>
                                </div>
                            </div> <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border group hover:shadow-2xl transition">
                                <div className="h-64 relative overflow-hidden">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2dLfUfAfZiTGS0wpJYV_neQVSSKWb0YOU8-O6SIIY8yc_Qx3h-eQYpYauKMpe2YMIUOKICW4dkuWEKL98kPS5p-nR4_QAqb1UK3eyteR5Lcza5ozbylYdSYen36jz_UwpFrS7I5Zm0XZhdodP9yyylCifwDsss9qiWWQTuy4g-i06qS29urntTBPrpJc4K4fpkf_VkrOFxTnkjLB-CV8A37yz2CAC9bBIPG9DraNfChJDLbMHDbasFAImHjx4FC8e7mMD8SEFP_g"
                                        alt="Instructor"
                                        className="w-full h-full object-cover group-hover:scale-105 transition"
                                    />
                                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg flex items-center gap-1">
                                        <FaStar className="text-yellow-500 text-sm" />
                                        <span className="text-sm font-bold">4.9</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold">Marcus Thorne</h3>
                                    <p className="text-primary text-sm mb-4">Vinyasa & Mobility</p>

                                    <div className="flex gap-4 text-sm text-slate-500 mb-6">
                                        <div className="flex items-center gap-1">
                                            <FaUsers className="text-primary" /> 1.2k Students
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaPlayCircle className="text-primary" /> 48 Classes
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 py-3 bg-primary font-bold rounded-xl">
                                            Join Class
                                        </button>
                                        <button className="px-4 py-3 bg-slate-100 rounded-xl">
                                            <FaBell />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border group hover:shadow-2xl transition">
                                <div className="h-64 relative overflow-hidden">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2dLfUfAfZiTGS0wpJYV_neQVSSKWb0YOU8-O6SIIY8yc_Qx3h-eQYpYauKMpe2YMIUOKICW4dkuWEKL98kPS5p-nR4_QAqb1UK3eyteR5Lcza5ozbylYdSYen36jz_UwpFrS7I5Zm0XZhdodP9yyylCifwDsss9qiWWQTuy4g-i06qS29urntTBPrpJc4K4fpkf_VkrOFxTnkjLB-CV8A37yz2CAC9bBIPG9DraNfChJDLbMHDbasFAImHjx4FC8e7mMD8SEFP_g"
                                        alt="Instructor"
                                        className="w-full h-full object-cover group-hover:scale-105 transition"
                                    />
                                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg flex items-center gap-1">
                                        <FaStar className="text-yellow-500 text-sm" />
                                        <span className="text-sm font-bold">4.9</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold">Marcus Thorne</h3>
                                    <p className="text-primary text-sm mb-4">Vinyasa & Mobility</p>

                                    <div className="flex gap-4 text-sm text-slate-500 mb-6">
                                        <div className="flex items-center gap-1">
                                            <FaUsers className="text-primary" /> 1.2k Students
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaPlayCircle className="text-primary" /> 48 Classes
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 py-3 bg-primary font-bold rounded-xl">
                                            Join Class
                                        </button>
                                        <button className="px-4 py-3 bg-slate-100 rounded-xl">
                                            <FaBell />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SUBSCRIPTION SECTION */}
                        <div className="mt-16 bg-emerald-950 rounded-3xl p-12 text-white">
                            <h2 className="text-3xl font-extrabold mb-8">
                                Why Subscribe to an Instructor?
                            </h2>

                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <FaStar className="text-primary text-xl" />
                                    <div>
                                        <p className="font-bold">Exclusive Premium Content</p>
                                        <p className="text-slate-400">
                                            Private workshops & deep dives.
                                        </p>
                                    </div>
                                </li>

                                <li className="flex gap-4">
                                    <MdForum className="text-primary text-xl" />
                                    <div>
                                        <p className="font-bold">Direct Feedback</p>
                                        <p className="text-slate-400">
                                            AI-powered posture reviews.
                                        </p>
                                    </div>
                                </li>

                                <li className="flex gap-4">
                                    <MdCalendarMonth className="text-primary text-xl" />
                                    <div>
                                        <p className="font-bold">Custom Practice Plans</p>
                                        <p className="text-slate-400">
                                            Weekly routines personalized for you.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div className="lg:w-80">
                        <div className="sticky top-28 bg-white rounded-2xl p-6 border">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold">Trending Now</h3>
                                <MdTrendingUp className="text-primary" />
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <MdBolt className="text-primary" />
                                    <span className="text-sm font-bold">New Goal Achieved</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    You completed 5 classes this week!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
