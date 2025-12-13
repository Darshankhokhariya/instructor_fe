"use client";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function ApproveModal({ data, onClose }) {
    const [interviewDate, setInterviewDate] = useState("");
    const [interviewTime, setInterviewTime] = useState("");
    const [recordingLink, setRecordingLink] = useState("");
    const [decision, setDecision] = useState("");
    const [managerApprove, setManagerApprove] = useState(false);
    const [adminApprove, setAdminApprove] = useState(false);

    if (!data) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">

                {/* Close Button */}
                <button
                    className="absolute right-5 top-5 text-gray-400 hover:text-gray-800 transition"
                    onClick={onClose}
                >
                    <AiOutlineClose size={24} />
                </button>

                <h2 className="text-xl font-medium text-gray-800 mb-6 border-b pb-3">Full Application Review</h2>

                {/* Personal Information */}
                <Section title="Personal Information">
                    <TwoCol label="Full Name" value={data?.fullName} />
                    <TwoCol label="Date of Birth" value={data?.dob} />
                    <TwoCol label="Gender" value={data?.gender} />
                    <TwoCol label="Email" value={data?.email} />
                    <TwoCol label="Phone" value={data?.phone} />
                    <TwoCol label="Alternate Phone" value={data?.alternatePhone} />
                </Section>

                {/* Permanent Address */}
                <Section title="Permanent Address">
                    <TwoCol label="Country" value={data?.permanentCountry} />
                    <TwoCol label="State" value={data?.permanentState} />
                    <TwoCol label="City" value={data?.permanentCity} />
                    <TwoCol label="Pincode" value={data?.permanentPincode} />
                    <TwoCol label="Area" value={data?.permanentArea} />
                    <TwoCol label="Building" value={data?.permanentBuilding} />
                    <TwoCol label="Block / House No." value={data?.permanentBlock} />
                </Section>

                {/* Current Address */}
                <Section title="Current Address">
                    <TwoCol label="Country" value={data?.currentCountry} />
                    <TwoCol label="State" value={data?.currentState} />
                    <TwoCol label="City" value={data?.currentCity} />
                    <TwoCol label="Pincode" value={data?.currentPincode} />
                    <TwoCol label="Area" value={data?.currentArea} />
                    <TwoCol label="Building" value={data?.currentBuilding} />
                    <TwoCol label="Block / House No." value={data?.currentBlock} />
                </Section>

                {/* Emergency Contact */}
                <Section title="Emergency Contact">
                    <TwoCol label="Name" value={data?.emergencyName} />
                    <TwoCol label="Phone" value={data?.emergencyPhone} />
                    <TwoCol label="Relation" value={data?.emergencyRelation} />
                </Section>

                {/* Education */}
                <Section title="Education">
                    <TwoCol label="School / College" value={data?.schoolCollege} />
                    <TwoCol label="Degree" value={data?.degreeName} />
                    <TwoCol label="University" value={data?.universityName} />
                </Section>

                {/* Taxation */}
                <Section title="Taxation">
                    <TwoCol label="PAN Number" value={data?.panCard} />
                    <TwoCol label="Aadhar Number" value={data?.aadharNumber} />
                    <TwoCol label="GSTIN" value={data?.gstin} />
                </Section>

                {/* Social Media */}
                <Section title="Social Media">
                    <TwoCol label="Facebook" value={data?.socialFb} />
                    <TwoCol label="LinkedIn" value={data?.socialLi} />
                    <TwoCol label="Instagram" value={data?.socialInsta} />
                    <TwoCol label="YouTube" value={data?.socialYt} />
                </Section>

                {/* Qualifications */}
                <Section title="Qualifications">
                    <TwoCol label="Philosophy" value={data?.philosophy} />
                    <div>
                        <p className="text-xs text-gray-500">Yoga Styles</p>
                        <p className="font-medium">{(data?.yogaStyles || []).join(", ") || "—"}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Certifications</p>
                        {data?.certifications?.map((c, i) => (
                            <p key={i} className="font-medium">
                                {c.title} — {c.file ? "Uploaded" : "Not Uploaded"}
                            </p>
                        ))}
                    </div>
                    <TwoCol label="Intro Video" value={data?.introVideo} />
                    <div>
                        <p className="text-xs text-gray-500">Sample Videos</p>
                        {(data?.sampleVideos || []).map((v, i) => (
                            <p key={i}>{v}</p>
                        ))}
                    </div>
                </Section>

                {/* Availability */}
                <Section title="Availability">
                    <TwoCol label="Days" value={(data?.days || []).join(", ")} />
                    <TwoCol label="Times" value={(data?.times || []).join(", ")} />
                    <TwoCol label="Start Time" value={data?.startTime} />
                    <TwoCol label="End Time" value={data?.endTime} />
                </Section>

                {/* Pricing */}
                <Section title="Pricing">
                    <TwoCol label="Group Rate" value={data?.groupRate} />
                    <TwoCol label="Private Rate" value={data?.privateRate} />
                    <TwoCol label="Trial Mode" value={data?.trialMode} />
                </Section>

                {/* Agreements */}
                <Section title="Agreements">
                    <TwoCol label="Information Accurate" value={data?.confirmAccurate ? "Yes" : "No"} />
                    <TwoCol label="Ethical Standards" value={data?.ethicalStandards ? "Yes" : "No"} />
                    <TwoCol label="Service Mindset" value={data?.serviceMindset ? "Yes" : "No"} />
                    <TwoCol label="Signature" value={data?.signature} />
                </Section>

                {/* Interview & Approvals */}
                <InterviewSection
                    interviewDate={interviewDate}
                    interviewTime={interviewTime}
                    setInterviewDate={setInterviewDate}
                    setInterviewTime={setInterviewTime}
                    recordingLink={recordingLink}
                    setRecordingLink={setRecordingLink}
                    decision={decision}
                    setDecision={setDecision}
                    managerApprove={managerApprove}
                    setManagerApprove={setManagerApprove}
                    adminApprove={adminApprove}
                    setAdminApprove={setAdminApprove}
                />
            </div>
        </div>
    );
}

/* ---------- REUSABLE COMPONENTS ---------- */

function Section({ title, children }) {
    return (
        <div className="mb-8 p-4 rounded-lg bg-gray-50 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
        </div>
    );
}

function TwoCol({ label, value }) {
    return (
        <div className="flex flex-col">
            <span className="text-xs text-gray-400">{label}</span>
            <span className="text-gray-800 font-medium">{value || "—"}</span>
        </div>
    );
}

function InterviewSection({
    interviewDate,
    interviewTime,
    setInterviewDate,
    setInterviewTime,
    recordingLink,
    setRecordingLink,
    decision,
    setDecision,
    managerApprove,
    setManagerApprove,
    adminApprove,
    setAdminApprove,
}) {
    return (
        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-white shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Interview </h3>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                    type="date"
                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                />
                <input
                    type="time"
                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                />
            </div>

            {/* Recording Link */}
            <input
                type="text"
                placeholder="Interview meeting link"
                className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={recordingLink}
                onChange={(e) => setRecordingLink(e.target.value)}
            />

            {/* Save Button */}
            <button className="w-full py-3 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 transition">
                Schedule Interview
            </button>
        </div>
    );
}
