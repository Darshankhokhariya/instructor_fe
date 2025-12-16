import React from 'react';
import { BiShield, BiWorld, BiCalendar, BiLink, BiDollarSign, BiTrash, BiCheckCircle } from 'react-icons/bi';

// Mock Components (retaining existing definitions)
const Header = ({ title, subtitle }) => (
    <div className="text-center py-10 bg-teal-50 border-b border-teal-200">
        <h1 className="text-4xl font-extrabold text-teal-900 flex items-center justify-center">
            <BiShield className="mr-3" size={32} /> {title}
        </h1>
        <p className="mt-2 text-lg text-slate-600">{subtitle}</p>
    </div>
);

const SectionTitle = ({ children, icon: Icon, className = "" }) => (
    <h2 className={`text-2xl font-bold text-teal-800 mt-8 mb-4 border-b pb-2 ${className}`}>
        {Icon && <Icon className="inline mr-2 text-teal-600" size={20} />}
        {children}
    </h2>
);

const SubSectionTitle = ({ children, className = "" }) => (
    <h3 className={`text-xl font-semibold text-slate-800 mt-6 mb-3 ${className}`}>
        {children}
    </h3>
);

/* -------------------------------------------------------------------------- */
/* --- COMBINED PAGE: Privacy Policy (Primary Focus) & Terms of Service --- */
/* -------------------------------------------------------------------------- */

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Header
                title="Yogalink Privacy Policy"
                subtitle="This document outlines how we handle your data and includes our Terms of Service."
            />

            <div className="w-full max-w-5xl mx-auto p-6 md:p-12 bg-white shadow-xl rounded-b-2xl">

                <p className="text-sm text-slate-500 mb-6 border-b pb-4 text-center">
                    **Effective Date:** December 16, 2025. | Please review both sections thoroughly before accepting.
                </p>

                {/* ========================================================================= */}
                {/* -------------------- PART 1: PRIVACY POLICY ----------------------------- */}
                {/* ========================================================================= */}

                <SectionTitle icon={BiShield}>Part 1: Instructor Privacy Policy</SectionTitle>
                <p className="mb-6 text-slate-700">
                    This section outlines how Yogalink manages the personal and professional data you submit during the onboarding process, ensuring transparency and security.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Column 1: Collection & Usage */}
                    <div>
                        <SubSectionTitle>1. Information We Collect</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-slate-700 text-sm">
                            <li>
                                <strong className="text-teal-700">Profile Data:</strong> Name, DOB, contact details, profile image.
                            </li>
                            <li>
                                <strong className="text-teal-700">Compliance Data:</strong> PAN Card, Aadhaar, GSTIN (for payouts and tax compliance).
                            </li>
                            <li>
                                <strong className="text-teal-700">Professional Data:</strong> Education, qualifications, certifications, teaching philosophy, videos, and social links.
                            </li>
                            <li>
                                <strong className="text-teal-700">Location & Availability:</strong> Permanent/current address and class scheduling preferences.
                            </li>
                        </ul>

                        <SubSectionTitle>2. Disclosure & Public Profile</SubSectionTitle>
                        <p className="text-slate-700 text-sm mb-3">
                            We do not sell your personal data. We share only what is necessary for service operation and legal compliance.
                        </p>
                        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-xs text-slate-700 rounded">
                            <p className="font-semibold">Publicly Visible Data:</p>
                            <p>Your Full Name, Profile Image, Yoga Styles, Intro/Sample Videos, Philosophy, and general location (City/State).</p>
                        </div>
                    </div>

                    {/* Column 2: Usage & Security */}
                    <div>
                        <SubSectionTitle>3. How We Use the Data</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-slate-700 text-sm">
                            <li>
                                <strong className="text-teal-700">Public Profile Creation:</strong> Displaying your professional details to students.
                            </li>
                            <li>
                                <strong className="text-teal-700">Verification:</strong> Identity and qualification checks.
                            </li>
                            <li>
                                <strong className="text-teal-700">Payments:</strong> Compliant processing of your earnings (TDS, GST, etc.).
                            </li>
                            <li>
                                <strong className="text-teal-700">Communication:</strong> Sending service updates and connecting you with booked students.
                            </li>
                        </ul>

                        <SubSectionTitle>4. Security and Retention</SubSectionTitle>
                        <p className="text-slate-700 text-sm">
                            We use industry-standard security (encryption, access controls) to protect your stored data. We retain data as long as your account is active or as legally required for tax/audit purposes. You have rights to data access and correction.
                        </p>
                    </div>
                </div>

                <hr className="my-10 border-t-2 border-slate-100" />

                {/* ========================================================================= */}
                {/* -------------------- PART 2: TERMS OF SERVICE --------------------------- */}
                {/* ========================================================================= */}

                <SectionTitle icon={BiCheckCircle}>Part 2: Instructor Terms of Service</SectionTitle>
                <p className="mb-6 text-slate-700">
                    This section outlines your contractual obligations, payment structure, and termination clauses with Yogalink.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Column 1: Obligations & Conduct */}
                    <div>
                        <SubSectionTitle>1. Instructor Obligations & IP</SubSectionTitle>
                        <ul className="list-decimal list-inside space-y-2 pl-4 text-slate-700 text-sm">
                            <li>
                                <strong className="text-teal-700">Professionalism:</strong> Maintain high ethical standards, ensure student safety, and deliver services according to your profile.
                            </li>
                            <li>
                                <strong className="text-teal-700">Content Rights:</strong> You retain ownership of your teaching IP, granting Yogalink a necessary license to display it on the platform.
                            </li>
                            <li>
                                <strong className="text-teal-700">Accuracy:</strong> Certifications and qualifications must be valid and verifiable.
                            </li>
                        </ul>

                        <SubSectionTitle>2. Financial & Exclusivity</SubSectionTitle>
                        <ul className="list-decimal list-inside space-y-2 pl-4 text-slate-700 text-sm">
                            <li>
                                <strong className="text-teal-700">Fee Structure:</strong> Yogalink deducts a commission (rate as per agreement) from your set class price.
                            </li>
                            <li>
                                <strong className="text-teal-700">Non-Compete:</strong> You must not solicit or accept direct payments from any student introduced to you by Yogalink.
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Availability & Termination */}
                    <div>
                        <SubSectionTitle>3. Service Delivery & Policies</SubSectionTitle>
                        <ul className="list-decimal list-inside space-y-2 pl-4 text-slate-700 text-sm">
                            <li>
                                <strong className="text-teal-700">Availability:</strong> Commit to the days, times, and response time selected in your profile.
                            </li>
                            <li>
                                <strong className="text-teal-700">Cancellations:</strong> Must adhere to the platform’s strict cancellation and refund policies.
                            </li>
                        </ul>

                        <SubSectionTitle>4. Termination Clause</SubSectionTitle>
                        <p className="text-slate-700 text-sm mb-3">
                            You or Yogalink may terminate this agreement with 30 days written notice. Yogalink may terminate immediately for severe breaches (e.g., fraud, ethical violations).
                        </p>
                        <div className="p-3 bg-red-50 border-l-4 border-red-400 text-xs text-slate-700 rounded">
                            <p className="font-semibold">Crucial Point:</p>
                            <p>Termination requires 30 days notice to ensure proper student transitions and payout finalization.</p>
                        </div>
                    </div>
                </div>

                {/* FINAL NOTE */}
                <div className="mt-12 pt-6 border-t border-slate-200 text-center">
                    <p className="text-base font-bold text-red-600 mb-2">
                        By proceeding with the application submission, you are confirming acceptance of the terms laid out in both the Privacy Policy and the Terms of Service.
                    </p>
                    <p className="text-sm text-slate-500">
                        The full, legally binding documents are available on our main website via the footer links.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;