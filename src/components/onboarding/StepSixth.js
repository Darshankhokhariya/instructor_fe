import React from "react";
import Selector from "../common/Selector";
import { BiAlarmIcon } from "../../../utils/icon";
import Input from "../common/Input";
import SmartSelect from "../common/SmartSelect";
import SectionHeader from "./SectionHeader";
import Label from "./Label";
import CheckboxToggle from "../common/CheckboxToggle";

const StepSixth = ({
  formData,
  handleChange,
  validationErrors,
  handleArrayToggle,
  timeError,
}) => {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Class Availability"
        subtitle="Indicate when you are generally available for online classes (Time zone: IST)."
      />

      {/* Class Type Selection */}
      <div className="mt-4">
        <Label required>Available Class Types</Label>
        <CheckboxToggle
          label="Available for One-on-One Private Session"
          name="availableOneOnOne"
          checked={formData.availableOneOnOne}
          onChange={handleChange}
        />
        <CheckboxToggle
          label="Available for Group Class"
          name="availableGroupClass"
          checked={formData.availableGroupClass}
          onChange={handleChange}
        />
        <CheckboxToggle
          label="Single Class"
          name="singleClass"
          checked={formData.singleClass}
          onChange={handleChange}
        />
        {validationErrors.classType && (
          <p className="mt-2 text-xs text-red-500">
            {validationErrors.classType}
          </p>
        )}
      </div>

      {/* Preferred Days */}
      <SmartSelect
        label="Preferred Teaching Days (Required)"
        options={[
          { label: "Mon", value: "monday" },
          { label: "Tue", value: "tuesday" },
          { label: "Wed", value: "wednesday" },
          { label: "Thu", value: "thursday" },
          { label: "Fri", value: "friday" },
          { label: "Sat", value: "saturday" },
          { label: "Sun", value: "sunday" },
        ]}
        selectedValues={formData.days}
        onToggle={(val) => handleArrayToggle("days", val)}
        error={validationErrors.days}
      />

      {/* Preferred Times */}
      <SmartSelect
        label="Preferred Class Times (Required)"
        options={[
          { label: "Morning (5-10am)", value: "morning" },
          { label: "Mid-Day (10am-5pm)", value: "midday" },
          { label: "Evening (5-10pm)", value: "evening" },
        ]}
        selectedValues={formData.times}
        onToggle={(val) => handleArrayToggle("times", val)}
        error={validationErrors.times}
      />

      {/* Start/End Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <Input
          label="Earliest Start Time (IST)"
          name="startTime"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
          required
          error={validationErrors.startTime}
        />
        <Input
          label="Latest End Time (IST)"
          name="endTime"
          type="time"
          value={formData.endTime}
          onChange={handleChange}
          required
          error={validationErrors.endTime}
        />
      </div>
      {timeError && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 font-medium mt-3">
          {timeError}
        </div>
      )}

      {/* New Field: Response Time */}
      <Selector
        label="Expected Response Time to Queries (Required)"
        name="responseTime"
        options={[
          { label: "Within 6 hours", value: "6h" },
          { label: "Within 12 hours", value: "12h" },
          { label: "Within 24 hours", value: "24h" },
          { label: "Within 48 hours", value: "48h" },
        ]}
        value={formData.responseTime}
        onChange={handleChange}
        required
        placeholder="Select expected response time"
        error={validationErrors.responseTime}
        prefix={<BiAlarmIcon className="text-teal-600" />}
      />
    </div>
  );
};

export default StepSixth;
