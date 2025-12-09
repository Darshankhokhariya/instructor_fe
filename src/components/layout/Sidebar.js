import Link from "next/link";
import { useState, useEffect } from "react";
// Import relevant icons for Yogalink project
import {
    FaTachometerAlt, FaUsers, FaCalendarAlt, FaChartLine, FaEnvelope, FaCogs, FaPhoneAlt
} from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { MdPayment } from "react-icons/md";


// Mock useTranslation hook
const useTranslation = () => ({
    t: (key) => key.toUpperCase().replace(/[-\s]/g, '_'), // Mock translation
});

export default function Sidebar({ isOpen, setIsOpen }) {

    const { t } = useTranslation();
    const [pathname, setPathname] = useState("/dashboard"); // Mock router.pathname

    // Mock router.events.on
    useEffect(() => {
        const handleRouteChange = () => {
            // In a real Next.js app, you'd update the pathname here
            if (isOpen) {
                // The original logic kept the sidebar open on route change if it was already open.
                // For the mock, we don't need to do anything complex, but we keep the structure.
                setIsOpen(true);
            }
        };
        // Mocking the cleanup for the router event listener
        // The original logic here is complex for a simple mock, so we'll simplify.
        // For a real app, this ensures the sidebar's state is preserved or handled on navigation.
        return () => { };
    }, [isOpen, setIsOpen]);

    // Mock the tooltip position logic
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isOpen && e.target.closest("li")) {
                const rect = e.target.closest("li").getBoundingClientRect();
                document.documentElement.style.setProperty('--tooltip-top', `${rect.top + rect.height / 2}px`);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [isOpen]);

    const navItems = [
        { href: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt size={20} /> },
        { href: "/members", label: "Member Management", icon: <FaUsers size={20} /> },
        { href: "/schedule", label: "Class Schedule", icon: <FaCalendarAlt size={20} /> },
        { href: "/payments", label: "Payments/Billing", icon: <MdPayment size={20} /> },
        { href: "/reports", label: "Analytics & Reports", icon: <FaChartLine size={20} /> },
        { href: "/communications", label: "Communications", icon: <FaEnvelope size={20} /> },
    ];

    const navItemsBottom = [
        { href: "/profile", label: "My Profile", icon: <FaUsers size={20} /> }, // Using FaUsers for user profile/account
        { href: "/settings", label: "Settings", icon: <FaCogs size={20} /> }, // Using FaCogs for settings
        { href: "/support", label: "Support", icon: <FaPhoneAlt size={20} /> },
    ];

    // Helper function to mock Next.js Link behavior for click
    const handleNavigationClick = (href) => {
        setPathname(href); // Update mock path to change active link style
        if (window.innerWidth < 768) {
            setIsOpen(false); // Close sidebar on mobile after clicking
        }
    };


    return (
        <>
            {/* Backdrop for Mobile Sidebar */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <div
                className={`fixed md:relative top-0 left-0 h-screen  z-40 transition-all duration-300 bg-white shadow-lg
                ${isOpen ? "w-52 xl:w-60 2xl:w-64" : "w-0 md:w-20"} overflow-hidden`}
            >
                <div className="flex flex-col h-full overflow-y-auto ">
                    {/* Top Nav Items */}
                    <div className="m-2 flex-grow">
                        <ul className="space-y-2">
                            {navItems.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={index} className="relative group" onClick={() => handleNavigationClick(item.href)}>
                                        <Link href={item.href} legacyBehavior>
                                            <a className={`flex items-center ${isOpen ? "" : "justify-center"} gap-4 px-4 py-2 rounded-xl cursor-pointer transition-colors relative
                                            ${isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                                                <span>{item.icon}</span>
                                                {isOpen && <span className="text-base font-medium">{item.label}</span>}
                                            </a>
                                        </Link>
                                        {/* Floating Tooltip (only when sidebar is collapsed) */}
                                        {!isOpen && (
                                            <div className="fixed z-50 px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-xl shadow-md left-16 top-[var(--tooltip-top)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                                <div className="flex items-center gap-2">
                                                    {item.icon}
                                                    <span>{item.label}</span>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    {/* Bottom Nav Items */}
                    <div className="m-2 md:mt-0 border-t border-gray-200">
                        <ul className="space-y-2">
                            {navItemsBottom.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={index} className="relative group" onClick={() => handleNavigationClick(item.href)}>
                                        <Link href={item.href} legacyBehavior>
                                            <a className={`flex items-center ${isOpen ? "" : "justify-center"} gap-4 px-4 py-2 rounded-xl cursor-pointer transition-colors relative
                                            ${isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                                                <span>{item.icon}</span>
                                                {isOpen && <span className="text-base font-medium">{item.label}</span>}
                                            </a>
                                        </Link>
                                        {/* Floating Tooltip (only when sidebar is collapsed) */}
                                        {!isOpen && (
                                            <div className="fixed z-50 px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-xl shadow-md left-16 top-[var(--tooltip-top)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                                <div className="flex items-center gap-2">
                                                    {item.icon}
                                                    <span>{item.label}</span>
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
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow md:hidden">
                <div className="flex justify-around px-4 py-2 text-xs text-gray-600">
                    {/* Only showing the first few for mobile bottom nav */}
                    <div className="flex flex-col gap-y-1 items-center w-full" onClick={() => handleNavigationClick("/dashboard")}>
                        <Link href="/dashboard" legacyBehavior>
                            <a className="flex flex-col gap-y-1 items-center w-full">
                                <FaTachometerAlt size={20} className={`${pathname === "/dashboard" ? "text-primary" : ""}`} />
                                <span className={`${pathname === "/dashboard" ? "text-primary font-medium" : ""}`}>DASHBOARD</span>
                            </a>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-y-1 items-center w-full" onClick={() => handleNavigationClick("/members")}>
                        <Link href="/members" legacyBehavior>
                            <a className="flex flex-col gap-y-1 items-center w-full">
                                <FaUsers size={20} className={`${pathname === "/members" ? "text-primary" : ""}`} />
                                <span className={`${pathname === "/members" ? "text-primary font-medium" : ""}`}>MEMBERS</span>
                            </a>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-y-1 items-center w-full" onClick={() => handleNavigationClick("/schedule")}>
                        <Link href="/schedule" legacyBehavior>
                            <a className="flex flex-col gap-y-1 items-center w-full">
                                <FaCalendarAlt size={20} className={`${pathname === "/schedule" ? "text-primary" : ""}`} />
                                <span className={`${pathname === "/schedule" ? "text-primary font-medium" : ""}`}>SCHEDULE</span>
                            </a>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-y-1 items-center w-full" onClick={() => handleNavigationClick("/support")}>
                        <Link href="/support" legacyBehavior>
                            <a className="flex flex-col gap-y-1 items-center w-full">
                                <FaPhoneAlt size={20} className={`${pathname === "/support" ? "text-primary" : ""}`} />
                                <span className={`${pathname === "/support" ? "text-primary font-medium" : ""}`}>SUPPORT</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}