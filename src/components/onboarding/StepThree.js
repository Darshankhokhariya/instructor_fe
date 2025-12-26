import React from "react";
import SectionHeader from "./SectionHeader";
import Selector from "../common/Selector";
import Input from "../common/Input";

const StepThree = ({ formData, handleChange, validationErrors }) => {
  const isIndia = formData.pCountry === "india";
  const isIndividual = formData.registerAs === "individual";
  const isBusiness = formData.registerAs === "business";

  console.log("formData", formData);

  console.log("isIndia", isIndia);
  console.log("isIndividual", isIndividual);
  console.log("isBusiness", isBusiness);

  console.log("isIndia", isIndia);
  const registrationOptions = [
    {
      label: isIndia ? "Individual (PAN / Aadhaar)" : "Individual (SSN / TIN)",
      value: "individual",
    },
    {
      label: "Business",
      value: "business",
    },
  ];

  console.log("ormData.registerAs", formData.registerAs);

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
        name="aadharNo"
        placeholder="1234 5678 9012"
        value={formData.aadharNo}
        onChange={handleChange}
        required
        error={validationErrors.aadharNo}
      />

      {/* GSTIN only for Business */}
      {isBusiness && (
        <Input
          label="GSTIN"
          name="GSTIN"
          placeholder="22AAAAA0000A1Z5"
          value={formData.GSTIN}
          onChange={handleChange}
          required
          error={validationErrors.GSTIN}
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
            value={formData.registerAs || (isIndia ? "individual" : "individual")}
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
