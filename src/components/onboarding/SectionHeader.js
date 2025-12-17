import React from "react";

const SectionHeader = ({ title, subtitle, className = "" }) => (
  <div className={`mb-6 border-b border-slate-100 pb-2 ${className}`}>
    {" "}
    <h2 className="text-xl font-bold text-teal-900">{title}</h2>{" "}
    {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}{" "}
  </div>
);

export default SectionHeader;
