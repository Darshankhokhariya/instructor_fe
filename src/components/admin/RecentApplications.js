"use client";
import React, { useState } from "react";
import ApproveModal from "../modal/Admin/ApproveModel";
import { BiCheckCircle } from "react-icons/bi";
import { BiCheckCircleIcon } from "../../../utils/icon";
import ApproveInstructorModal from "../modal/Admin/ApproveInstructorModal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  changeUserStatus,
  selectStatusLoading,
} from "@/redux/slices/userSlice";


export default function RecentApplications({ data }) {
  const [modalData, setModalData] = useState(null);
  const [user, setUser] = useState({});
  const [approveModal, setApproveModal] = useState(false);
  const [activeTab, setActiveTab] = useState("All"); // Tabs: All, Pending, Interview, Approved
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    status: "",
    reason: "",
  });

  const loading = useSelector(selectStatusLoading);

  // Filter applications based on active tab
  const filteredApplications =
    activeTab === "All"
      ? data
      : data?.filter((app) =>
          activeTab === "Pending"
            ? app.overallApprovalStatus === "pending"
            : activeTab === "Interview"
            ? app.overallApprovalStatus === "interview_scheduled"
            : activeTab === "Approved"
            ? app.overallApprovalStatus === "approved"
            : false
        );


  const handleOpenApprovelModal = (data) => {
    setApproveModal(true);
    setUser(data);
  };
  const validateForm = () => {
    const errors = {};

    if (!formData.status.trim()) errors.status = "Status is required";

    if (
      !formData.reason.trim()
    ) {
      errors.reason = "Reason is required when rejecting";
    }

    setValidationErrors(errors); // set state for errors

    return Object.keys(errors).length === 0; // return boolean
  };

  const handleChange = (e) => {
    let name, value;

    if (e?.target?.name) {
      // normal input/textarea event
      name = e.target.name;
      value = e.target.value;
    } else if (e?.name && e?.value !== undefined) {
      // custom select component
      name = e.name;
      value = e.value;
    }

    if (!name) return;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // live validation
    setValidationErrors((prev) => {
      const errors = { ...prev };
      if (!value || !value.toString().trim())
        errors[name] = "This field is required";
      else delete errors[name];
      return errors;
    });
  };

  const handleClose = () => {
    setApproveModal(false);
    setFormData({
      status: "",
      reason: "",
    });
    setValidationErrors({});
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      id: user?.approvalId,
      status: formData?.status,
      reason: formData?.reason,
    };

    // ✅ form is valid — continue API call
    try {
      const res = await dispatch(changeUserStatus(payload)).unwrap();

      if (res?.status === 200) {
        toast.success(res?.message || "Status changed successfully!");
        handleClose();
      } else {
        toast.error(res?.message || "Status changed successfully!");
      }
    } catch (error) {
      toast.error(error?.message || error || "Something went wrong");
    }
  };

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
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeTab === tab
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
            {filteredApplications?.map((row) => (
              <tr
                key={row.id}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200`}
              >
                <td className="py-3 px-4 text-gray-800">
                  {row?.onboardingSteps?.name}
                </td>
                <td className="py-3 px-4 text-gray-600">{row?.email}</td>
                <td className="py-3 px-4 text-gray-600">
                  {row?.onboardingSteps?.primaryMobile}
                </td>
                <td className="py-3 px-4 flex justify-center">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      row?.overallApprovalStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : row?.overallApprovalStatus === "interview_scheduled"
                        ? "bg-blue-100 text-blue-800"
                        : row?.overallApprovalStatus === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {row?.overallApprovalStatus}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                      onClick={() => setModalData(row)}
                    >
                      View
                    </button>
                    <button
                      className="px-4 py-1 bg-primary cursor-pointer text-white rounded-md hover:bg-primary/90 transition"
                      onClick={() => handleOpenApprovelModal(row)}
                    >
                      <BiCheckCircleIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalData && (
        <ApproveModal data={modalData} onClose={() => setModalData(null)} />
      )}

      {approveModal && (
        <ApproveInstructorModal
          formData={formData}
          onChange={handleChange}
          onClose={handleClose}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </>
  );
}
