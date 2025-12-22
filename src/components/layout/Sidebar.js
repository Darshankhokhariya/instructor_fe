import Link from "next/link";
import { useState, useEffect } from "react";
import {
    FaUsers,
    FaCogs,
    FaPhoneAlt,
    FaTachometerAlt,
    FaCalendarAlt,
} from "react-icons/fa";
import { MdDashboard, MdPerson } from "react-icons/md";

export default function Sidebar({ isOpen, setIsOpen }) {
    const [pathname, setPathname] = useState("/admin/dashboard");

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isOpen && e.target.closest("li")) {
                const rect = e.target.closest("li").getBoundingClientRect();
                document.documentElement.style.setProperty(
                    "--tooltip-top",
                    `${rect.top + rect.height / 2}px`
                );
            }
        };
        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [isOpen]);

    const navItems = [
        {
            href: "/admin/dashboard",
            label: "DASHBOARD",
            icon: <MdDashboard size={20} />,
        },
        {
            href: "/admin/students",
            label: "Students",
            icon: <FaUsers size={20} />,
        },
        {
            href: "/admin/classes",
            label: "Classes",
            icon: <FaCalendarAlt size={20} />,
        },
        {
            href: "/admin/profile",
            label: "SUPPORT",
            icon: <MdPerson size={24} />,
        },
    ];

    const handleNavigationClick = (href) => {
        setPathname(href);
        if (window.innerWidth < 768) setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed md:relative top-0 left-0 h-screen z-40 bg-white shadow-lg transition-all duration-300
        ${isOpen ? "w-52 xl:w-60 2xl:w-64" : "w-0 md:w-20"} overflow-hidden`}
            >
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Logo */}
                    <div className="flex items-center justify-center md:justify-start p-4 border-b">
                        <Link href="/">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <img src="/logo/logo2.png" className="h-8 w-8" />
                                {isOpen && (
                                    <span className="text-xl font-bold text-primary">
                                        Yogalink
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>

                    {/* Top Navigation */}
                    <div className="m-2 flex-grow">
                        <ul className="space-y-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href} className="relative group">
                                        <Link href={item.href}>
                                            <div
                                                onClick={() => handleNavigationClick(item.href)}
                                                className={`flex items-center gap-4 px-4 py-2 rounded-xl cursor-pointer transition-colors
                        ${!isOpen && "justify-center"}
                        ${isActive
                                                        ? "bg-primary text-white"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {item.icon}
                                                {isOpen && (
                                                    <span className="font-medium">{item.label}</span>
                                                )}
                                            </div>
                                        </Link>

                                        {/* Tooltip (collapsed) */}
                                        {!isOpen && (
                                            <div className="fixed z-50 left-16 top-[var(--tooltip-top)] opacity-0 group-hover:opacity-100 transition pointer-events-none">
                                                <div className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-xl shadow-md">
                                                    {item.icon}
                                                    <span className="text-sm font-semibold">
                                                        {item.label}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow md:hidden">
                <div className="flex justify-around py-2 text-xs">
                    {[
                        {
                            href: "/admin/dashboard",
                            label: "DASHBOARD",
                            icon: <MdDashboard size={20} />,
                        },
                        {
                            href: "/admin/students",
                            label: "Students",
                            icon: <FaUsers size={20} />,
                        },
                        {
                            href: "/admin/classes",
                            label: "Classes",
                            icon: <FaCalendarAlt size={20} />,
                        },
                        {
                            href: "/admin/profile",
                            label: "SUPPORT",
                            icon: <MdPerson size={24} />,
                        },
                    ].map((item) => (
                        <Link href={item.href} key={item.href}>
                            <div
                                onClick={() => handleNavigationClick(item.href)}
                                className={`flex flex-col items-center gap-1 cursor-pointer ${pathname === item.href
                                    ? "text-primary font-medium"
                                    : "text-gray-600"
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
