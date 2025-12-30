"use client";
import Layout from "@/components/layout/Layout";
import RecentApplications from "@/components/manager/RecentApplications";
import { getSingleUser, getUsers, selectUsers } from "@/redux/slices/userSlice";
import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaPhoneAlt,
  FaVideo,
  FaCheckCircle,
  FaUserCheck,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

// Sample data for applications
const sampleApplications = [
  {
    id: 1,
    name: "Ramesh Patel",
    status: "Pending",
    managerApproval: false,
    adminApproval: false,
  },
  {
    id: 2,
    name: "Sita Sharma",
    status: "Approved",
    managerApproval: true,
    adminApproval: false,
  },
  {
    id: 3,
    name: "Rahul Mehta",
    status: "Pending",
    managerApproval: true,
    adminApproval: true,
  },
];

const dashboardStats = [
  {
    id: 1,
    title: "Submitted Forms",
    value: "12",
    icon: <FaClipboardList size={24} />,
    bgColor: "bg-gradient-to-r from-primary/50 to-primary",
  },
  {
    id: 2,
    title: "Scheduled Interviews",
    value: "5",
    icon: <FaPhoneAlt size={24} />,
    bgColor: "bg-gradient-to-r from-primary/50 to-primary",
  },
  {
    id: 3,
    title: "Interview Recordings",
    value: "3",
    icon: <FaVideo size={24} />,
    bgColor: "bg-gradient-to-r from-primary/50 to-primary",
  },
  {
    id: 4,
    title: "Passed Interviews",
    value: "2",
    icon: <FaCheckCircle size={24} />,
    bgColor: "bg-gradient-to-r from-primary/50 to-primary",
  },
];

export default function AdminDashboard() {
  const [data, setData] = useState(sampleApplications);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();

  const updateField = (id, key, value) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  // Stats
  const total = data.length;
  const pending = data.filter((d) => d.status === "Pending").length;
  const approvedByManager = data.filter((d) => d.managerApproval).length;
  const approvedByAdmin = data.filter((d) => d.adminApproval).length;

  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers({ page, limit }));
  }, [page, limit]);



  return (
    <Layout>
      <div className="p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Admin / Manager Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dashboardStats?.map((stat) => (
            <div
              key={stat.id}
              className={`${stat.bgColor} text-white p-6 rounded-2xl shadow-lg relative overflow-hidden hover:scale-105 transform transition`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium opacity-80">
                    {stat.title}
                  </h4>
                  <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="text-white opacity-90">{stat.icon}</div>
              </div>

              {/* Decorative wave or shape */}
              <div className="absolute bottom-0 right-0 opacity-20 w-32 h-32 rounded-full bg-white"></div>
            </div>
          ))}
        </div>

        <div className="w-[70%] mt-6">
          <RecentApplications data={users?.data?.data} updateField={updateField} />
        </div>
      </div>
    </Layout>
  );
}