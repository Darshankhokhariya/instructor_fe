import Link from 'next/link';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

export default function Header() {
    return (
        <nav className="absolute top-0 left-0 w-full z-20 px-6 py-6 md:px-12 flex justify-between items-center text-gray-800">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="text-2xl font-bold flex items-center gap-1 text-primary">
                    Yoga<span className='text-black'>Link</span>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
                <Link href="#" className="hover:text-[#4C5D4F]">Home</Link>
                <Link href="#" className="hover:text-[#4C5D4F]">Services ▾</Link>
                <Link href="#" className="hover:text-[#4C5D4F]">Our Facility ▾</Link>
                <Link href="#" className="hover:text-[#4C5D4F]">About</Link>
                <Link href="#" className="hover:text-[#4C5D4F]">Contact</Link>
            </div>

            {/* CTA Button */}
            <button className="bg-[#566358] text-white px-5 py-2 rounded text-sm font-medium flex items-center gap-2 hover:bg-opacity-90 transition">
                <FaShoppingCart className="text-sm" />
                Shop Now
            </button>
        </nav>
    );
}