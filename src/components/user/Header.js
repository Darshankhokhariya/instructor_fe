import Link from 'next/link';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { GrYoga } from 'react-icons/gr';

export default function Header() {
    return (
        <nav
            className="fixed top-0 w-full z-50 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div
                        className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <GrYoga />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight ">YogaLink</span>
                </div>
                <div className="hidden md:flex items-center flex-1 max-w-xl mx-12">
                    <div className="relative w-full">
                        <span
                            className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            className="w-full pl-12 pr-4 py-2.5 bg-slate-100  border-none rounded-full focus:ring-2 focus:ring-primary text-sm transition-all"
                            placeholder="" type="text" />
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a className="font-medium hover:text-primary transition-colors text-sm" href="#">Marketplace</a>
                    <a className="font-medium hover:text-primary transition-colors text-sm" href="#">Live Sessions</a>
                    <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
                    <Link href="/user/login">
                        <button
                            className="px-5 py-2.5 bg-primary text-slate-900 font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/25 text-sm">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}