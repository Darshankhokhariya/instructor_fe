// /app/admin/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 🛑 IMPORT REACT ICONS HERE 🛑
import {
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaFolderOpen,
    FaArrowRight,
    FaChartPie,
} from 'react-icons/fa';
import { IoIosFlash, IoIosPeople, IoMdAlert } from 'react-icons/io';
import Layout from '@/components/layout/Layout';

// --- MOCK DATA (Updated for realism) ---
const mockDashboardData = {
    totalApplications: 45,
    pendingReview: 12,
    interviewsScheduled: 5,
    approved: 8,
    rejected: 20,
    // Calculated for the chart
    pendingReviewPercent: (12 / 45) * 100,
    approvedPercent: (8 / 45) * 100,
    rejectedPercent: (20 / 45) * 100,
};

const mockActionItems = [
    { id: 1, name: 'Priya Sharma', status: 'Requires Review', link: '/admin/applications/1', stage: 'Pending Review' },
    { id: 2, name: 'Vikram Patel', status: 'Review Complete', link: '/admin/applications/5', stage: 'Interviews Scheduled' },
    { id: 3, name: 'Karan Jha', status: 'Requires Review', link: '/admin/applications/10', stage: 'Pending Review' },
];

const mockRecentActivity = [
    { id: 1, user: 'Manager John', action: 'Approved', applicant: 'Neha Verma', time: '2 hours ago', icon: FaCheckCircle, color: 'text-green-500' },
    { id: 2, user: 'Admin Jane', action: 'Scheduled Interview for', applicant: 'Amit Singh', time: '5 hours ago', icon: IoIosPeople, color: 'text-blue-500' },
    { id: 3, user: 'Applicant', action: 'Submitted New Application', applicant: 'Karan Jha', time: '1 day ago', icon: FaFolderOpen, color: 'text-indigo-500' },
];

// --- COMPONENT: STATS CARD ---
const StatsCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center justify-between transition duration-300 hover:shadow-lg">
        <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
            <p className={`text-4xl font-extrabold mt-1 ${colorClass}`}>{value}</p>
        </div>
        <div className={`p-4 rounded-full ${colorClass.replace('text-', 'bg-')} bg-opacity-15`}>
            <Icon className={`h-8 w-8 ${colorClass}`} aria-hidden="true" size={32} />
        </div>
    </div>
);

// --- NEW COMPONENT: MOCK DONUT CHART (For a professional look) ---
const ApplicationPipelineChart = ({ data }) => {
    const total = data.totalApplications;
    const pending = data.pendingReview;
    const approved = data.approved;
    const rejected = data.rejected;

    // Calculate percentage and start/end points for CSS conic-gradient
    // The CSS for a true donut chart is complex, so we'll use a simple visual
    // representation that still conveys the data professionally.

    // We'll use a stacked bar for simplicity that is wrapped in a "card" for a professional look.
    const pendingWidth = (pending / total) * 100;
    const approvedWidth = (approved / total) * 100;
    const rejectedWidth = (rejected / total) * 100;

    const chartData = [
        { label: 'Pending Review', value: pending, percent: pendingWidth, color: 'bg-yellow-500', icon: FaClock },
        { label: 'Approved', value: approved, percent: approvedWidth, color: 'bg-green-500', icon: FaCheckCircle },
        { label: 'Rejected', value: rejected, percent: rejectedWidth, color: 'bg-red-500', icon: FaTimesCircle },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-md h-full">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaChartPie className="w-5 h-5 mr-2 text-indigo-500" /> Pipeline Status
                </h2>
            </div>

            {/* Chart Visual - Stacked Bar */}
            <div className="h-6 flex rounded-lg overflow-hidden mb-6">
                <div style={{ width: `${pendingWidth}%` }} className="bg-yellow-500" title={`Pending: ${pending}`}></div>
                <div style={{ width: `${approvedWidth}%` }} className="bg-green-500" title={`Approved: ${approved}`}></div>
                <div style={{ width: `${rejectedWidth}%` }} className="bg-red-500" title={`Rejected: ${rejected}`}></div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
                {chartData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                            <span className={`h-3 w-3 rounded-full ${item.color} mr-2`}></span>
                            <span className="font-medium text-gray-700">{item.label}</span>
                        </div>
                        <span className="font-bold text-gray-900">{item.value} ({item.percent.toFixed(1)}%)</span>
                    </div>
                ))}
                <div className="pt-3 border-t text-sm font-semibold text-gray-800 flex justify-between">
                    <span>Total Applications</span>
                    <span>{total}</span>
                </div>
            </div>
        </div>
    );
};

