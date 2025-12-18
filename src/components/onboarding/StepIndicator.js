import React, { useMemo } from "react";
import { FaCalendarAlt, FaCheckCircle, FaDollarSign, FaFileAlt, FaGraduationCap, FaIdCard, FaSignature, FaUser, FaVideo } from "../../../utils/icon";

const StepIndicator = ({ currentStep, totalSteps }) => {
  // Retaining original StepIndicator implementation
  const steps = useMemo(
    () => [
      { id: 1, label: "Personal & Contact", icon: FaUser },
      { id: 2, label: "Education", icon: FaGraduationCap },
      { id: 3, label: "Taxation", icon: FaIdCard },
      { id: 4, label: "Socials & Videos", icon: FaVideo },
      { id: 5, label: "Qualifications", icon: FaFileAlt },
      { id: 6, label: "Availability", icon: FaCalendarAlt },
      { id: 7, label: "Pricing", icon: FaDollarSign },
      { id: 8, label: "Agreements", icon: FaSignature },
    ],
    []
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative px-2">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10 rounded-full"></div>
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-600 -z-10 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>

        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = s.id === currentStep;
          const isCompleted = s.id < currentStep;
          const isVisibleOnMobile =
            s.id % 2 === 1 || s.id === totalSteps || isActive;

          return (
            <div
              key={s.id}
              className={`flex flex-col items-center group relative bg-white p-1 rounded-full ${
                !isVisibleOnMobile && "hidden sm:flex"
              }`}
            >
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive
                    ? "border-teal-600 text-teal-600 shadow-lg scale-110 bg-white"
                    : isCompleted
                    ? "border-teal-600 bg-teal-600 text-white"
                    : "border-slate-200 text-slate-300 bg-white"
                }`}
              >
                {isCompleted ? <FaCheckCircle size={14} /> : <Icon size={14} />}
              </div>
              <span
                className={`absolute top-12 text-[10px] font-medium whitespace-nowrap transition-colors duration-300 ${
                  isActive
                    ? "text-teal-600 opacity-100"
                    : "text-slate-400 opacity-0"
                } hidden md:block`}
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
