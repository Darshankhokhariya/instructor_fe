'use client';
import Layout from '@/components/layout/Layout';
import React, { useState } from 'react';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';
import { FiEye } from 'react-icons/fi';

const sampleApplications = [
    {
        id: 1,
        fullName: "Ramesh Patel",
        email: "ramesh@example.com",
        status: "Pending",
        experience: "3 Years Yoga Teacher",
    },
    {
        id: 2,
        fullName: "Anita Sharma",
        email: "anita@example.com",
        status: "Interview Scheduled",
        experience: "Certified Yoga Trainer",
    },
];

export default function SubmittedFormsPage() {
    const [data, setData] = useState(sampleApplications);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // === Toggle Manager/Admin Approval ===
    const handleApproval = (id, type) => {
        setData(prev =>
            prev.map(item =>
                item.id === id ? { ...item, [type]: !item[type] } : item
            )
        );
    };

    // === Change Status ===
    const handleStatusChange = (id, status) => {
        setData(prev =>
            prev.map(item => (item.id === id ? { ...item, status } : item))
        );
    };

    // === Search + Filter ===
    const filteredData = data.filter(item => {
        const matchesSearch =
            item.fullName.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === 'All' ? true : item.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <Layout>
            <div className="bg-gray-50 p-6">
                <h1 className="text-3xl font-bold text-primary mb-6">Submitted Applications</h1>

                {/* Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    <select
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Approved">Approved</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr className="text-gray-700 text-sm uppercase tracking-wide">
                                <th className="py-4 px-6 text-left">Name</th>
                                <th className="py-4 px-6 text-left">Email</th>
                                <th className="py-4 px-6 text-left">Approvals</th>
                                <th className="py-4 px-6 text-left">Status</th>

                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.map(item => (
                                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition">

                                    <td className="py-4 px-6 font-medium text-gray-900">
                                        {item.fullName}
                                        <div className="text-xs text-gray-500">{item.experience}</div>
                                    </td>

                                    <td className="py-4 px-6 text-gray-700">{item.email}</td>




                                    <td className="py-4 px-">
                                        <button
                                            onClick={() => handleApproval(item.id, "managerApproval")}
                                            className={`px-3 py-1.5 text-sm rounded-full
                                            ${item.managerApproval ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}
                                        `}
                                        >
                                            {item.managerApproval ? "Approved" : "Pending"}
                                        </button>
                                    </td>

                                    <td className="py-4 px-6 ">
                                        <button
                                            onClick={() => handleApproval(item.id, "adminApproval")}
                                            className={`px-3 py-1.5 text-sm rounded-full
                                            ${item.adminApproval ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}
                                        `}
                                        >
                                            {item.adminApproval ? "Approved" : "Pending"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredData.length === 0 && (
                        <p className="text-center text-gray-500 py-5">No applications found.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
