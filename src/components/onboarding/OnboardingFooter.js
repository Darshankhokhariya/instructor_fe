import React from "react";
import { BiChevronLeftIcon, BiChevronRightIcon } from "../../../utils/icon";
import { BiSave } from "react-icons/bi";

const OnboardingFooter = ({
  prevStep,
  nextStep,
  step,
  saveStatus,
  saveDraft,
  totalSteps,
  formData,
  saveButtonText,
  handleSubmit,
}) => {
  return (
    <div className="flex-none px-4 py-4 sm:px-6 sm:py-6 border-t border-slate-100 bg-white sm:rounded-b-3xl">
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full gap-3">
        {/* Back Button */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center cursor-pointer justify-center min-h-[44px] px-4 sm:px-6 py-2.5 sm:py-3 border border-slate-200 rounded-xl font-medium transition-all ${step === 1
                ? "opacity-0 cursor-default pointer-events-none"
                : "text-slate-500 hover:bg-slate-50 active:bg-slate-100"
              }`}
          >
            <BiChevronLeftIcon className="w-5 h-5 sm:mr-1" size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>

        {/* Next / Submit Button */}
        {step && totalSteps ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center cursor-pointer justify-center min-h-[44px] bg-teal-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold shadow-md hover:bg-teal-700 active:bg-teal-800 transition-colors text-sm sm:text-base"
          >
            <span className="hidden sm:inline">
              {step === totalSteps  ? "Submit" : "Next"}
            </span>
            <span className="sm:hidden">
              {step === totalSteps  ? "Submit" : "Next"}
            </span>
            <BiChevronRightIcon className="w-5 h-5 sm:ml-1" size={16} />
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center cursor-pointer justify-center min-h-[44px] bg-teal-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold shadow-md hover:bg-teal-700 active:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            disabled={
              !formData.confirmAccurate ||
              !formData.ethicalStandards ||
              !formData.serviceMindset ||
              !formData.signature ||
              Object.keys(validationErrors).length > 0
            }
          >
            <span className="hidden sm:inline">Submit Application</span>
            <span className="sm:hidden">Submit</span>
            <BiSave className="w-4 h-4 ml-2" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingFooter;
