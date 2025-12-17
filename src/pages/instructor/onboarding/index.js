import Input from "@/components/common/Input";
import Selector from "@/components/common/Selector";
import SmartSelect from "@/components/common/SmartSelect";
import TextArea from "@/components/common/TextArea";
import PhoneInput from "@/components/common/PhoneInput";

import React, { useState, useCallback, useMemo, useEffect } from "react";
// These icons are kept here as they are directly imported from 'react-icons/bi' in your first prompt
import {
  BiCalendar,
  BiFile,
  BiLogoFacebook,
  BiLogoInstagram,
  BiMaleSign,
  BiPlusCircle,
  BiShield,
  BiSolidIdCard,
  BiTrash,
  BiUser,
  BiVideo,
  BiSave,
  BiSolidGraduation,
  BiChevronLeft,
  BiChevronRight,
  BiWorld,
  BiAlarm,
  BiLink,
  BiCheckCircle,
} from "react-icons/bi";
import Modal from "@/components/common/Modal";
import Link from "next/link";
import { userOnboarding } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import StepOne from "@/components/onboarding/StepOne";
import SectionHeader from "@/components/onboarding/SectionHeader";
import StepTwo from "@/components/onboarding/StepTwo";
import StepThree from "@/components/onboarding/StepThree";
import StepFour from "@/components/onboarding/StepFour";
import StepFive from "@/components/onboarding/StepFive";
import StepSixth from "@/components/onboarding/StepSixth";
import StepSeven from "@/components/onboarding/StepSeven";
import StepEight from "@/components/onboarding/StepEight";
import { FIELD_LABELS, isEmpty, LABELS, REGEX } from "../../../../utils/validation";
import { useDispatch } from "react-redux";

// Icon Mapping
const FaCheckCircle = BiSave; // Using BiSave for checkmark style completion (Keeping original component's choice)
const FaUser = BiUser;
const FaFileAlt = BiFile;
const FaVideo = BiVideo;
const FaCalendarAlt = BiCalendar;
const FaDollarSign = BiCalendar; // Using BiCalendar as a proxy for pricing/dollar-related icon
const FaShieldAlt = BiShield;
const FaIdCard = BiSolidIdCard;
const FaPlus = BiPlusCircle;
const FaTrash = BiTrash;
const FaInstagram = BiLogoInstagram;
const FaFacebook = BiLogoFacebook;
const FaLinkedin = BiMaleSign; // Using BiMaleSign for LinkedIn (as per original code, might be better to use BiLogoLinkedin if available, but sticking to provided icons)
const FaYoutube = BiVideo; // Using BiVideo as a proxy for YouTube
const FaRoad = BiMaleSign; // Using BiMaleSign for Road/Address (as per original code, better would be BiMap)
const FaMapMarkerAlt = BiMaleSign; // Using BiMaleSign for MapMarker (as per original code, better would be BiMapPin)
const FaGraduationCap = BiSolidGraduation;
const FaSignature = BiMaleSign;
const FaSave = BiSave;
const BiChevronLeftIcon = BiChevronLeft;
const BiChevronRightIcon = BiChevronRight;
const BiWorldIcon = BiWorld; // New icon for Languages
const BiAlarmIcon = BiAlarm; // New icon for Response Time
const BiLinkIcon = BiLink; // New icon for Website
const BiCheckCircleIcon = BiCheckCircle;

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
const useRouter = () => ({
  push: (path) => console.log(`Simulating navigation to: ${path}`),
});
const isTimeSlotValid = (start, end) => {
  if (!start || !end) return true;
  const [startH, startM] = start.split(":").map(Number);
  let [endH, endM] = end.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  let endMinutes = endH * 60 + endM;
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60;
  }
  const durationMinutes = endMinutes - startMinutes;
  const maxDurationMinutes = 5 * 60; // Max duration of 5 hours
  return durationMinutes <= maxDurationMinutes;
};

/* -------------------------------------------------------------------------- */
/* --- NEW COMPONENT: SubmissionDialog --- */
/* -------------------------------------------------------------------------- */

