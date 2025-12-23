import React from "react";
import SectionHeader from "./SectionHeader";
import Selector from "../common/Selector";
import Input from "../common/Input";


const StepThree = ({ formData, handleChange, validationErrors }) => {
  const options = [
    {
      label: formData.pCountry === "india" ? "Individual (PAN/Aadhaar/GSTIN)" : "Individual (SSN/TIN)",
      value: "individual",
    },
    {
      label: "Business (Foreign ID)",
      value: "business",
    },
  ];
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Taxation Details"
        subtitle="Required for compliant payouts. Currently focused on Indian Tax IDs."
      />
      <div className="p-6 rounded-xl border border-orange-300 bg-orange-50 transition-all duration-300 ">
        <div className="space-y-4 animate-in fade-in">
          {/* New Field: Registration Type */}
          <Selector
            label="Register As"
            name="registerAs"
            options={options}
            value={formData.registerAs}
            onChange={handleChange}
            required
            error={validationErrors.registerAs}
            placeholder="Select Registration Type"
          />
          {formData.pCountry === "india" &&
            formData.registerAs === "individual" ? (
            <>
              <Input
                label="PAN Card Number"
                name="panCard"
                placeholder="ABCDE1234F"
                value={formData.panCard}
                onChange={handleChange}
                required
                error={validationErrors.panCard}
              />
              <Input
                label="Aadhaar Card Number"
                name="aadharNo"
                placeholder="1234 5678 9012"
                value={formData.aadharNo}
                onChange={handleChange}
                required
                error={validationErrors.aadharNo}
              />
              <Input
                label="GSTIN"
                name="GSTIN"
                placeholder="22AAAAA0000A1Z5"
                value={formData.GSTIN}
                onChange={handleChange}
                required={false}
                error={validationErrors.GSTIN}
              />
            </>
          ) : (
            <Input
              label="Taxpayer Identification Number(TIN)"
              name="taxIdentification"
              placeholder="1234 5678 9012"
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