// --- DASHBOARD PAGE ---
export default function AdminDashboardPage() {
    const [data, setData] = useState(mockDashboardData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch delay
        const timer = setTimeout(() => {
            setData(mockDashboardData);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-lg text-gray-500">Loading Dashboard Data...</div>;
    }

    const { totalApplications, pendingReview, interviewsScheduled, approved, rejected } = data;

    // Use a derived state for better representation of items needing immediate action
    const priorityActions = mockActionItems.filter(item => item.stage === 'Pending Review');


    return (
        <Layout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                    <span role="img" aria-label="dashboard">🚀</span> Talent Acquisition Dashboard
                </h1>
                <p className="text-md text-gray-600 mb-8">
                    Real-time overview of the Yoga Instructor applications pipeline.
                </p>

                {/* 1. Summary Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
                    <StatsCard
                        title="Total Applications"
                        value={totalApplications}
                        icon={FaFolderOpen}
                        colorClass="text-indigo-600"
                    />
                    <StatsCard
                        title="Pending Review"
                        value={pendingReview}
                        icon={FaClock}
                        colorClass="text-yellow-600"
                    />
                    <StatsCard
                        title="Interviews"
                        value={interviewsScheduled}
                        icon={IoIosPeople}
                        colorClass="text-blue-600"
                    />
                    <StatsCard
                        title="Approved Hires"
                        value={approved}
                        icon={FaCheckCircle}
                        colorClass="text-green-600"
                    />
                    <StatsCard
                        title="Rejected"
                        value={rejected}
                        icon={FaTimesCircle}
                        colorClass="text-red-600"
                    />
                </div>

                {/* 2. Charts, Actionable Items & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Pipeline Chart (NEW PROFESSIONAL ELEMENT) */}
                    <div className="lg:col-span-1">
                        <ApplicationPipelineChart data={data} />
                    </div>

                    {/* Middle Column: Actionable Items (Priority Tasks) */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <IoMdAlert className="w-6 h-6 mr-2 text-red-500" /> Priority Actions ({priorityActions.length})
                            </h2>
                            <Link href="/admin/applications" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                                View All <FaArrowRight className="ml-1 w-3 h-3" />
                            </Link>
                        </div>

                        <ul className="divide-y divide-gray-100">
                            {priorityActions.length > 0 ? (
                                priorityActions.map((item) => (
                                    <li key={item.id} className="py-3 flex justify-between items-center">
                                        <div>
                                            <p className="text-base font-semibold text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500 font-medium">Stage: <span className="text-yellow-700">{item.stage}</span></p>
                                        </div>
                                        <Link href={item.link} className="py-2 px-4 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md">
                                            Review Now
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500 py-4 text-center">No immediate actions needed. Excellent!</p>
                            )}
                        </ul>
                    </div>

                    {/* Right Column: Recent Activity */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
                            <span role="img" aria-label="clock">🕰️</span> System Activity Log
                        </h2>
                        <ul className="space-y-4">
                            {mockRecentActivity.map((activity) => (
                                <li key={activity.id} className="text-sm border-l-4 border-indigo-400 pl-3 pt-1">
                                    <div className='flex items-start'>
                                        <activity.icon className={`w-4 h-4 mr-2 mt-0.5 ${activity.color}`} />
                                        <p className="font-medium text-gray-900 leading-tight">
                                            <span className="text-indigo-600">{activity.user}</span> {activity.action} <span className="font-bold text-gray-800">{activity.applicant}</span>
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 ml-6">{activity.time}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}