const SubmissionDialog = ({
  isOpen,
  onClose,
  onAccept,
  profileImagePreview,
}) => {
  // Using the generic Modal component for structure, backdrop, and closure.
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex items-center">
          <BiShield size={20} className="mr-2 text-teal-600" /> Final Agreement
          & Review
        </span>
      }
    >
      <div className="space-y-4 text-slate-700 custom-scrollbar">
        <p className="font-semibold text-sm">
          Please review your profile image and confirm acceptance of our Privacy
          Policy and Terms of Service before finalizing your application.
        </p>

        {/* Terms & Privacy Mock Content */}
        <div className="border border-slate-300 rounded-lg p-4 h-48 overflow-y-auto bg-slate-50 text-sm">
          <h4 className="font-bold text-teal-800 mb-2">
            1. Privacy Policy Summary
          </h4>
          <p className="text-xs mb-3">
            By accepting, you consent to the collection and processing of your
            personal data (including contact, address, education, and financial
            identifiers like PAN/Aadhaar) solely for the purpose of platform
            operation, verification, compliant payments, and public profile
            display. We commit to protecting your data with industry-standard
            security measures.
          </p>
          <h4 className="font-bold text-teal-800 mb-2">
            2. Terms of Service Summary
          </h4>
          <p className="text-xs">
            You agree to our fee structure, the ethical standards, and the
            non-compete clause for clients acquired through Yogalink. You retain
            all IP rights to your content, but grant Yogalink a limited license
            to display your videos and profile. Termination requires 30 days
            notice.
          </p>
          <Link
            href="/privacy-policy"
            className="text-xs font-bold mt-3 text-red-600"
          >
            Privacy Policy & Terms
          </Link>
        </div>

        {/* Footer Actions (placed inside Modal content for styling, but logically acts as footer) */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-slate-300 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors flex items-center"
          >
            <BiCheckCircleIcon className="mr-2" size={16} /> I Accept & Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

/* -------------------------------------------------------------------------- */
/* --- MAIN COMPONENT: InstructorOnboarding --- */
/* -------------------------------------------------------------------------- */

const InstructorOnboarding = () => {
  const totalSteps = 8;
  const DRAFT_KEY = "instructorOnboardingDraft";
  const [step, setStep] = useState(1); // Start at Step 1
  const router = useRouter();
  const [isCurrentSameAsPermanent, setIsCurrentSameAsPermanent] =
    useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  console.log("validationErrors", validationErrors);
  // NEW STATE: For Dialog and Image Preview
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  // Added: language, instructor_website, responseTime, registerAs
  const initialFormData = useMemo(
    () => ({
      name: "",
      dateOfBirth: "",
      gender: "",
      email: "",
      primaryMobile: "",
      secondMobile: "",
      pCountry: "",
      pState: "",
      pCity: "",
      pPincode: "",
      pArea: "",
      pBuilding: "",
      pBlock: "",
      cCountry: "",
      cState: "",
      cCity: "",
      cPincode: "",
      cArea: "",
      cBuilding: "",
      cBlock: "",
      eName: "",
      eMobile: "",
      eRelation: "",
      language: [], // Existing Field
      collegeName: "",
      qualification: "",
      institute: "",
      registerAs: "individual", // Existing Field: default to individual
      panCard: "",
      aadharNumber: "",
      GSTIN: "",
      facebook_link: "",
      linkdin_link: "",
      instagram_link: "",
      youtube_link: "",
      instructor_website: "", // Existing Field
      profileImage: null, // [NEW FIELD]
      certifications: [{ title: "", file: null }],
      yoga_style: [],
      introVideo: "",
      video_url: ["", ""],
      teaching_philosophy: "",
      days: [],
      times: [],
      startTime: "07:00",
      endTime: "12:00",
      responseTime: "", // Existing Field
      availableOneOnOne: false,
      availableGroupClass: false,
      singleClass: false,
      group_class_rate: "",
      private_class_rate: "",
      single_class_rate: "",
      trialMode: "",
      confirmAccurate: false,
      ethicalStandards: false,
      serviceMindset: false,
      signature: "",
    }),
    []
  );

  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch()

  console.log("formData", formData);

  const parts = formData?.primaryMobile?.trim().split(/\s+/);
  const partsSecond = formData?.secondMobile?.trim().split(/\s+/);
  const countryCode = parts?.[0];
  const mobileNumber = parts?.slice(1)?.join("");
  const SecondMobileNumber = partsSecond?.slice(1)?.join("");

  console.log("countryCode", countryCode);

  // --- EFFECT TO LOAD DRAFT DATA ---
  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        const draftData = JSON.parse(draft);
        // Merge draft data with initial data, providing fallbacks for arrays
        setFormData((prev) => ({
          ...prev,
          ...draftData,
          // Do not load actual File objects (profileImage and cert.file) from localStorage
          profileImage: null, // Reset as File object cannot be stored
          certifications: (
            draftData.certifications || [{ title: "", file: null }]
          ).map((cert) => ({ ...cert, file: null })),
          video_url: draftData.video_url || ["", ""],
          yoga_style: draftData.yoga_style || [],
          days: draftData.days || [],
          times: draftData.times || [],
          language: draftData.language || [],
        }));
        if (draftData.isCurrentSameAsPermanent) {
          setIsCurrentSameAsPermanent(true);
        }
      } catch (error) {
        console.error("Failed to parse draft data:", error);
      }
    }
  }, [initialFormData]);

  // --- EFFECT TO HANDLE PROFILE IMAGE PREVIEW ---
  useEffect(() => {
    if (formData.profileImage instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(formData.profileImage);
    } else {
      setProfileImagePreview(null);
    }
  }, [formData.profileImage]);

  // --- HANDLERS ---

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });

    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedData = { ...prev, [name]: checked };

        // Logic for trialMode dependent on class availability
        if (name === "availableOneOnOne" || name === "availableGroupClass") {
          if (
            !updatedData.availableOneOnOne &&
            !updatedData.availableGroupClass
          ) {
            updatedData.trialMode = "none";
          } else if (
            updatedData.trialMode === "none" ||
            updatedData.trialMode === ""
          ) {
            // Auto-select a default trial if one is now available
            updatedData.trialMode = updatedData.availableOneOnOne
              ? "1private"
              : updatedData.availableGroupClass
              ? "2group"
              : "";
          }
        }
        return updatedData;
      });
      return;
    }

    if (type === "file") {
      // [MODIFIED] Handles file input for both profileImage and certification files
      setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleArrayToggle = useCallback((field, value) => {
    setFormData((prev) => {
      const current = prev[field];
      const updated = current.includes(value)
        ? current.filter((i) => i !== value)
        : [...current, value];

      setValidationErrors((v) => {
        if (v[field] && updated.length > 0) {
          const newErrors = { ...v };
          delete newErrors[field];
          return newErrors;
        }
        return v;
      });
      return { ...prev, [field]: updated };
    });
  }, []);

  const handleCertChange = useCallback((index, field, value, file) => {
    setFormData((prev) => {
      const updated = [...prev.certifications];
      updated[index][field] = file || value;
      setValidationErrors((v) => {
        const newErrors = { ...v };
        delete newErrors[`certifications[${index}].${field}`];
        return newErrors;
      });
      return { ...prev, certifications: updated };
    });
  }, []);

  const addCertification = () =>
    formData.certifications.length < 10 &&
    setFormData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { title: "", file: null }],
    }));
  const removeCertification = (index) =>
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));

  const handleSampleVideoChange = useCallback((index, value) => {
    setFormData((prev) => {
      const updated = [...prev.video_url];
      updated[index] = value;
      setValidationErrors((v) => {
        const newErrors = { ...v };
        delete newErrors[`video_url[${index}]`];
        return newErrors;
      });
      return { ...prev, video_url: updated };
    });
  }, []);
  const addSampleVideo = () =>
    formData.video_url.length < 10 &&
    setFormData((prev) => ({
      ...prev,
      video_url: [...prev.video_url, ""],
    }));
  const removeSampleVideo = (index) =>
    formData.video_url.length > 2 &&
    setFormData((prev) => ({
      ...prev,
      video_url: prev.video_url.filter((_, i) => i !== index),
    }));

  const handleSameAsPermanentToggle = (e) => {
    const isChecked = e.target.checked;
    setIsCurrentSameAsPermanent(isChecked);
    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        cCountry: prev.pCountry,
        cState: prev.pState,
        cCity: prev.pCity,
        cPincode: prev.pPincode,
        cArea: prev.pArea,
        cBuilding: prev.pBuilding,
        cBlock: prev.pBlock,
      }));
      setValidationErrors((v) => {
        const keysToRemove = [
          "cCountry",
          "cState",
          "cCity",
          "cPincode",
          "cArea",
          "cBuilding",
          "cBlock",
        ];
        const newErrors = { ...v };
        keysToRemove.forEach((key) => delete newErrors[key]);
        return newErrors;
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        cCountry: "",
        cState: "",
        cCity: "",
        cPincode: "",
        cArea: "",
        cBuilding: "",
        cBlock: "",
      }));
    }
  };

  // --- CORE VALIDATION LOGIC (Omitted for brevity, assuming it's correct from the prompt) ---
  const validateFormFields = useCallback(
  (data) => {
    const errors = {};

    const requiredFields = {
      1: [
        "name","dateOfBirth","gender","email","primaryMobile","language",
        "pCountry","pState","pCity","pPincode","pArea","pBuilding","pBlock",
        "eName","eMobile","eRelation"
      ],
      2: ["collegeName","qualification","institute"],
      3: ["registerAs","panCard","aadharNumber"],
      5: ["profileImage","introVideo","teaching_philosophy"],
      6: ["startTime","endTime","responseTime"],
      7: [], // handled conditionally below
      8: ["confirmAccurate","ethicalStandards","serviceMindset","signature"],
    };

    // Step 1-8: required fields
    (requiredFields[step] || []).forEach((field) => {
      if (isEmpty(data[field])) errors[field] = `${FIELD_LABELS[field]} is required.`;
    });

    // Step 1: current address if different
    if (step === 1 && !isCurrentSameAsPermanent) {
      ["cCountry","cState","cCity","cPincode","cArea","cBuilding","cBlock"]
        .forEach(f => { if(isEmpty(data[f])) errors[f] = `${FIELD_LABELS[f]} is required.` });
    }

    // Regex validations
    if (step === 1 && data.email && !REGEX.email.test(data.email)) errors.email = "Invalid email";
    if (step === 3) {
      if(data.panCard && !REGEX.pan.test(data.panCard.toUpperCase())) errors.panCard = "Invalid PAN format";
      if(data.aadharNumber && !REGEX.aadhar.test(data.aadharNumber.replace(/\s/g,""))) errors.aadharNumber = "Invalid Aadhaar number";
    }
    if (step === 4) {
      ["instagram_link","facebook_link","linkdin_link","youtube_link","instructor_website"]
        .forEach(f => { if(data[f]?.trim() && !REGEX.url.test(data[f].trim())) errors[f] = "Invalid URL" });
    }
    if (step === 5) {
      if(!data.yoga_style?.length) errors.yoga_style = "Select at least one Yoga Style";
      if(!data.certifications?.length) errors.certifications = "Add at least one certification";
      const videos = data.video_url?.filter(v => v.trim()) || [];
      if(videos.length < 2) errors.video_url = "Minimum two sample videos required";
      data.video_url?.forEach((v,i) => { if(v.trim() && !REGEX.url.test(v)) errors[`video_url[${i}]`] = `Video ${i+1} is invalid` });
      if(data.introVideo && !REGEX.url.test(data.introVideo)) errors.introVideo = "Invalid video URL";
    }

    // Step 6: class selection
    if(step === 6 && !data.availableOneOnOne && !data.availableGroupClass && !data.singleClass) errors.classType = "Select at least one class type";
    if(step === 6 && !data.days?.length) errors.days = "Select at least one teaching day";
    if(step === 6 && !data.times?.length) errors.times = "Select at least one class time";

    // Step 7: pricing
    if(step === 7){
      [["group_class_rate", "availableGroupClass"], ["private_class_rate", "availableOneOnOne"], ["single_class_rate", "singleClass"]]
        .forEach(([field, cond]) => {
          if(data[cond]){
            if(isEmpty(data[field])) errors[field] = `${FIELD_LABELS[field]} is required`;
            else if(!REGEX.positiveNumber.test(data[field]) || Number(data[field])<=0) errors[field] = `${FIELD_LABELS[field]} must be positive`;
          }
        });
      if((data.availableGroupClass||data.availableOneOnOne) && (!data.trialMode || data.trialMode==='none')) errors.trialMode = "Trial Policy is required";
    }

    return errors;
  },
);

  // --- END OF VALIDATION LOGIC ---

  const validateStep = () => {
    const fieldErrors = validateFormFields(formData);

    let customError = null;
    if (step === 6 && formData.startTime && formData.endTime) {
      const isValidTime = isTimeSlotValid(formData.startTime, formData.endTime);
      if (!isValidTime) {
        customError =
          "Your total available window cannot exceed 5 hours. Please adjust Start/End Time.";
        fieldErrors.startTime = fieldErrors.startTime || customError;
        fieldErrors.endTime = fieldErrors.endTime || customError;
      }
    }
    setTimeError(customError);

    if (Object.keys(fieldErrors).length > 0) {
      setValidationErrors(fieldErrors);
      document
        .getElementById("form-content-area")
        ?.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }

    setValidationErrors({});
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      // Uncomment for mandatory validation
      document
        .getElementById("form-content-area")
        ?.scrollTo({ top: 0, behavior: "smooth" });
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setValidationErrors({});
    setTimeError(null);
    document
      .getElementById("form-content-area")
      ?.scrollTo({ top: 0, behavior: "smooth" });
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setShowSuccessDialog(true);
  };

  const saveDraft = async () => {
    const payload = {
      ...formData,
      countryCode: countryCode,
      primaryMobile: mobileNumber,
      secondMobile: SecondMobileNumber,
      class_availability: {
        availableClassTypes: [
          formData.availableOneOnOne,
          formData.availableGroupClass,
        ],
        teachingDays: formData.days,
        earliestStartTime: formData.startTime,
        latestEndTime: formData.endTime,
        responseTime: formData.responseTime,
      },
    };

    await dispatch(userOnboarding(payload))
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          // handleClear();
          toast.success(res.message || `User Onboarding succesfully!`);
        } else {
          toast.error(res.message || `Something went wrong`);
        }
      })
      .catch((err) => {
        toast.error(err || "Something went wrong");
      });
  };

  // --- MODIFIED SUBMISSION HANDLER: Opens Dialog ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      countryCode: countryCode,
      primaryMobile: mobileNumber,
      secondMobile: SecondMobileNumber,
      class_availability: {
        availableClassTypes: [
          formData.availableOneOnOne,
          formData.availableGroupClass,
        ],
        teachingDays: formData.days,
        earliestStartTime: formData.startTime,
        latestEndTime: formData.endTime,
        responseTime: formData.responseTime,
      },
    };

    console.log("payload", payload);
    return;
    await dispatch(userOnboarding(payload))
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          handleClear();
          toast.success(res.message || `User Onboarding succesfully!`);
        } else {
          toast.error(res.message || `Something went wrong`);
        }
      })
      .catch((err) => {
        toast.error(err || "Something went wrong");
      });
  };

  // --- NEW: Final Accept Handler ---
  const handleFinalAccept = () => {
    console.log("Final Submission Data (Accepted):", formData);
    localStorage.removeItem(DRAFT_KEY);
    setShowSuccessDialog(false);
    setStep(totalSteps + 1); // Move to the final 'Submitted' screen
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    // Optional: Scroll to the bottom of the form for easier editing of Step 8
    document
      .getElementById("form-content-area")
      ?.scrollTo({ top: 9999, behavior: "smooth" });
  };

  const handleSaveDraft = useCallback(
    async (e) => {
      // setSaveStatus("saving");
      handleSubmit(e);
    },
    [formData]
  );

  const isSubmitted = step === totalSteps + 1;
  const isGroupSelected = formData.availableGroupClass;
  const isPrivateSelected = formData.availableOneOnOne;
  const isSingleSelected = formData.singleClass;

  const saveButtonText = useMemo(() => {
    switch (saveStatus) {
      case "saving":
        return "Saving...";
      case "saved":
        return "Draft Saved! ✓";
      case "error":
        return "Save Failed! ❌";
      default:
        return "Save as Draft";
    }
  }, [saveStatus]);

  const trialOptions = useMemo(() => {
    const options = [];
    if (isPrivateSelected) {
      options.push({ label: "1 Free One-on-One Trial", value: "1private" });
    }
    if (isGroupSelected) {
      options.push({ label: "2 Free Group Class Trials", value: "2group" });
    }
    if (isPrivateSelected || isGroupSelected) {
      // Added 'No Free Trial' only if classes are available
      options.push({ label: "No Free Trial", value: "nofreetrial" });
    }
    options.push({ label: "No Trial", value: "none" });
    return options;
  }, [isPrivateSelected, isGroupSelected]);

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-2 md:p-6 font-sans text-slate-800 overflow-hidden">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-screen h-full md:h-auto md:min-h-[650px]">
        {/* HEADER */}
        <div className="flex-none px-4 py-6 md:px-10 border-b border-slate-100 bg-white rounded-t-3xl z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-teal-900">
                Yogalink Instructor
              </h1>
              <p className="text-slate-500 text-sm">Join the collective.</p>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase">
                {isSubmitted ? "Complete" : `Step ${step} of ${totalSteps}`}
              </span>
            </div>
          </div>

          {!isSubmitted && (
            <StepIndicator currentStep={step} totalSteps={totalSteps} />
          )}
        </div>

        {/* SCROLLABLE CONTENT */}
        <div
          id="form-content-area"
          className="flex-1 overflow-y-auto px-6 py-6 md:px-12 scroll-smooth custom-scrollbar"
        >
          <form
            id="onboarding-form"
            onSubmit={handleSubmit}
            className="max-w-5xl mx-auto min-h-full"
          >
            <div
              className={`transition-opacity duration-300 ease-out ${
                isSubmitted ? "opacity-100" : "opacity-100"
              } pb-4`}
            >
              {/* STEP 1: PERSONAL, ADDRESS, EMERGENCY CONTACT, LANGUAGES */}
              {step === 1 && (
                <StepOne
                  formData={formData}
                  handleChange={handleChange}
                  validationErrors={validationErrors}
                  handleArrayToggle={handleArrayToggle}
                  isCurrentSameAsPermanent={isCurrentSameAsPermanent}
                  handleSameAsPermanentToggle={handleSameAsPermanentToggle}
                />
              )}

              {/* STEP 2: EDUCATION DETAILS */}
              {step === 2 && (
                <StepTwo
                  formData={formData}
                  handleChange={handleChange}
                  validationErrors={validationErrors}
                />
              )}

              {/* STEP 3: TAXATION DETAILS (India Only) */}
              {step === 3 && (
                <StepThree
                  formData={formData}
                  handleChange={handleChange}
                  validationErrors={validationErrors}
                />
              )}

              {/* STEP 4: SOCIAL MEDIA DETAILS & INSTRUCTOR WEBSITE */}
              {step === 4 && (
                <StepFour
                  formData={formData}
                  handleChange={handleChange}
                  validationErrors={validationErrors}
                />
              )}

              {/* STEP 5: QUALIFICATIONS & EXPERTISE (Styles, Certs, Videos, Philosophy) */}
              {step === 5 && (
                <StepFive
                  formData={formData}
                  handleChange={handleChange}
                  validationErrors={validationErrors}
                  handleArrayToggle={handleArrayToggle}
                  handleCertChange={handleCertChange}
                  profileImagePreview={profileImagePreview}
                  addCertification={addCertification}
                  addSampleVideo={addSampleVideo}
                />
              )}

              {/* STEP 6: AVAILABILITY (ENHANCED) */}
              {step === 6 && (
                <StepSixth
                  formData={formData}
                  handleChange={handleChange}
                  validationErrors={validationErrors}
                  handleArrayToggle={handleArrayToggle}
                  timeError={timeError}
                />
              )}

              {/* STEP 7: PRICING (ENHANCED) */}
              {step === 7 && (
                <StepSeven
                  formData={formData}
                  handleChange={handleChange}
                  validationErrors={validationErrors}
                  isGroupSelected={isGroupSelected}
                  isPrivateSelected={isPrivateSelected}
                  isSingleSelected={isSingleSelected}
                />
              )}

              {/* STEP 8: AGREEMENTS & SIGNATURE */}
              {step === 8 && (
                <StepEight
                  formData={formData}
                  handleChange={handleChange}
                  validationErrors={validationErrors}
                />
              )}

              {/* FINAL STEP: VERIFICATION PENDING */}
              {isSubmitted && (
                <div className="flex flex-col items-center justify-center text-center h-full py-10 animate-in zoom-in-95">
                  <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-xl">
                    <BiShield size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">
                    Application Submitted!
                  </h2>
                  <p className="text-slate-500 max-w-md mx-auto mb-4">
                    Thank you for submitting your profile. We are now verifying
                    your documents and qualifications.
                  </p>
                  <p className="text-slate-600 font-semibold mb-8">
                    Application ID: #YGL-
                    {Math.floor(Math.random() * 90000 + 10000)}
                  </p>
                  <button
                    onClick={() => router.push("/")}
                    className="text-white bg-teal-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-teal-700 transition-colors"
                  >
                    Return Home
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* FOOTER - NAVIGATION & DRAFT */}
        {!isSubmitted && (
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
              {step < totalSteps ? (
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
                  Submit Application{" "}
                  <BiSave className="w-4 h-4 ml-2" size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Tailwind CSS scrollbar utility class */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>

      {/* The new Submission Dialog component */}
      <SubmissionDialog
        isOpen={showSuccessDialog}
        onClose={handleCloseDialog}
        onAccept={handleFinalAccept}
        profileImagePreview={profileImagePreview}
      />
    </div>
  );
};

export default InstructorOnboarding;
