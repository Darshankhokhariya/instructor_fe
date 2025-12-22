import React from "react";
import SectionHeader from "./SectionHeader";
import Input from "../common/Input";
import Selector from "../common/Selector";

const StepSeven = ({
  formData,
  handleChange,
  validationErrors,
  isGroupSelected,
  isPrivateSelected,
  isOnlineSelected,
  trialOptions,
}) => {
  return (
    <div>
      <div className="space-y-6">
        <SectionHeader title="Pricing Structure" subtitle="" />

        {/* Conditional Pricing Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isGroupSelected && (
            <Input
              label="Group Class Rate (per person/hour)"
              name="group_class_rate"
              prefix="rs"
              value={formData.group_class_rate}
              onChange={handleChange}
              required={isGroupSelected}
              placeholder="e.g., 10rs"
              type="number"
              min="0"
              error={validationErrors.group_class_rate}
            />
          )}
          {isPrivateSelected && (
            <Input
              label="Private Session Rate (per hour)"
              name="private_class_rate"
              prefix="rs"
              value={formData.private_class_rate}
              onChange={handleChange}
              required={isPrivateSelected}
              placeholder="e.g., 50rs"
              type="number"
              min="0"
              error={validationErrors.private_class_rate}
            />
          )}
          {isOnlineSelected && (
            <Input
              label="Single Class Rate (per hour)"
              name="single_class_rate"
              prefix="rs"
              value={formData.single_class_rate}
              onChange={handleChange}
              required={isOnlineSelected}
              placeholder="e.g., 50rs"
              type="number"
              min="0"
              error={validationErrors.single_class_rate}
            />
          )}

          {!isGroupSelected && !isPrivateSelected && !isOnlineSelected && (
            <div className="md:col-span-2 p-6 bg-red-50 rounded-xl border border-red-200 text-red-800 font-semibold">
              <p>
                ⚠️ Please go back to the **Availability** step and select at
                least one class type (One-on-One, Group Class, or Single Class)
                to set your rates.
              </p>
            </div>
          )}
        </div>

        {/* Conditional Trial Policy */}
        {(isPrivateSelected || isGroupSelected) && (
          <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <Selector
              label="Trial Policy (Required)"
              name="trialMode"
              options={trialOptions}
              value={formData.trialMode}
              onChange={handleChange}
              required
              placeholder="Select a trial policy"
              error={validationErrors.trialMode}
            />
            <p className="text-xs text-slate-500 mt-2">
              The platform automatically manages the trial based on your
              selection.
            </p>
          </div>
        )}
      </div>

      
      <div className="space-y-6 pt-5">
        <SectionHeader
          title="Service Agreements"
          subtitle="Please read and confirm the following legal and ethical standards."
        />
        <div className="bg-slate-50 p-6 rounded-xl space-y-4 border border-slate-200">
          {[
            {
              label:
                "I confirm all submitted details are accurate and truthful.",
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
                  validationErrors[item.name]
                    ? "border-red-500 ring-red-500"
                    : ""
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
              <span className="text-red-500">
                ({validationErrors.signature})
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepSeven;
