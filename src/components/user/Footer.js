import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaHeart, FaApple, FaGooglePlay } from 'react-icons/fa';
import { GrYoga } from 'react-icons/gr';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-background-dark pt-24 pb-12 border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <GrYoga />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight ">YogaLink</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                            Bringing the wisdom of centuries-old yoga traditions together with the power of modern
                            artificial intelligence.
                        </p>
                    </div>
                    <div className="col-span-1">
                        <h4 className="font-bold text-lg mb-6 ">Marketplace</h4>
                        <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Top Instructors</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Live Events</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Private Sessions</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Workshop Archive</a></li>
                        </ul>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="font-bold text-lg mb-6 ">Download App</h4>
                        <div className="flex flex-wrap gap-4">
                            <a className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition-all border border-slate-800"
                                href="#">
                                <FaApple />
                                <div className="text-left">
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Download on the</p>
                                    <p className="text-lg font-bold leading-none">App Store</p>
                                </div>
                            </a>
                            <a className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition-all border border-slate-800"
                                href="#">
                                <FaGooglePlay />
                                <div className="text-left">
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Get it on</p>
                                    <p className="text-lg font-bold leading-none">Google Play</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
                    <p>© 2024 YogaLink Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                        <a className="hover:text-primary transition-colors" href="#">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}