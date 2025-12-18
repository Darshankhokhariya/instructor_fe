import React from "react";
import Modal from "../common/Modal";
import { BiCheckCircleIcon, FaShieldAlt } from "../../../utils/icon";
import Link from "next/link";

const SubmissionDialog = ({
  isOpen,
  onClose,
  onAccept,
  profileImagePreview,
}) => {
  // Using the generic Modal component for structure, backdrop, and closure.
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex items-center">
          <FaShieldAlt size={20} className="mr-2 text-teal-600" /> Final
          Agreement & Review
        </span>
      }
    >
      <div className="space-y-4 text-slate-700 custom-scrollbar">
        <p className="font-semibold text-sm">
          Please review your profile image and confirm acceptance of our Privacy
          Policy and Terms of Service before finalizing your application.
        </p>

        {/* Terms & Privacy Mock Content */}
        <div className="border border-slate-300 rounded-lg p-4 h-48 overflow-y-auto bg-slate-50 text-sm">
          <h4 className="font-bold text-teal-800 mb-2">
            1. Privacy Policy Summary
          </h4>
          <p className="text-xs mb-3">
            By accepting, you consent to the collection and processing of your
            personal data (including contact, address, education, and financial
            identifiers like PAN/Aadhaar) solely for the purpose of platform
            operation, verification, compliant payments, and public profile
            display. We commit to protecting your data with industry-standard
            security measures.
          </p>
          <h4 className="font-bold text-teal-800 mb-2">
            2. Terms of Service Summary
          </h4>
          <p className="text-xs">
            You agree to our fee structure, the ethical standards, and the
            non-compete clause for clients acquired through Yogalink. You retain
            all IP rights to your content, but grant Yogalink a limited license
            to display your videos and profile. Termination requires 30 days
            notice.
          </p>
          <Link
            href="/privacy-policy"
            className="text-xs font-bold mt-3 text-red-600"
          >
            Privacy Policy & Terms
          </Link>
        </div>

        {/* Footer Actions (placed inside Modal content for styling, but logically acts as footer) */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-slate-300 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors flex items-center"
          >
            <BiCheckCircleIcon className="mr-2" size={16} /> I Accept & Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SubmissionDialog;
