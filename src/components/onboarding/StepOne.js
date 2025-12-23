import React from "react";
import Input from "../common/Input";
import Selector from "../common/Selector";
import PhoneInput from "../common/PhoneInput";
import SmartSelect from "../common/SmartSelect";
import SectionHeader from "./SectionHeader";
import { FaMapMarkerAlt, FaRoad } from "react-icons/fa";
import { BiWorldIcon } from "../../../utils/icon";
import { languageOptions } from "../../../utils/onboarding";

const StepOne = ({
  formData,
  handleChange,
  validationErrors,
  handleArrayToggle,
  isCurrentSameAsPermanent,
  handleSameAsPermanentToggle,
}) => {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <SectionHeader
          title="1. Basic Personal Details"
          subtitle="Required for identification and communication."
        />
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your full legal name"
          error={validationErrors.name}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            max={
              new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                .toISOString()
                .split("T")[0]
            }
            error={validationErrors.dateOfBirth}
          />
          <Selector
            label="Gender"
            name="gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
            value={formData.gender}
            onChange={handleChange}
            required
            placeholder="Select Gender"
            error={validationErrors.gender}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled
            placeholder="name@example.com"
            error={validationErrors.email}
          />
          <div>
            <PhoneInput
              label="Primary Phone Number"
              name="primaryMobile"
              value={formData.primaryMobile}
              onChange={handleChange}
              required
              placeholder="Primary contact number"
              error={validationErrors.primaryMobile}
            />
            {validationErrors.primaryMobile && (
              <p className="mt-2 text-xs text-red-500">
                {validationErrors.primaryMobile}
              </p>
            )}
          </div>
        </div>
        <PhoneInput
          label="Alternate Phone Number (Optional)"
          name="secondMobile"
          value={formData.secondMobile}
          onChange={handleChange}
          required={false}
          placeholder="Optional contact number"
          error={validationErrors.secondMobile}
        />

        {/* New Field: Languages Spoken */}
        <div>
          <SmartSelect
            label="Languages Spoken (Required)"
            name="language"
            options={languageOptions}
            selectedValues={formData.language}
            onToggle={(val) => handleArrayToggle("language", val)}
            required
            error={validationErrors.language}
            className="pt-4"
            icon={<BiWorldIcon className="text-teal-600 mr-2" />}
          />

          {/* 👇 Show only when "Other" is selected */}
          {formData.language?.includes("Other") && (
            <Input
              label="Please specify your regional language"
              name="otherLanguage"
              value={formData.otherLanguage}
              onChange={handleChange}
              required
              placeholder="e.g. Kutchi, Tulu, Bhojpuri"
              error={validationErrors.otherLanguage}
              className="mt-4"
            />
          )}
        </div>

        {validationErrors.language && (
          <span className="text-xs font-medium text-red-500">
            {validationErrors.language}
          </span>
        )}
      </div>

      <div className="space-y-6 pt-4">
        <SectionHeader
          title="2. Permanent & Current Address"
          subtitle="Ensure addresses are accurate for legal and tax purposes."
          className="mt-6"
        />

        {/* Permanent Address */}
        <div className="p-4  rounded-xl border border-slate-200">
          <h4 className="text-md font-bold text-teal-900 mb-3 flex items-center">
            Permanent Address
          </h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="House No./Floor"
                name="pBlock"
                value={formData.pBlock}
                onChange={handleChange}
                required
                error={validationErrors.pBlock}
                placeholder="Enter Block / Door Number"
              />
              <Input
                label="Building Name & Block No."
                name="pBuilding"
                value={formData.pBuilding}
                onChange={handleChange}
                required
                error={validationErrors.pBuilding}
                placeholder="Enter Building Name"
              />
              <Input
                label="Landmark / Area Name"
                name="pArea"
                value={formData.pArea}
                onChange={handleChange}
                required
                error={validationErrors.pArea}
                placeholder="Enter Area"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                name="pCity"
                value={formData.pCity}
                onChange={handleChange}
                required
                error={validationErrors.pCity}
                placeholder="Enter City"
              />
              <Input
                label="State"
                name="pState"
                value={formData.pState}
                onChange={handleChange}
                required
                error={validationErrors.pState}
                placeholder="Enter State"
              />
              <Selector
                label="Country"
                name="pCountry"
                options={[
                  { label: "India", value: "india" },
                  { label: "USA", value: "usa" },
                  { label: "UK", value: "uk" },
                  { label: "Other", value: "other" },
                ]}
                value={formData.pCountry}
                onChange={handleChange}
                required
                placeholder="Select Country"
                error={validationErrors.pCountry}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input
              label="Pincode / Zip"
              name="pPincode"
              value={formData.pPincode}
              onChange={handleChange}
              required
              error={validationErrors.pPincode}
              placeholder="Enter Pincode / Zip"
            />
          </div>
        </div>

        {/* Current Address */}
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-md font-bold text-teal-900 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-teal-600" size={14} />{" "}
              Current Address
            </h4>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sameAsPermanent"
                checked={isCurrentSameAsPermanent}
                onChange={handleSameAsPermanentToggle}
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <label
                htmlFor="sameAsPermanent"
                className="ml-2 text-sm text-slate-600 font-medium"
              >
                Same as Permanent
              </label>
            </div>
          </div>
          <fieldset
            disabled={isCurrentSameAsPermanent}
            className={isCurrentSameAsPermanent ? "opacity-60" : "opacity-100"}
          >
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  label="House No./Floor"
                  name="cBlock"
                  value={formData.cBlock}
                  onChange={handleChange}
                  required={!isCurrentSameAsPermanent}
                  disabled={isCurrentSameAsPermanent}
                  error={validationErrors.cBlock}
                  placeholder="Enter Block / Door Number"
                />
                <Input
                  label="Building Name & Block No."
                  name="cBuilding"
                  value={formData.cBuilding}
                  onChange={handleChange}
                  required={!isCurrentSameAsPermanent}
                  disabled={isCurrentSameAsPermanent}
                  error={validationErrors.cBuilding}
                  placeholder="Enter Building Name"
                />
                <Input
                  label="Landmark / Area Name"
                  name="cArea"
                  value={formData.cArea}
                  onChange={handleChange}
                  required={!isCurrentSameAsPermanent}
                  disabled={isCurrentSameAsPermanent}
                  error={validationErrors.cArea}
                  placeholder="Enter Area"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  label="City"
                  name="cCity"
                  value={formData.cCity}
                  onChange={handleChange}
                  required={!isCurrentSameAsPermanent}
                  disabled={isCurrentSameAsPermanent}
                  error={validationErrors.cCity}
                  placeholder="Enter City"
                />
                <Input
                  label="State"
                  name="cState"
                  value={formData.cState}
                  onChange={handleChange}
                  required={!isCurrentSameAsPermanent}
                  disabled={isCurrentSameAsPermanent}
                  error={validationErrors.cState}
                  placeholder="Enter State"
                />
                <Selector
                  label="Country"
                  name="cCountry"
                  options={[
                    { label: "India", value: "india" },
                    { label: "USA", value: "usa" },
                    { label: "UK", value: "uk" },
                    { label: "Other", value: "other" },
                  ]}
                  value={formData.cCountry}
                  onChange={handleChange}
                  required={!isCurrentSameAsPermanent}
                  placeholder="Select Country"
                  disabled={isCurrentSameAsPermanent}
                  error={validationErrors.cCountry}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Input
                label="Pincode / Zip"
                name="cPincode"
                value={formData.cPincode}
                onChange={handleChange}
                required={!isCurrentSameAsPermanent}
                disabled={isCurrentSameAsPermanent}
                error={validationErrors.cPincode}
                placeholder="Enter Pincode / Zip"
              />
            </div>
          </fieldset>
        </div>

        {/* Section 1.3: Emergency Contact */}
        <div className="space-y-6 pt-4">
          <SectionHeader
            title="3. Emergency Contact"
            subtitle="In case of urgent issues, who should we contact?"
            className="mt-6"
          />
          <div className="p-6  rounded-xl border border-slate-200 space-y-4">
            <Input
              label="Full Name"
              name="eName"
              value={formData.eName}
              onChange={handleChange}
              required
              placeholder="Emergency Contact Full Name"
              error={validationErrors.eName}
            />
            <div>
              <PhoneInput
                label="Phone Number"
                name="eMobile"
                value={formData.eMobile}
                onChange={handleChange}
                required
                placeholder="Emergency contact number"
                error={validationErrors.eMobile}
              />
              {validationErrors.eMobile && (
                <span className="text-xs font-medium text-red-500">
                  {validationErrors.eMobile}
                </span>
              )}
            </div>
            <Input
              label="Relationship"
              name="eRelation"
              value={formData.eRelation}
              onChange={handleChange}
              required
              placeholder="e.g., Spouse, Parent, Sibling"
              error={validationErrors.eRelation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
