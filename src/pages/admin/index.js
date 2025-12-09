// /app/admin/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { BiCheckCircle, BiFolder, BiX } from 'react-icons/bi';
import { FaClock } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';

// --- MOCK DATA ---
const mockDashboardData = {
    totalApplications: 45,
    pendingReview: 12,
    interviewsScheduled: 5,
    approved: 8,
    rejected: 20,
};

const mockActionItems = [
    { id: 1, name: 'Priya Sharma', status: 'Pending Review', link: '/admin/applications/1' },
    { id: 2, name: 'Vikram Patel', status: 'Review Complete', link: '/admin/applications/5' },
];

const mockRecentActivity = [
    { id: 1, user: 'Manager John', action: 'Approved', applicant: 'Neha Verma', time: '2 hours ago' },
    { id: 2, user: 'Admin Jane', action: 'Scheduled Interview for', applicant: 'Amit Singh', time: '5 hours ago' },
    { id: 3, user: 'Applicant', action: 'Submitted New Application', applicant: 'Karan Jha', time: '1 day ago' },
];

// --- COMPONENT: STATS CARD ---
const StatsCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition duration-300 hover:shadow-xl">
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className={`text-4xl font-bold mt-1 ${colorClass}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClass.replace('text-', 'bg-')} bg-opacity-10`}>
            <Icon className={`h-8 w-8 ${colorClass}`} aria-hidden="true" />
        </div>
    </div>
);

// --- DASHBOARD PAGE ---
export default function AdminDashboardPage() {
    const [data, setData] = useState(mockDashboardData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading Dashboard Data...</div>;
    }

    const { totalApplications, pendingReview, interviewsScheduled, approved, rejected } = data;

    return (
        <Layout>
            <div className="p-8 bg-gray-50 ">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    🌟 Administration Dashboard
                </h1>
                <p className="text-gray-600 mb-8">
                    Welcome! Here's a quick overview of the Yoga Instructor applications pipeline.
                </p>

                {/* 1. Summary Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
                    <StatsCard
                        title="Total Applications"
                        value={totalApplications}
                        icon={BiFolder}
                        colorClass="text-indigo-600"
                    />
                    <StatsCard
                        title="Pending Review"
                        value={pendingReview}
                        icon={FaClock}
                        colorClass="text-yellow-600"
                    />
                    <StatsCard
                        title="Interviews Scheduled"
                        value={interviewsScheduled}
                        icon={FiClock}
                        colorClass="text-blue-600"
                    />
                    <StatsCard
                        title="Approved"
                        value={approved}
                        icon={BiCheckCircle}
                        colorClass="text-green-600"
                    />
                    <StatsCard
                        title="Rejected"
                        value={rejected}
                        icon={BiX}
                        colorClass="text-red-600"
                    />
                </div>

                {/* 2. Actionable Items & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Actionable Items (Priority Tasks) */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">🔥 Immediate Action Required</h2>
                            <Link href="/admin/applications" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                View All
                            </Link>
                        </div>

                        <ul className="divide-y divide-gray-200">
                            {mockActionItems.length > 0 ? (
                                mockActionItems.map((item) => (
                                    <li key={item.id} className="py-4 flex justify-between items-center">
                                        <div>
                                            <p className="text-base font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">Status: <span className="font-semibold text-yellow-700">{item.status}</span></p>
                                        </div>
                                        <Link href={item.link} className="py-1 px-3 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition">
                                            Review Now
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500 py-4">No immediate actions needed. Great job!</p>
                            )}
                        </ul>
                    </div>

                    {/* Right Column: Recent Activity */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
                            🕒 Recent Activity Log
                        </h2>
                        <ul className="space-y-4">
                            {mockRecentActivity.map((activity) => (
                                <li key={activity.id} className="text-sm border-l-2 border-indigo-400 pl-3">
                                    <p className="font-medium text-gray-900">
                                        <span className="text-indigo-600">{activity.user}</span> {activity.action} **{activity.applicant}**
                                    </p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}