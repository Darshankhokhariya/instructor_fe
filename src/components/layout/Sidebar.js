import Link from "next/link";
import { useState, useEffect } from "react";
import {
    FaUsers,
    FaChartLine,
    FaCog,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import {
    MdDashboard,
    MdSchedule,
    MdPerson,
} from "react-icons/md";

export default function Sidebar({ isOpen, setIsOpen, userRole = "admin" }) {
    const [pathname, setPathname] = useState(userRole === "admin" ? "/admin/dashboard" : "/manager/dashboard");
    const [hoveredItem, setHoveredItem] = useState(null);

    useEffect(() => {
        // Get current pathname if available
        if (typeof window !== "undefined") {
            setPathname(window.location.pathname);
        }
    }, []);

    // Define navigation items based on user role
    const adminNavItems = [
        {
            href: "/admin/dashboard",
            label: "Dashboard",
            icon: <MdDashboard size={22} />,
        },
        {
            href: "/admin/applications",
            label: "Applications",
            icon: <FaUsers size={20} />,
        },
        {
            href: "/admin/managers",
            label: "Managers",
            icon: <MdPerson size={22} />,
        },
    ];

    const managerNavItems = [
        {
            href: "/manager/dashboard",
            label: "Dashboard",
            icon: <MdDashboard size={22} />,
        },
        {
            href: "/manager/application",
            label: "Applications",
            icon: <FaUsers size={20} />,
        },
    ];

    const mainNavItems = userRole === "admin" ? adminNavItems : managerNavItems;

    const handleNavigationClick = (href) => {
        setPathname(href);
        if (window.innerWidth < 768) setIsOpen(false);
    };

    const NavItem = ({ item, section = "main" }) => {
        const isActive = pathname === item.href;
        const isHovered = hoveredItem === item.href;

        return (
            <li
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <Link href={item.href}>
                    <div
                        onClick={() => handleNavigationClick(item.href)}
                        className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer 
                            transition-all duration-200 relative 
                            ${!isOpen && "justify-center"}
                            ${isActive
                                ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-200"
                                : "text-gray-700 hover:bg-gray-100"
                            }
                        `}
                    >
                        {/* Icon */}
                        <div className={`flex-shrink-0 ${isActive ? "text-white" : "text-gray-600"} transition-transform duration-200 ${isHovered && isOpen ? "scale-110" : ""}`}>
                            {item.icon}
                        </div>

                        {/* Label */}
                        {isOpen && (
                            <span className={`font-medium text-sm flex-1 ${isActive ? "text-white" : "text-gray-700"}`}>
                                {item.label}
                            </span>
                        )}

                        {/* Hover effect */}
                        {!isActive && isHovered && (
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-transparent opacity-50 rounded-xl z-50" />
                        )}
                    </div>
                </Link>

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap text-sm font-medium">
                            {item.label}
                            {item.badge && (
                                <span className="ml-2 bg-red-500 px-1.5 py-0.5 rounded-full text-xs">
                                    {item.badge}
                                </span>
                            )}
                            {/* Arrow */}
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                        </div>
                    </div>
                )}
            </li>
        );
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed md:relative top-0 left-0 h-screen z-50 
                    bg-gradient-to-b from-white via-gray-50 to-white
                    border-r border-gray-200
                    shadow-2xl md:shadow-none
                    transition-all duration-300 ease-in-out
                    ${isOpen ? "w-72" : "w-0 md:w-20"} 
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Header with Logo */}
                    <div className="relative p-4 border-b border-gray-200 bg-white">
                        <Link href="/">
                            <div className="flex items-center gap-3 cursor-pointer group">
                                {/* Logo with gradient background */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
                                    <div className="relative bg-gradient-to-br from-teal-500 to-teal-600 p-2 rounded-xl">
                                        <img src="/logo/logo2.png" className="h-6 w-6 brightness-0 invert" alt="Logo" />
                                    </div>
                                </div>

                                {isOpen && (
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                                            Yogalink
                                        </span>
                                        <span className="text-xs text-gray-500 font-medium">Instructor Portal</span>
                                    </div>
                                )}
                            </div>
                        </Link>

                        {/* Toggle button - Desktop only */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-gray-200 rounded-full items-center justify-center text-gray-600 hover:bg-teal-50 hover:border-teal-500 hover:text-teal-600 transition-all shadow-md"
                        >
                            {isOpen ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
                        </button>
                    </div>

                    {/* Main Navigation */}
                    <div className={`flex-1 px-3 py-4 space-y-6 ${isOpen ? 'overflow-y-auto' : 'overflow-hidden'}`}>
                        {/* Main Section - Application Workflow */}
                        <div>
                            {isOpen && (
                                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Main Menu
                                </h3>
                            )}
                            <ul className="space-y-1">
                                {mainNavItems.map((item) => (
                                    <NavItem key={item.href} item={item} section="main" />
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* User Profile Section */}
                    <div className="border-t border-gray-200 p-3 bg-gradient-to-br from-gray-50 to-white">
                        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-all cursor-pointer group ${!isOpen && "justify-center"}`}>
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold shadow-md">
                                    <MdPerson size={20} />
                                </div>
                                {/* Online indicator */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-2xl">
                <div className="flex justify-around items-center px-2 py-2 safe-area-inset-bottom">
                    {(userRole === "admin" ? [
                        {
                            href: "/admin/dashboard",
                            label: "Home",
                            icon: <MdDashboard size={24} />,
                        },
                        {
                            href: "/admin/applications",
                            label: "Applications",
                            icon: <FaUsers size={22} />,
                            badge: "12",
                        },
                        {
                            href: "/admin/interviews",
                            label: "Interviews",
                            icon: <MdSchedule size={22} />,
                            badge: "5",
                        },
                        {
                            href: "/admin/approvals",
                            label: "Approvals",
                            icon: <FaChartLine size={20} />,
                            badge: "3",
                        },
                        {
                            href: "/admin/managers",
                            label: "Managers",
                            icon: <MdPerson size={22} />,
                        },
                    ] : [
                        {
                            href: "/manager/dashboard",
                            label: "Home",
                            icon: <MdDashboard size={24} />,
                        },
                        {
                            href: "/manager/application",
                            label: "Applications",
                            icon: <FaUsers size={22} />,
                        },
                    ]).map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link href={item.href} key={item.href}>
                                <div
                                    onClick={() => handleNavigationClick(item.href)}
                                    className="relative flex flex-col items-center gap-1 cursor-pointer group"
                                >
                                    {/* Icon container */}
                                    <div className={`
                                        relative p-2 rounded-xl transition-all duration-200
                                        ${isActive
                                            ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-200 -translate-y-1"
                                            : "text-gray-500 group-hover:bg-gray-100"
                                        }
                                    `}>
                                        {item.icon}
                                        {/* Badge */}
                                        {item.badge && (
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                    {/* Label */}
                                    <span className={`
                                        text-xs font-medium transition-colors
                                        ${isActive ? "text-teal-600" : "text-gray-600"}
                                    `}>
                                        {item.label}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

