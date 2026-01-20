import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import Label from "./Label";
import SmartSelect from "../common/SmartSelect";
import Input from "../common/Input";
import { BiPlusCircle, BiTrash } from "react-icons/bi";
import TextArea from "../common/TextArea";
import CameraCapture from "./CameraCapture";

const StepFive = ({
  formData,
  setFormData,
  handleChange,
  validationErrors,
  setValidationErrors,
  handleArrayToggle,
  handleCertChange,
  profileImagePreview,
  addCertification,
  addSampleVideo,
  handleSampleVideoChange,
  setVerificationPreview,
  setProfileImagePreview,
  removeCertification,
  removeSampleVideo,
  verificationImagePreview
}) => {
  const [showCamera, setShowCamera] = useState(true);

  // ✅ SAFE FALLBACKS (IMPORTANT)
  const certifications = formData.certifications || [];
  const videoUrls = formData.video_url || [];
  const yogaStyles = formData.yoga_style || [];

  return (
    <div className="space-y-8">
      {/* ================= PverificationImagePreviewROFILE IMAGE ================= */}
      <div>
        <SectionHeader
          title="Profile Image & Yoga Expertise"
          subtitle="Upload a professional photo and select your teaching styles."
        />

        <div className={`p-4 sm:p-6 bg-teal-50 rounded-xl border mb-6 flex flex-col sm:flex-row gap-4 ${validationErrors.verification_image ? 'border-red-500 border-2' : 'border-teal-200'
          }`}>
          <div className="flex-1">
            <Label required>Verification Image (250px X 250px Recommended)</Label>
            {showCamera && (
              <CameraCapture
                onCapture={({ file, preview }) => {
                  setFormData((prev) => ({
                    ...prev,
                    verification_image: file,
                  }));
                  setVerificationPreview(preview);
                  setShowCamera(false);

                  // Clear validation error
                  setValidationErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.verification_image;
                    return newErrors;
                  });
                }}
              />
            )}

            {formData.verification_image && (
              <p className="mt-2 text-xs text-slate-600">
                Selected:{" "}
                <strong>{formData.verification_image.name}</strong>
              </p>
            )}

            {validationErrors.verification_image && (
              <p className="mt-2 text-xs text-red-500">
                {validationErrors.verification_image}
              </p>
            )}
          </div>

          <div>
            {!showCamera && verificationImagePreview && (
              <img
                src={verificationImagePreview}
                alt="Captured"
                className="w-[250px] h-[250px] rounded-full object-cover border"
              />
            )}

            {!showCamera && (
              <button
                type="button"
                onClick={() => {
                  setShowCamera(true);
                  setVerificationPreview(null);
                  setFormData((prev) => ({
                    ...prev,
                    verification_image: null,
                  }));
                }}
                className="mt-3 px-4 py-2 bg-slate-600 text-white rounded-lg min-h-[44px]"
              >
                Retake Photo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= PUBLIC PROFILE IMAGE ================= */}
      <div>
        <SectionHeader
          title="Public Profile Image"
          subtitle="Visible on your public instructor profile."
        />

        <div className={`p-4 sm:p-6 bg-slate-50 rounded-xl border flex flex-col sm:flex-row gap-6 ${validationErrors.profileImage ? 'border-red-500 border-2' : 'border-slate-300'
          }`}>
          <div className="flex-1">
            <Label required>Profile Image (Public)</Label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                setFormData((prev) => ({
                  ...prev,
                  profileImage: file,
                }));
                setProfileImagePreview(URL.createObjectURL(file));

                // Clear validation error using actual event
                handleChange(e);
              }}
              className={validationErrors.profileImage ? "border-red-500 border-2" : ""}
            />

            {validationErrors.profileImage && (
              <p className="mt-1 text-xs text-red-500">
                {validationErrors.profileImage}
              </p>
            )}
          </div>

          {profileImagePreview && (
            <img
              src={profileImagePreview}
              alt="Public Profile"
              className="w-[250px] h-[250px] rounded-full object-cover border"
            />
          )}
        </div>
      </div>

      {/* ================= YOGA STYLES ================= */}
      <SmartSelect
        label="Yoga Styles (Required)"
        name="yoga_style"
        options={[
          "Hatha",
          "Vinyasa",
          "Ashtanga",
          "Iyengar",
          "Kundalini",
          "Yin",
          "Meditation",
          "Prenatal",
          "Restorative",
        ]}
        selectedValues={yogaStyles}
        onToggle={(val) => handleArrayToggle("yoga_style", val)}
        required
        error={validationErrors.yoga_style}
      />

      {/* ================= CERTIFICATIONS ================= */}
      <SectionHeader
        title="Certifications"
        subtitle="Upload copies of your certifications."
      />

      <div className="space-y-4">
        {formData?.certifications?.map((cert, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-200"
          >
            <div className="flex-1 w-full">
              <Input
                label={`Certificate ${index + 1} Title`}
                value={cert.title}
                placeholder="e.g. RYT 200 from Sivananda"
                onChange={(e) =>
                  handleCertChange(index, "title", e.target.value)
                }
                required={index === 0}
                error={validationErrors[`certifications[${index}].title`]}
              />
            </div>
            <div className="flex-1 w-full">
              <div className="flex flex-col w-full">
                <label
                  htmlFor={`file-${index}`}
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  Upload File (PDF/Image){" "}
                  {index === 0 && <span className="text-teal-600">*</span>}
                </label>
                <input
                  type="file"
                  id={`file-${index}`}
                  onChange={(e) =>
                    handleCertChange(
                      index,
                      "file",
                      e.target.value,
                      e.target.files[0]
                    )
                  }
                  className={`block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200 cursor-pointer rounded-xl ${validationErrors[`certifications[${index}].file`]
                    ? "border-red-500 border-2"
                    : "border-slate-300 border"
                    }`}
                  required={index === 0}
                  accept="application/pdf,image/*"
                />
                {validationErrors[`certifications[${index}].file`] && (
                  <p className="mt-1 text-xs text-red-500">
                    {validationErrors[`certifications[${index}].file`]}
                  </p>
                )}
              </div>
            </div>
            {formData.certifications.length > 1 && (
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="p-3 text-red-500 bg-white border border-red-100 rounded-lg mb-[2px] hover:bg-red-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <BiTrash size={14} />
              </button>
            )}
          </div>
        ))}
        {validationErrors.certifications && (
          <p className="mt-1 text-sm text-red-500">
            {validationErrors.certifications}
          </p>
        )}
        {formData?.certifications?.length < 10 && (
          <button
            type="button"
            onClick={addCertification}
            className="flex items-center text-teal-600 font-semibold hover:text-teal-700 mt-2 min-h-[44px] text-sm sm:text-base"
          >
            <BiPlusCircle className="mr-2" size={14} /> Add Certificate
          </button>
        )}
      </div>

      {/* ================= VIDEOS ================= */}
      <Input
        label="Introduction Video URL"
        name="introVideo"
        value={formData.introVideo || ""}
        onChange={handleChange}
        required
        error={validationErrors.introVideo}
      />

      {videoUrls.map((video, index) => (
        <Input
          key={index}
          label={`Video ${index + 1}`}
          value={video || ""}
          onChange={(e) =>
            handleSampleVideoChange(index, e.target.value)
          }
          required={index < 2}
          error={validationErrors[`video_url[${index}]`]}
        />
      ))}

      {videoUrls.length < 10 && (
        <button
          type="button"
          onClick={addSampleVideo}
          className="flex items-center text-teal-600"
        >
          <BiPlusCircle className="mr-2" /> Add Video
        </button>
      )}

      <TextArea
        label="Your Teaching Philosophy"
        name="teaching_philosophy"
        rows={5}
        value={formData.teaching_philosophy || ""}
        onChange={handleChange}
        required
        error={validationErrors.teaching_philosophy} />
    </div>
  );
};

export default StepFive;
