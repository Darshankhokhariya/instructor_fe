import React from "react";
import SectionHeader from "./SectionHeader";
import Selector from "../common/Selector";
import Input from "../common/Input";

const StepThree = ({ formData, handleChange, validationErrors }) => {
  const isIndia = formData.pCountry === "india";
  const isIndividual = formData.registerAs === "individual";
  const isBusiness = formData.registerAs === "business";

  const registrationOptions = [
    {
      label: isIndia
        ? "Individual (PAN / Aadhaar)"
        : "Individual (SSN / TIN)",
      value: "individual",
    },
    {
      label: "Business",
      value: "business",
    },
  ];

  const renderIndianFields = () => (
    <>
      {/* PAN */}
      <Input
        label="PAN Card Number"
        name="panCard"
        placeholder="ABCDE1234F"
        value={formData.panCard}
        onChange={handleChange}
        required
        error={validationErrors.panCard}
      />

      {/* Aadhaar */}
      <Input
        label="Aadhaar Card Number"
        name="aadhaarNo"
        placeholder="1234 5678 9012"
        value={formData.aadhaarNo}
        onChange={handleChange}
        required
        error={validationErrors.aadhaarNo}
      />

      {/* GSTIN only for Business */}
      {isBusiness && (
        <Input
          label="GSTIN"
          name="gstin"
          placeholder="22AAAAA0000A1Z5"
          value={formData.gstin}
          onChange={handleChange}
          required
          error={validationErrors.gstin}
        />
      )}
    </>
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Taxation Details"
        subtitle="Required for compliant payouts."
      />

      <div className="p-6 rounded-xl border border-orange-300 bg-orange-50">
        <div className="space-y-4">
          {/* Register As */}
          <Selector
            label="Register As"
            name="registerAs"
            options={registrationOptions}
            value={formData.registerAs}
            onChange={handleChange}
            required
            error={validationErrors.registerAs}
            placeholder="Select Registration Type"
          />

          {/* 🇮🇳 INDIA */}
          {isIndia && (isIndividual || isBusiness) && renderIndianFields()}

          {/* 🌍 NON-INDIA */}
          {!isIndia && (
            <Input
              label="Taxpayer Identification Number (TIN)"
              name="taxIdentification"
              placeholder="Enter your TIN"
              value={formData.taxIdentification}
              onChange={handleChange}
              required
              error={validationErrors.taxIdentification}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StepThree;
