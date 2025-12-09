import Layout from '@/components/layout/Layout';
import CreateClassModal from '@/components/modal/CreateClassModal';
import React, { useState } from 'react';
import {
    FiUsers,
    FiDollarSign,
    FiVideo,
    FiCalendar,
    FiTrendingUp,
    FiTrendingDown,
    FiClock,
    FiPlayCircle,
    FiMoreVertical
} from 'react-icons/fi';

const InstructorDashboard = () => {
    // Mock Data based on Section 5.6.3
    const stats = {
        totalEarnings: 1250.00,
        earningsGrowth: 12.5, // percentage
        activeSubscribers: 142,
        subscriberChurn: -2.1, // percentage (negative is good)
        sessionAttendance: 88, // percentage
        upcomingClasses: 5
    };

    const [isClassModalOpen, setIsClassModalOpen] = useState(false);

    const topClasses = [
        { id: 1, title: "Morning Vinyasa Flow", views: 1240, rating: 4.9, type: "Video" },
        { id: 2, title: "Ayurvedic Diet Basics", views: 980, rating: 4.8, type: "Course" },
        { id: 3, title: "Power Yoga for Core", views: 850, rating: 4.7, type: "Video" },
    ];

    const upcomingSchedule = [
        { id: 1, title: "Hatha Yoga Live", time: "08:00 AM", date: "Today", attendees: 12, type: "Live Class" },
        { id: 2, title: "1:1 Consultation (Anjali)", time: "11:30 AM", date: "Today", attendees: 1, type: "Consultation" },
        { id: 3, title: "Evening Meditation", time: "06:00 PM", date: "Tomorrow", attendees: 45, type: "Live Class" },
    ];

    const weeklyRevenue = [45, 60, 35, 80, 55, 90, 70]; // Mock percentages for bar chart

    return (
        <>
            <Layout>
                <div className="p-6 bg-gray-50 min-h-screen">

                    {/* 1. Welcome & Quick Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Namaste, Darshan</h1>
                            <p className="text-gray-500">Here is what’s happening with your studio today.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition shadow-sm cursor-pointer">
                                <FiVideo size={18} />
                                Upload Video
                            </button>
                            <button
                                onClick={() => setIsClassModalOpen(true)}
                                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition shadow-sm cursor-pointer"
                            >
                                <FiCalendar size={18} />
                                Create Class
                            </button>
                        </div>
                    </div>

                    {/* 2. Key Metrics (Section 5.6.3) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                        {/* Earnings Card */}
                        <StatCard
                            title="Total Earnings (Month)"
                            value={`$${stats.totalEarnings}`}
                            trend={stats.earningsGrowth}
                            icon={<FiDollarSign className="text-green-600" size={24} />}
                            color="bg-green-50"
                        />

                        {/* Subscribers Card */}
                        <StatCard
                            title="Active Subscribers"
                            value={stats.activeSubscribers}
                            trend={stats.subscriberChurn}
                            trendLabel="Churn"
                            inverseTrend // For churn, negative is green
                            icon={<FiUsers className="text-blue-600" size={24} />}
                            color="bg-blue-50"
                        />

                        {/* Attendance Card */}
                        <StatCard
                            title="Session Attendance"
                            value={`${stats.sessionAttendance}%`}
                            subtext="Avg per class"
                            icon={<FiCalendar className="text-purple-600" size={24} />}
                            color="bg-purple-50"
                        />

                        {/* Payout Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Next Payout</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">Nov 30</h3>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                                <span className="text-gray-500">Est. Amount</span>
                                <span className="font-semibold text-gray-800">$980.00</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: Revenue & Top Content (Span 2) */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Revenue Chart (CSS Only) */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-gray-800">Revenue Analytics</h3>
                                    <select className="text-sm border-gray-300 border rounded-md p-1 bg-gray-50 text-gray-600">
                                        <option>This Week</option>
                                        <option>Last Week</option>
                                    </select>
                                </div>

                                {/* Simple Bar Chart Visualization */}
                                <div className="h-48 flex items-end justify-between gap-2">
                                    {weeklyRevenue.map((height, idx) => (
                                        <div key={idx} className="w-full flex flex-col items-center group">
                                            <div
                                                className="w-full bg-primary/20 rounded-t-sm group-hover:bg-indigo-200 transition-all relative"
                                                style={{ height: `${height}%` }}
                                            >
                                                {/* Tooltip */}
                                                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded transition-opacity">
                                                    ${height * 10}
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400 mt-2">
                                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Top Performing Content */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-800">Top Performing Content</h3>
                                    <button className="text-sm text-primary font-medium hover:underline">View All</button>
                                </div>
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                                        <tr>
                                            <th className="px-6 py-3">Title</th>
                                            <th className="px-6 py-3">Type</th>
                                            <th className="px-6 py-3 text-center">Views</th>
                                            <th className="px-6 py-3 text-center">Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {topClasses.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                                        <FiPlayCircle size={16} className="text-gray-500" />
                                                    </div>
                                                    {item.title}
                                                </td>
                                                <td className="px-6 py-4 text-xs">
                                                    <span className={`px-2 py-1 rounded-full ${item.type === 'Course' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                                                        {item.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 text-center">{item.views}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600 text-center flex justify-center items-center gap-1">
                                                    {item.rating} <span className="text-yellow-400">★</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right Column: Schedule & Notifications (Span 1) */}
                        <div className="space-y-8">

                            {/* Upcoming Schedule */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-gray-800">Upcoming Schedule</h3>
                                    <FiCalendar size={18} className="text-gray-400" />
                                </div>
                                <div className="space-y-4">
                                    {upcomingSchedule.map((session) => (
                                        <div key={session.id} className="flex gap-4 p-3 rounded-lg border border-gray-100 hover:border-indigo-100 transition hover:bg-indigo-50/30">
                                            <div className="flex flex-col items-center justify-center w-12 bg-primary/20 rounded text-primary p-1">
                                                <span className="text-xs font-bold uppercase">{session.date === 'Today' ? 'TOD' : 'TOM'}</span>
                                                <span className="text-xs">{session.time.split(' ')[0]}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{session.title}</h4>
                                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                                    <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{session.type}</span>
                                                    <span>• {session.attendees} Attending</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 py-2 text-sm font-medium text-primary border border-indigo-100 rounded-lg hover:bg-indigo-50 transition">
                                    View Full Calendar
                                </button>
                            </div>

                            {/* Quick Stats / Recent Subs */}
                            <div className="bg-primary text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                                    <FiUsers size={120} />
                                </div>
                                <h3 className="font-semibold text-lg relative z-10">New Subscribers</h3>
                                <p className="text-white text-sm relative z-10">You gained 12 new students this week!</p>
                                <div className="mt-6 flex -space-x-2 relative z-10">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-gray-50 flex items-center justify-center text-xs font-bold text-primary">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-primary bg-white flex items-center justify-center text-xs font-bold text-primary">
                                        +8
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
            <CreateClassModal
                isOpen={isClassModalOpen}
                onClose={() => setIsClassModalOpen(false)}
            />
        </>
    );
};

// Reusable Helper Component for Stat Cards
const StatCard = ({ title, value, trend, subtext, icon, color, trendLabel = "vs last month", inverseTrend = false }) => {
    const isPositive = trend > 0;
    // If inverseTrend is true (e.g. Churn), Negative trend is GREEN (Good), Positive is RED (Bad)
    const isGood = inverseTrend ? !isPositive : isPositive;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
                </div>
                <div className={`p-2 rounded-lg ${color}`}>
                    {icon}
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
                {trend !== undefined && (
                    <span className={`flex items-center font-medium ${isGood ? 'text-green-600' : 'text-red-600'}`}>
                        {isGood ? <FiTrendingUp size={16} className="mr-1" /> : <FiTrendingDown size={16} className="mr-1" />}
                        {Math.abs(trend)}%
                    </span>
                )}
                <span className="text-gray-400 ml-2">
                    {trend !== undefined ? trendLabel : subtext}
                </span>
            </div>
        </div>


    );
};

export default InstructorDashboard;