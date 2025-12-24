import React from "react";

const CheckboxToggle = ({ label, name, checked, onChange }) => (
  <label
    className={`mb-4 flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
      checked ? "border-teal-400 bg-teal-50" : "border-gray-300 bg-white"
    }`}
  >
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-teal-600"
    />
  </label>
);

export default CheckboxToggle;
