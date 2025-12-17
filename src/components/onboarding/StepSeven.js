import React from "react";
import SectionHeader from "./SectionHeader";
import Input from "../common/Input";
import Selector from "../common/Selector";

const StepSeven = ({ formData, handleChange, validationErrors, isGroupSelected, isPrivateSelected, isSingleSelected }) => {
  return (
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
        {isSingleSelected && (
          <Input
            label="Single Class Rate (per hour)"
            name="single_class_rate"
            prefix="rs"
            value={formData.single_class_rate}
            onChange={handleChange}
            required={isSingleSelected}
            placeholder="e.g., 50rs"
            type="number"
            min="0"
            error={validationErrors.single_class_rate}
          />
        )}

        {!isGroupSelected && !isPrivateSelected && !isSingleSelected && (
          <div className="md:col-span-2 p-6 bg-red-50 rounded-xl border border-red-200 text-red-800 font-semibold">
            <p>
              ⚠️ Please go back to the **Availability** step and select at least
              one class type (One-on-One, Group Class, or Single Class) to set
              your rates.
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
  );
};

export default StepSeven;
