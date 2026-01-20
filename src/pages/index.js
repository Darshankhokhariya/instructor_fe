"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { BiLogoFacebook, BiLogoInstagram, BiPlay } from 'react-icons/bi';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import {
    LuSparkles, LuFlower2, LuGlobe, LuArrowRight,
    LuUsers, LuMenu, LuMoon, LuSun, LuApple, LuQuote
} from 'react-icons/lu';

export default function YogaLinkLanding() {
    // 1. Set default state to false (Light Mode)
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // 2. Control the 'dark' class on the root element
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        // 3. Ensure the base wrapper has a light background default
        <div className="min-h-screen transition-colors duration-300 bg-white text-slate-900  ">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-slate-200/50  bg-white/80  backdrop-blur-md">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <LuFlower2 className="text-black text-2xl" />
                        </div>
                        <span className="text-2xl font-semibold tracking-tight ">YogaLink</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a className="font-medium hover:text-primary transition-colors" href="#features">Features</a>
                        <a className="font-medium hover:text-primary transition-colors" href="#community">Community</a>
                        <a className="font-medium hover:text-primary transition-colors" href="#instructors">Instructors</a>
                        <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>

                        {/* Dark Mode Toggle Switch */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDarkMode ? <LuSun size={18} className="text-yellow-400" /> : <LuMoon size={18} className="text-slate-600" />}
                        </button>

                        <Link href="/instructor/login">
                            <button className="px-6 py-2.5 bg-primary text-slate-900 font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/25">
                                Login
                            </button>
                        </Link>
                        <Link href="/instructor/login">
                            <button className="px-6 py-2.5 bg-primary text-slate-900 font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/25">
                                Instructor Login
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu & Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
                            onClick={() => setIsDarkMode(!isDarkMode)}
                        >
                            {isDarkMode ? <LuSun size={20} className="text-yellow-400" /> : <LuMoon size={20} />}
                        </button>
                        <LuMenu className="text-3xl" />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 px-6 overflow-hidden">
                <div className="container mx-auto py-12">
                    <div className="min-h-[700px] rounded-3xl p-8 md:p-20 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group">
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `linear-gradient(to bottom, rgba(11, 22, 20, 0.4), rgba(11, 22, 20, 0.8)), url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop')` }}
                        />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary font-bold text-sm tracking-widest uppercase mb-8 animate-bounce mx-auto">
                                <LuSparkles className="text-sm" />
                                AI-Powered Wellness
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 max-w-4xl leading-[1.1] tracking-tight">
                                Personalized Yoga & Wellness, <span className="text-primary">Powered by AI</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-200 mb-12 max-w-2xl leading-relaxed mx-auto">
                                Experience a diverse global community and smart plans tailored perfectly to your body's daily needs through advanced computer vision.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto justify-center">
                                <button className="w-full sm:w-auto px-10 py-5 bg-primary text-slate-900 font-bold text-lg rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2">
                                    Get Started Now <LuArrowRight />
                                </button>
                                <button className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/20 active:scale-95 transition-all">
                                    Explore Plans
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-6 bg-slate-50 dark:bg-transparent" id="features">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <div className="w-16 h-1.5 bg-primary mb-6 rounded-full"></div>
                        <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Features</p>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <h2 className="text-4xl md:text-5xl font-extrabold">Elevate Your Practice</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md text-lg leading-relaxed">
                                Our AI understands your goals and adapts to your progress daily, connecting you with the world's best instructors.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<LuSparkles size={32} />}
                            iconColor="text-primary"
                            bgColor="bg-primary/10"
                            title="AI-Driven Plans"
                            desc="Personalized routines that analyze your form and physical limits through real-time camera feedback."
                        />
                        <FeatureCard
                            icon={<LuFlower2 size={32} />}
                            iconColor="text-orange-500"
                            bgColor="bg-orange-100 dark:bg-orange-500/10"
                            title="Guided Meditations"
                            desc="Access a library of 500+ mindfulness sessions for sleep, focus, and deep emotional healing."
                        />
                        <FeatureCard
                            icon={<LuGlobe size={32} />}
                            iconColor="text-indigo-500"
                            bgColor="bg-indigo-100 dark:bg-indigo-500/10"
                            title="Global Instructors"
                            desc="Connect with certified top-tier yoga professionals from India, USA, and the UK."
                        />
                    </div>
                </div>
            </section>

            {/* Community / Testimonial Section */}
            <section className="py-24 px-6 bg-white dark:bg-slate-900/30" id="community">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Loved by the Yoga Community</h2>
                    <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-2xl">★</span>
                        ))}
                    </div>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-50 dark:bg-slate-900 p-10 md:p-16 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 relative">
                        <LuQuote className="text-6xl text-slate-200 dark:text-slate-800 absolute top-8 left-8" />
                        <div className="relative z-10 text-center">
                            <blockquote className="text-2xl md:text-3xl font-medium text-slate-700 dark:text-slate-200 mb-10 leading-relaxed italic">
                                "The AI adjustments are surprisingly accurate. It's like having a private instructor looking over my shoulder, ensuring my posture is perfect."
                            </blockquote>
                            <div className="flex flex-col items-center">
                                <img alt="Sarah" className="w-16 h-16 rounded-full object-cover mb-4 ring-4 ring-primary/20" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop" />
                                <h4 className="text-xl font-bold">Sarah Jenkins</h4>
                                <p className="text-slate-500">London, UK</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-50 dark:bg-[#0B1614] pt-24 pb-12 border-t border-slate-100 dark:border-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <LuFlower2 className="text-slate-900" />
                                </div>
                                <span className="text-xl font-extrabold tracking-tight">YogaLink</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 mb-8">
                                Bringing the wisdom of centuries-old yoga traditions together with the power of modern AI.
                            </p>
                            <div className="flex gap-4">
                                <a className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors shadow-sm" href="#"><BiLogoFacebook size={20} /></a>
                                <a className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors shadow-sm" href="#"><BiLogoInstagram size={20} /></a>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <h4 className="font-bold text-lg mb-6">Product</h4>
                            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">Find a Plan</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Our AI Tech</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Instructor Directory</a></li>
                            </ul>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <h4 className="font-bold text-lg mb-6">Download App</h4>
                            <div className="flex flex-wrap gap-4">
                                <DownloadButton icon={<FaApple size={24} />} topText="Download on the" bottomText="App Store" />
                                <DownloadButton icon={<FaGooglePlay size={28} />} topText="Get it on" bottomText="Google Play" />
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
                        <p>© 2024 YogaLink Inc. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                            <a className="hover:text-primary transition-colors" href="#">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Sticky CTA */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:max-w-md z-50">
                <button className="w-full bg-primary text-slate-900 font-extrabold py-5 rounded-2xl shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all text-lg">
                    Start Your Free Trial
                </button>
            </div>
        </div>
    );
}

// Sub-components
function FeatureCard({ icon, iconColor, bgColor, title, desc }) {
    return (
        <div className="group bg-white  p-8 rounded-3xl drop-shadow-sm  hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform`}>
                <div className={`${iconColor}`}>{icon}</div>
            </div>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
        </div>
    );
}

function DownloadButton({ icon, topText, bottomText }) {
    return (
        <a className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-xl hover:scale-105 transition-all border border-slate-800" href="#">
            {icon}
            <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-slate-400">{topText}</p>
                <p className="text-lg font-bold leading-none">{bottomText}</p>
            </div>
        </a>
    );
}