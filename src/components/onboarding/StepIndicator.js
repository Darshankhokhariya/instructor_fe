import React, { useMemo } from "react";
import { FaCalendarAlt, FaCheckCircle, FaDollarSign, FaFileAlt, FaGraduationCap, FaIdCard, FaSignature, FaUser, FaVideo } from "../../../utils/icon";

const StepIndicator = ({ currentStep, totalSteps }) => {
  // Retaining original StepIndicator implementation
  const steps = useMemo(
    () => [
      { id: 1, label: "Personal", icon: FaUser },
      { id: 2, label: "Education", icon: FaGraduationCap },
      { id: 3, label: "Taxation", icon: FaIdCard },
      { id: 4, label: "Socials", icon: FaVideo },
      { id: 5, label: "Qualifications", icon: FaFileAlt },
      { id: 6, label: "Availability", icon: FaCalendarAlt },
      { id: 7, label: "Pricing", icon: FaDollarSign },
    ],
    []
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative px-1 sm:px-2">
        {/* Background progress bar */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 sm:h-1 bg-slate-100 -z-10 rounded-full"></div>
        {/* Active progress bar */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 sm:h-1 bg-teal-600 -z-10 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>

        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = s.id === currentStep;
          const isCompleted = s.id < currentStep;

          return (
            <div
              key={s.id}
              className="flex flex-col items-center group relative bg-white p-0.5 sm:p-1 rounded-full"
            >
              {/* Step circle */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                    ? "border-teal-600 text-teal-600 shadow-lg scale-110 bg-white"
                    : isCompleted
                      ? "border-teal-600 bg-teal-600 text-white"
                      : "border-slate-200 text-slate-300 bg-white"
                  }`}
              >
                {isCompleted ? <FaCheckCircle size={12} className="sm:w-3.5 sm:h-3.5" /> : <Icon size={12} className="sm:w-3.5 sm:h-3.5" />}
              </div>
              {/* Step label - show on mobile for active step only */}
              <span
                className={`absolute top-9 sm:top-10 md:top-12 text-[9px] sm:text-[10px] font-medium whitespace-nowrap transition-all duration-300 ${isActive
                    ? "text-teal-600 opacity-100 scale-100"
                    : "text-slate-400 opacity-0 md:opacity-60 scale-90"
                  }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
