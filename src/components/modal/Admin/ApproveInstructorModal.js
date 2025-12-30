"use client";
import Modal from "@/components/common/Modal";
import Selector from "@/components/common/Selector";
import TextArea from "@/components/common/TextArea";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function ApproveInstructorModal({
  formData,
  onChange,
  onClose,
  validationErrors,
  handleSubmit,
  loading,
  setApproveModal,
  approveModal
}) {

  return (
    <Modal title="Approve Instructor" isOpen={approveModal} onClose={onClose}>

      <h2 className="text-xl font-medium text-gray-800 mb-6 border-b pb-3">
        Approve Instructor
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="py-5">
          <Selector
            label="Status"
            name="status"
            options={[
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
            ]}
            value={formData.status}
            onChange={onChange}
            required
            placeholder="Select Status"
            error={validationErrors.status}
          />
        </div>
        {formData.status === "rejected" && (
          <div>
            <TextArea
              label="Reason"
              name="reason"
              value={formData.reason}
              onChange={onChange}
              placeholder="Write a reason to reject applicant"
              error={validationErrors.reason}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 disabled:bg-teal-200 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 transform hover:bg-teal-700 text-white px-4 py-2 rounded-lg mt-5"
        >
          {loading ? "Submiting..." : "Submit"}
        </button>
        {/* Personal Information */}
      </form>
    </Modal >
  );
} 
