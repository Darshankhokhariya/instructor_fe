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

        <h2 className="text-xl font-medium text-gray-800 mb-6 border-b pb-3">
          Full Application Review
        </h2>

        {/* Personal Information */}
        <Section title="Personal Information">
          <TwoCol label="Full Name" value={data?.onboarding?.step1?.name} />
          <TwoCol
            label="Date of Birth"
            value={data?.onboarding?.step1?.dateOfBirth}
          />
          <TwoCol label="Gender" value={data?.onboarding?.step1?.gender} />
          <TwoCol label="Email" value={data?.onboarding?.step1?.email} />
          <TwoCol
            label="Primary Phone "
            value={data?.onboarding?.step1?.primaryMobile}
          />
          <TwoCol
            label="Alternate Phone"
            value={data?.onboarding?.step1?.secondMobile}
          />
        </Section>

        {/* Permanent Address */}
        <Section title="Permanent Address">
          <TwoCol
            label="House No./Floor."
            value={data?.onboarding?.step1?.pBlock}
          />
          <TwoCol
            label="Building Name & Block No."
            value={data?.onboarding?.step1?.pBuilding}
          />
          <TwoCol
            label="Landmark / Area Name"
            value={data?.onboarding?.step1?.pArea}
          />
          <TwoCol label="City" value={data?.onboarding?.step1?.pCity} />
          <TwoCol label="State" value={data?.onboarding?.step1?.pState} />
          <TwoCol label="Country" value={data?.onboarding?.step1?.pCountry} />
          <TwoCol label="Pincode" value={data?.onboarding?.step1?.pPincode} />
        </Section>

        {/* Current Address */}
        <Section title="Current Address">
          <TwoCol
            label="House No./Floor."
            value={data?.onboarding?.step1?.cBlock}
          />
          <TwoCol
            label="Building Name & Block No."
            value={data?.onboarding?.step1?.cBuilding}
          />
          <TwoCol
            label="Landmark / Area Name"
            value={data?.onboarding?.step1?.cArea}
          />
          <TwoCol label="City" value={data?.onboarding?.step1?.cCity} />
          <TwoCol label="State" value={data?.onboarding?.step1?.cState} />
          <TwoCol label="Country" value={data?.onboarding?.step1?.cCountry} />
          <TwoCol label="Pincode" value={data?.onboarding?.step1?.cPincode} />
        </Section>

        {/* Emergency Contact */}
        <Section title="Emergency Contact">
          <TwoCol label="Name" value={data?.onboarding?.step1?.eName} />
          <TwoCol label="Phone" value={data?.onboarding?.step1?.eMobile} />
          <TwoCol label="Relation" value={data?.onboarding?.step1?.eRelation} />
        </Section>

        {/* Education */}
        <Section title="Education">
          <TwoCol
            label="School / College"
            value={data?.onboarding?.step2?.collegeName}
          />
          <TwoCol
            label="Degree"
            value={data?.onboarding?.step2?.qualification}
          />
          <TwoCol
            label="University"
            value={data?.onboarding?.step2?.institute}
          />
        </Section>

        {/* Taxation */}
        <Section title="Taxation">
          <TwoCol
            label="PAN Number"
            value={data?.onboarding?.step3?.taxIdentification}
          />
          <TwoCol
            label="Aadhar Number"
            value={data?.onboarding?.step3?.aadharNo}
          />
          <TwoCol label="GSTIN" value={data?.onboarding?.step3?.GSTIN} />
        </Section>

        {/* Social Media */}
        <Section title="Social Media">
          <TwoCol
            label="Facebook"
            value={data?.onboarding?.step4?.facebook_link}
          />
          <TwoCol
            label="LinkedIn"
            value={data?.onboarding?.step4?.linkdin_link}
          />
          <TwoCol
            label="Instagram"
            value={data?.onboarding?.step4?.instagram_link}
          />
          <TwoCol
            label="YouTube"
            value={data?.onboarding?.step4?.youtube_link}
          />
        </Section>

        {/* Qualifications */}
        <Section title="Qualifications">
          <TwoCol
            label="Philosophy"
            value={data?.onboarding?.step5?.teaching_philosophy}
          />
          <div>
            <p className="text-xs text-gray-500">Yoga Styles</p>
            <p className="font-medium">
              {(data?.onboarding?.step5?.yoga_style || []).join(", ") || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Certifications</p>
            {data?.onboarding?.step5?.certificates?.map((c, i) => (
              <p key={i} className="font-medium">
                {c?.certificate_name} —{" "}
                {c?.file_url ? "Uploaded" : "Not Uploaded"}
              </p>
            ))}
          </div>
          <TwoCol label="Intro Video" value={data?.introVideo} />
          <div>
            <p className="text-xs text-gray-500">Sample Videos</p>
            {(data?.onboarding?.step5?.video_url || []).map((v, i) => (
              <p key={i}>{v}</p>
            ))}
          </div>
        </Section>

        {/* Availability */}
        <Section title="Availability">
          <div className="grid grid-cols-4 gap-4 font-medium text-gray-700">
            <div>Day</div>
            <div>Start Time</div>
            <div>End Time</div>
            <div>Class Type</div>

            {data?.onboarding?.step6?.class_availability?.[0]?.availability &&
              Object.entries(
                data.onboarding.step6.class_availability[0].availability
              ).map(([day, slots]) =>
                slots.map((slot, index) => (
                  <React.Fragment key={`${day}-${index}`}>
                    <div>{day}</div>
                    <div>{slot.start_time}</div>
                    <div>{slot.end_time}</div>
                    <div>{slot.class_key}</div>
                  </React.Fragment>
                ))
              )}
          </div>
        </Section>

        {/* Pricing */}
        <Section title="Pricing">
          <TwoCol
            label="Group Rate"
            value={data?.onboarding?.step7?.pricing_agreement?.group_class_rate}
          />
          <TwoCol
            label="Private Rate"
            value={
              data?.onboarding?.step7?.pricing_agreement?.private_class_rate
            }
          />
          <TwoCol
            label="Trial Mode"
            value={
              data?.onboarding?.step7?.pricing_agreement?.trial_period_days
            }
          />
        </Section>

        {/* Agreements */}
        <Section title="Agreements">
          <TwoCol
            label="Information Accurate"
            value={
              data?.onboarding?.step7?.pricing_agreement?.isAgree ? "Yes" : "No"
            }
          />
          <TwoCol
            label="Ethical Standards"
            value={
              data?.onboarding?.step7?.pricing_agreement?.isAgree ? "Yes" : "No"
            }
          />
          <TwoCol
            label="Service Mindset"
            value={
              data?.onboarding?.step7?.pricing_agreement?.isAgree ? "Yes" : "No"
            }
          />
          <TwoCol
            label="Signature"
            value={data?.onboarding?.step7?.pricing_agreement?.signature}
          />
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
      <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
        {title}
      </h3>
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
