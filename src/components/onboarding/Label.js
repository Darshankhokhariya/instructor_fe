import React from "react";

const Label = ({ children, required }) => (
  <label className="mb-1 block text-sm font-medium text-gray-700">
    {children} {required && <span className="text-teal-600">*</span>}
  </label>
);

export default Label;
