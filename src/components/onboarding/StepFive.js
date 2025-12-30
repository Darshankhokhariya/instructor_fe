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
  handleArrayToggle,
  handleCertChange,
  profileImagePreview,
  addCertification,
  addSampleVideo,
  handleSampleVideoChange,
  setProfileImagePreview,
  removeCertification,
  removeSampleVideo,
}) => {

  const [showCamera, setShowCamera] = useState(true);
  return (
    <div className="space-y-8">
      {/* Profile Image Upload [NEW SECTION] */}
      <div>
        <SectionHeader
          title="Profile Image & Yoga Expertise"
          subtitle="Upload a professional photo and select your teaching styles."
        />
        {/* Profile Image Upload [NEW SECTION] */}
        <div className="p-4 sm:p-6 bg-teal-50 rounded-xl border border-teal-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Label required>Profile Image (250px X 250px Recommended)</Label>
            {/* <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              capture="user"   // opens front camera (use "environment" for back camera)
              onChange={handleChange}
              className="block w-full text-sm text-slate-600
             file:mr-4 file:py-2 file:px-4
             file:rounded-lg file:border-0
             file:text-sm file:font-semibold
             file:bg-teal-100 file:text-teal-700
             hover:file:bg-teal-200"
            /> */}
            {showCamera && (
              <CameraCapture
                onCapture={({ file, preview }) => {
                  setFormData((prev) => ({
                    ...prev,
                    profileImage: file,
                  }));

                  setProfileImagePreview(preview);
                  setShowCamera(false); // 👈 THIS hides CameraCapture
                }}
              />
            )}

            {formData.profileImage && (
              <p className="mt-2 text-xs text-slate-600">
                Selected: **{formData.profileImage.name}**
              </p>
            )}
          </div>
          <div>
            {!showCamera && profileImagePreview && (
              <img
                src={profileImagePreview}
                alt="Captured"
                className="w-[250px] h-[250px] rounded-full object-cover border"
              />
            )}
            {!showCamera && (
              <button
                onClick={() => {
                  setShowCamera(true);
                  setProfileImagePreview(null);
                }}
                className="mt-3 px-4 py-2 bg-slate-600 text-white rounded-lg text-sm sm:text-base min-h-[44px]"
              >
                Retake Photo
              </button>
            )}

          </div>
        </div>
        {validationErrors.profileImage && (
          <p className="mt-1 text-xs text-red-500">
            {validationErrors.profileImage}
          </p>
        )}
      </div>

      {/* Yoga Styles */}
      <div>
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
          selectedValues={formData.yoga_style}
          onToggle={(val) => handleArrayToggle("yoga_style", val)}
          required
          error={validationErrors.yoga_style}
        />
        {validationErrors.yoga_style && (
          <p className="mt-1 text-sm text-red-500">
            {validationErrors.yoga_style}
          </p>
        )}
      </div>

      {/* Certifications */}
      <div>
        <SectionHeader
          title="Certifications"
          subtitle="Upload copies of your certifications (e.g., RYT 200, 500). First one is mandatory."
        />
        <div className="space-y-4">
          {formData.certifications.map((cert, index) => (
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
          {formData.certifications.length < 10 && (
            <button
              type="button"
              onClick={addCertification}
              className="flex items-center text-teal-600 font-semibold hover:text-teal-700 mt-2 min-h-[44px] text-sm sm:text-base"
            >
              <BiPlusCircle className="mr-2" size={14} /> Add Certificate
            </button>
          )}
        </div>
      </div>

      {/* Videos & Philosophy */}
      <div>
        <SectionHeader
          title="Profile Videos & Philosophy"
          subtitle="Your introductory video and teaching teaching_philosophy."
        />
        <Input
          label="Introduction Video URL (Required)"
          name="introVideo"
          value={formData.introVideo}
          onChange={handleChange}
          required
          placeholder="YouTube or Vimeo URL"
          error={validationErrors.introVideo}
        />

        <label className="pt-6 mb-1 block text-sm font-medium text-gray-700">
          Sample Video URLs (Minimum 2)
        </label>
        <div className="space-y-4">
          {formData && formData?.video_url?.map((video, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full">
              <div className="flex-1 w-full">
                <Input
                  label={`Video ${index + 1}`}
                  name={`video_url[${index}]`}
                  placeholder={`Video URL ${index + 1}`}
                  value={video}
                  onChange={(e) =>
                    handleSampleVideoChange(index, e.target.value)
                  }
                  required={index < 2}
                  error={validationErrors[`video_url[${index}]`]}
                />
              </div>
              {formData.video_url.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeSampleVideo(index)}
                  className="p-3 text-slate-400 hover:text-red-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <BiTrash size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        {validationErrors.video_url && (
          <p className="mt-1 text-xs text-red-500">
            {validationErrors.video_url}
          </p>
        )}
        {formData?.video_url?.length < 10 && (
          <button
            type="button"
            onClick={addSampleVideo}
            className="mt-3 flex items-center text-teal-600 font-semibold min-h-[44px] text-sm sm:text-base"
          >
            <BiPlusCircle className="mr-2" size={14} /> Add Video URL
          </button>
        )}

        <div className="my-6 ">
          <TextArea
            label="Your Teaching Philosophy (Required)"
            name="teaching_philosophy"
            rows={5}
            value={formData.teaching_philosophy}
            onChange={handleChange}
            required
            placeholder="Describe your approach, values, and why you teach yoga."
            error={validationErrors.teaching_philosophy}
          />
        </div>
      </div>
    </div>
  );
};

export default StepFive;
