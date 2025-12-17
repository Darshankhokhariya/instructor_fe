import React from "react";
import SectionHeader from "./SectionHeader";

const StepEight = ({ formData, handleChange, validationErrors }) => {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Service Agreements"
        subtitle="Please read and confirm the following legal and ethical standards."
      />
      <div className="bg-slate-50 p-6 rounded-xl space-y-4 border border-slate-200">
        {[
          {
            label: "I confirm all submitted details are accurate and truthful.",
            name: "confirmAccurate",
          },
          {
            label:
              "I agree to uphold the platform's ethical standards and professional conduct guidelines.",
            name: "ethicalStandards",
          },
          {
            label:
              "I accept the Yogalink service mindset, prioritizing student safety and experience.",
            name: "serviceMindset",
          },
        ].map((item) => (
          <div key={item.name} className="flex items-start">
            <input
              type="checkbox"
              id={item.name}
              name={item.name}
              checked={formData[item.name]}
              onChange={handleChange}
              required
              className={`mt-1 h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 ${
                validationErrors[item.name] ? "border-red-500 ring-red-500" : ""
              }`}
            />
            <label
              htmlFor={item.name}
              className="ml-3 text-sm text-slate-600 cursor-pointer"
            >
              {item.label}
            </label>
            {validationErrors[item.name] && (
              <span className="ml-3 text-xs text-red-500 hidden sm:block">
                ({validationErrors[item.name]})
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="pt-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Digital Signature <span className="text-teal-600">*</span>
        </label>
        <input
          type="text"
          name="signature"
          value={formData.signature}
          onChange={handleChange}
          placeholder="Type your full legal name to sign"
          required
          className={`w-full border-b-2 bg-transparent py-3 text-2xl font-serif italic text-teal-900 outline-none ${
            validationErrors.signature
              ? "border-red-500"
              : "border-slate-300 focus:border-teal-600"
          }`}
        />
        <p className="text-xs text-slate-400 mt-1">
          Typing your name constitutes a legally binding electronic signature.{" "}
          {validationErrors.signature && (
            <span className="text-red-500">({validationErrors.signature})</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default StepEight;
