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
    <div className="flex-none px-6 py-6 border-t border-slate-100 bg-white rounded-b-3xl">
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
        {/* Back Button and Draft Button Group */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center px-6 py-3 border border-slate-200 rounded-xl font-medium transition-all ${
              step === 1
                ? "opacity-0 cursor-default pointer-events-none"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <BiChevronLeftIcon className="w-5 h-5 mr-1" size={16} /> Back
          </button>

          <button
            type="button"
            onClick={saveDraft}
            disabled={saveStatus === "saving"}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-colors text-sm ${
              saveStatus === "saving"
                ? "bg-amber-100 text-amber-700 cursor-not-allowed"
                : saveStatus === "saved"
                ? "bg-green-100 text-green-700"
                : saveStatus === "error"
                ? "bg-red-100 text-red-700"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <BiSave className="w-4 h-4 mr-2" size={16} /> {saveButtonText}
          </button>
        </div>

        {/* Next / Submit Button */}
        {step && totalSteps ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-teal-700 transition-colors"
          >
            {step === totalSteps - 1 ? "Review & Sign" : "Next"}{" "}
            <BiChevronRightIcon className="w-5 h-5 ml-1" size={16} />
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center bg-teal-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              !formData.confirmAccurate ||
              !formData.ethicalStandards ||
              !formData.serviceMindset ||
              !formData.signature ||
              Object.keys(validationErrors).length > 0
            }
          >
            Submit Application <BiSave className="w-4 h-4 ml-2" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingFooter;
