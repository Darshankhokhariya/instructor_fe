import React from "react";
import Selector from "../common/Selector";
import { BiAlarmIcon } from "../../../utils/icon";
import WeeklySchedule from "../common/WeeklySchedule";
import SectionHeader from "./SectionHeader";
import Label from "./Label";
import CheckboxToggle from "../common/CheckboxToggle";

const StepSixth = ({
  formData,
  handleChange,
  validationErrors,
  handleArrayToggle,
  timeError,
  handleTimeSlotsChange,
}) => {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Class Availability"
        subtitle="Indicate when you are generally available for online classes (Time zone: IST)."
      />

      {/* Class Type Selection */}
      <div className="mt-4 space-y-3">
        <Label required>Available Class Types</Label>
        <CheckboxToggle
          label="Available for Group Class"
          name="availableGroupClass"
          checked={formData.availableGroupClass}
          onChange={handleChange}
        />
        <CheckboxToggle
          label="Available for Private Class"
          name="availablePrivateClass"
          checked={formData.availablePrivateClass}
          onChange={handleChange}
        />
        <CheckboxToggle
          label="Available for Online Class"
          name="availableOnlineClass"
          checked={formData.availableOnlineClass}
          onChange={handleChange}
        />
        {validationErrors.classType && (
          <p className="mt-2 text-xs text-red-500">
            {validationErrors.classType}
          </p>
        )}
      </div>

      {/* Weekly Schedule with Time Slots */}
      <WeeklySchedule
        selectedDays={formData.days}
        onDaysChange={(days) => handleArrayToggle("days", days, true)}
        timeSlots={formData.timeSlots || {}}
        onTimeSlotsChange={handleTimeSlotsChange}
        error={validationErrors.days}
      />

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
