import React from "react";
import SectionHeader from "./SectionHeader";
import Input from "../common/Input";

const StepTwo = ({ formData, handleChange, validationErrors }) => {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Education Details"
        subtitle="Your highest educational background."
      />
      <Input
        label="School / College Name"
        name="collegeName"
        value={formData.collegeName}
        onChange={handleChange}
        required
        placeholder="School / College Name"
        error={validationErrors.collegeName}
      />
      <Input
        label="Degree / Qualification Name"
        name="qualification"
        value={formData.qualification}
        onChange={handleChange}
        required
        placeholder="e.g., Master of Arts in Yoga"
        error={validationErrors.qualification}
      />
      <Input
        label="University / Institution Name"
        name="institute"
        value={formData.institute}
        onChange={handleChange}
        required
        placeholder="University / Institution Name"
        error={validationErrors.institute}
      />
    </div>
  );
};

export default StepTwo;
