import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaHeart } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-white py-12 px-6 border-t">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="text-xl font-bold flex items-center gap-1 text-[#4C5D4F]">
                        <FaHeart className="text-2xl" />
                        <div className="flex flex-col leading-none">
                            <span>Great Fit</span>
                            <span className="text-[8px] tracking-widest uppercase text-gray-500">Yoga Studio</span>
                        </div>
                    </div>
                </div>

                {/* Links */}
                <div className="flex gap-8 text-xs font-semibold text-gray-800">
                    <a href="#">Home</a>
                    <a href="#">Services</a>
                    <a href="#">Our Facility</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>
            </div>

            <div className="max-w-6xl mx-auto pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-4 text-gray-600">
                    <FaInstagram className="hover:text-[#4C5D4F] cursor-pointer" />
                    <FaFacebook className="hover:text-[#4C5D4F] cursor-pointer" />
                    <FaTwitter className="hover:text-[#4C5D4F] cursor-pointer" />
                    <FaYoutube className="hover:text-[#4C5D4F] cursor-pointer" />
                </div>
                <p className="text-[10px] text-gray-500">© Copyright 2024 | All rights Reserved</p>
            </div>
        </footer>
    );
}