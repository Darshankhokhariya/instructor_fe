"use client";
import React, { useState } from "react";
import ApproveModal from "../modal/Admin/ApproveModel";


const sampleApplications = [
    {
        id: 1,
        // 1. Personal
        fullName: "Ramesh Patel",
        dob: "1990-05-10",
        gender: "Male",
        email: "ramesh@example.com",
        phone: "9876543210",
        alternatePhone: "9123456780",

        // 2. Address (Permanent)
        permanentCountry: "India",
        permanentState: "Gujarat",
        permanentCity: "Ahmedabad",
        permanentPincode: "380001",
        permanentArea: "Navrangpura",
        permanentBuilding: "Building A",
        permanentBlock: "Block 1",

        // 2. Address (Current)
        currentCountry: "India",
        currentState: "Gujarat",
        currentCity: "Ahmedabad",
        currentPincode: "380009",
        currentArea: "Prahlad Nagar",
        currentBuilding: "Building B",
        currentBlock: "Block 2",

        // 3. Emergency Contact
        emergencyName: "Suresh Patel",
        emergencyPhone: "9876501234",
        emergencyRelation: "Brother",

        // 4. Education
        schoolCollege: "Ahmedabad University",
        degreeName: "B.Sc Yoga",
        universityName: "Gujarat University",

        // 5. Taxation
        panCard: "ABCDE1234F",
        aadharNumber: "123412341234",
        gstin: "24ABCDE1234F1Z5",

        // 6. Social Media
        socialFb: "https://facebook.com/ramesh",
        socialLi: "https://linkedin.com/in/ramesh",
        socialInsta: "https://instagram.com/ramesh",
        socialYt: "https://youtube.com/ramesh",

        // 7. Qualifications
        certifications: [{ title: "Yoga Trainer Certificate", file: null }],
        yogaStyles: ["Hatha", "Vinyasa"],
        introVideo: "https://video.com/intro.mp4",
        sampleVideos: ["https://video.com/sample1.mp4", "https://video.com/sample2.mp4"],
        philosophy: "Mindfulness and holistic living",

        // 8. Availability
        days: ["Monday", "Wednesday", "Friday"],
        times: ["Morning", "Evening"],
        startTime: "07:00",
        endTime: "19:00",

        // 9. Pricing
        groupRate: "500",
        privateRate: "1000",
        trialMode: "yes",

        // 10. Agreements
        confirmAccurate: true,
        ethicalStandards: true,
        serviceMindset: true,
        signature: "Ramesh Patel",

        // Additional info
        status: "Pending",
        experience: "3 Years Yoga Teacher",
        submittedAt: "2025-01-10",
    },
    // You can duplicate and customize for more applicants
    {
        id: 2,
        fullName: "Anita Sharma",
        dob: "1992-08-15",
        gender: "Female",
        email: "anita@example.com",
        phone: "9988776655",
        alternatePhone: "9876543210",
        permanentCountry: "India",
        permanentState: "Maharashtra",
        permanentCity: "Mumbai",
        permanentPincode: "400001",
        permanentArea: "Andheri",
        permanentBuilding: "Building C",
        permanentBlock: "Block 3",
        currentCountry: "India",
        currentState: "Maharashtra",
        currentCity: "Mumbai",
        currentPincode: "400005",
        currentArea: "Bandra",
        currentBuilding: "Building D",
        currentBlock: "Block 4",
        emergencyName: "Rajesh Sharma",
        emergencyPhone: "9988771122",
        emergencyRelation: "Brother",
        schoolCollege: "Mumbai University",
        degreeName: "M.Sc Yoga",
        universityName: "Mumbai University",
        panCard: "XYZAB1234P",
        aadharNumber: "234523452345",
        gstin: "27XYZAB1234P1Z3",
        socialFb: "https://facebook.com/anita",
        socialLi: "https://linkedin.com/in/anita",
        socialInsta: "https://instagram.com/anita",
        socialYt: "https://youtube.com/anita",
        certifications: [{ title: "Advanced Yoga Certification", file: null }],
        yogaStyles: ["Ashtanga", "Yin"],
        introVideo: "https://video.com/anita_intro.mp4",
        sampleVideos: ["https://video.com/anita1.mp4", "https://video.com/anita2.mp4"],
        philosophy: "Yoga for mental peace",
        days: ["Tuesday", "Thursday"],
        times: ["Afternoon"],
        startTime: "09:00",
        endTime: "18:00",
        groupRate: "600",
        privateRate: "1200",
        trialMode: "none",
        confirmAccurate: true,
        ethicalStandards: true,
        serviceMindset: true,
        signature: "Anita Sharma",
        status: "Interview Scheduled",
        experience: "Certified Yoga Trainer",
        submittedAt: "2025-01-12",
    },
];

export default function RecentApplications() {
    const [modalData, setModalData] = useState(null);
    const [activeTab, setActiveTab] = useState("All"); // Tabs: All, Pending, Interview, Approved

    // Filter applications based on active tab
    const filteredApplications =
        activeTab === "All"
            ? sampleApplications
            : sampleApplications.filter((app) =>
                activeTab === "Pending"
                    ? app.status === "Pending"
                    : activeTab === "Interview"
                        ? app.status === "Interview Scheduled"
                        : activeTab === "Approved"
                            ? app.status === "Approved"
                            : false
            );

    return (
        <>
            <div className="bg-white p-6 shadow-lg rounded-2xl w-full overflow-x-auto">
                <h2 className="text-xl font-medium mb-4 text-gray-900">
                    Recent Applications
                </h2>

                {/* Tabs */}
                <div className="flex space-x-4 mb-6">
                    {["All", "Pending", "Interview", "Approved"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 rounded-full font-medium transition ${activeTab === tab
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <table className="w-full min-w-[700px] table-auto border-separate border-spacing-y-3">
                    <thead className="rounded-4xl bg-primary/20">
                        <tr className="text-gray-500 uppercase rounded-2xl text-sm tracking-wider">
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Phone</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredApplications.map((row) => (
                            <tr
                                key={row.id}
                                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200`}
                            >
                                <td className="py-3 px-4 text-gray-800">{row.fullName}</td>
                                <td className="py-3 px-4 text-gray-600">{row.email}</td>
                                <td className="py-3 px-4 text-gray-600">{row.phone}</td>
                                <td className="py-3 px-4 flex justify-center">
                                    <span
                                        className={`px-3 py-1 text-sm font-semibold rounded-full ${row.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : row.status === "Interview Scheduled"
                                                ? "bg-blue-100 text-blue-800"
                                                : row.status === "Approved"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {row.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        className="px-4 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                                        onClick={() => setModalData(row)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalData && <ApproveModal data={modalData} onClose={() => setModalData(null)} />}
        </>
    );
}