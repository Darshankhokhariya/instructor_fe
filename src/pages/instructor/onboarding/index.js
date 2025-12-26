import React, { useState, useCallback, useMemo, useEffect } from "react";
import { userOnboarding } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import StepOne from "@/components/onboarding/StepOne";
import StepTwo from "@/components/onboarding/StepTwo";
import StepThree from "@/components/onboarding/StepThree";
import StepFour from "@/components/onboarding/StepFour";
import StepFive from "@/components/onboarding/StepFive";
import StepSixth from "@/components/onboarding/StepSixth";
import StepSeven from "@/components/onboarding/StepSeven";
import StepEight from "@/components/onboarding/StepEight";
import {
  FIELD_LABELS,
  isAdult,
  isEmpty,
  REGEX,
  STEP_FIELDS,
} from "../../../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import OnboardingFooter from "@/components/onboarding/OnboardingFooter";
import { BiCheckCircleIcon, FaShieldAlt } from "../../../../utils/icon";
import StepIndicator from "@/components/onboarding/StepIndicator";
import {
  formatDOB,
  isTimeSlotValid,
  languageOptions,
} from "../../../../utils/onboarding";
import SubmissionDialog from "@/components/onboarding/SubmissionDialog";
import {
  getOnboardingStep,
  getOnboardingStepData,
  onboardingStepFive,
  onboardingStepFour,
  onboardingStepOne,
  onboardingStepSeven,
  onboardingStepSixth,
  onboardingStepThree,
  onboardingStepTwo,
  selectOnboardingStep,
  selectOnboardingStepData,
} from "@/redux/slices/onboardingSlice";
import moment from "moment";
import { useRouter } from "next/navigation";

const InstructorOnboarding = () => {
  const totalSteps = 7;
  const DRAFT_KEY = "instructorOnboardingDraft";

  const router = useRouter();
  const [isCurrentSameAsPermanent, setIsCurrentSameAsPermanent] =
    useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

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
      aadharNo: "",
      GSTIN: "",
      taxIdentification: "",
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
      timeSlots: {}, // NEW: Time slots for each day
      startTime: "07:00",
      endTime: "12:00",
      responseTime: "", // Existing Field
      availableGroupClass: false,
      availablePrivateClass: false,
      availableOnlineClass: false,
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
  const dispatch = useDispatch();

  const parts = formData?.primaryMobile?.trim().split(/\s+/);
  const partsSecond = formData?.secondMobile?.trim().split(/\s+/);
  const countryCode = parts?.[0];
  const mobileNumber = parts?.slice(1)?.join("");
  const SecondMobileNumber = partsSecond?.slice(1)?.join("");

  const defaultOnboardingStep = useSelector(selectOnboardingStep);
  const defaultOnboardingStepData = useSelector(selectOnboardingStepData);
  const [step, setStep] = useState(); // Start at Step 1

  useEffect(() => {
    setFormData((prev) => {
      let updated = { ...prev };

      // ✅ set email from localStorage (only once)
      const storedEmail = localStorage.getItem("email");
      if (storedEmail && !prev.email) {
        updated.email = storedEmail;
      }

      // ✅ default registerAs for India
      if (updated.pCountry === "india" && !updated.registerAs) {
        updated.registerAs = "individual";
      }

      return updated;
    });
  }, []);

  useEffect(() => {
    const fetchOnboardingStep = async () => {
      try {
        const response = await dispatch(getOnboardingStep());
        const stepCompleted = response?.payload?.data?.data?.step_completed;

        if (
          stepCompleted === null ||
          stepCompleted === 0 ||
          stepCompleted === undefined
        ) {
          setStep(1);
        } else if (stepCompleted === 7) {
          router.push("/verification");
        } else {
          setStep(stepCompleted + 1);
        }
      } catch (err) {
        // err is now the full object from API
        console.error("Full API Error:", err);
        setStep(1);
        toast.error(err.message || "Failed to fetch onboarding step");
      }
    };

    fetchOnboardingStep();
  }, []);

  useEffect(() => {
    if (step < totalSteps) {
      dispatch(getOnboardingStepData(step));
    }
  }, [step]);

  const mapClassAvailabilityToFormData = (apiData) => {
    const classAvailability = apiData?.class_availability?.[0];
    if (!classAvailability) return {};

    const {
      class_types = [],
      availability = {},
      response_time_hours,
    } = classAvailability;

    // class types
    const availableGroupClass = class_types.includes("GROUP");
    const availablePrivateClass = class_types.includes("PRIVATE");
    const availableOnlineClass = class_types.includes("ONLINE");

    // days + timeSlots
    const days = [];
    const timeSlots = {};

    Object.entries(availability).forEach(([day, slots]) => {
      const lowerDay = day.toLowerCase();
      days.push(lowerDay);

      timeSlots[lowerDay] = slots.map((slot) => ({
        start: slot.start_time,
        end: slot.end_time,
      }));
    });

    return {
      availableGroupClass,
      availablePrivateClass,
      availableOnlineClass,
      days,
      timeSlots,
      responseTime: response_time_hours ? `${response_time_hours}h` : "",
    };
  };

  useEffect(() => {
    const data = defaultOnboardingStepData?.data;

    if (step === 1 && data) {
      const apiLanguages = data?.language || [];

      const selectedLanguages = [];
      let otherLanguage = "";

      apiLanguages.forEach((lang) => {
        if (languageOptions.includes(lang)) {
          selectedLanguages.push(lang);
        } else if (lang && lang.trim() !== "") {
          selectedLanguages.push("Other"); // select Other tab
          otherLanguage = lang; // fill input
        }
      });
      const countryCode = data?.countryCode || "+91";
      const primaryMobile = data?.primaryMobile
        ? `${countryCode} ${data?.primaryMobile}`
        : "";
      const secondMobile = data?.secondMobile
        ? `${countryCode} ${data?.secondMobile}`
        : "";
      setFormData((prev) => ({
        ...prev,
        name: data?.name,
        dateOfBirth: formatDOB(data.dateOfBirth),
        gender: data?.gender,
        primaryMobile,
        secondMobile,
        language: selectedLanguages,
        pBlock: data?.pBlock,
        pBuilding: data?.pBuilding,
        pArea: data?.pArea,
        pCity: data?.pCity,
        pState: data?.pState,
        pCountry: data?.pCountry,
        pPincode: data?.pPincode,

        cBlock: data?.cBlock,
        cBuilding: data?.cBuilding,
        cArea: data?.cArea,
        cCity: data?.cCity,
        cState: data?.cState,
        cCountry: data?.cCountry,
        cPincode: data?.cPincode,

        eName: data?.eName,
        eMobile: data?.eMobile,
        eRelation: data?.eRelation,
      }));
    }

    if (step === 2 && data) {
      setFormData((prev) => ({
        ...prev,
        collegeName: data?.collegeName,
        qualification: data?.qualification,
        institute: data?.institute,
      }));
    }

    if (step === 3 && data) {
      setFormData((prev) => ({
        ...prev,
        registerAs: data?.registerAs,
        taxIdentification: data?.taxIdentification,
        panCard: data?.taxIdentification,
        aadharNo: data?.aadharNo,
        GSTIN: data?.GSTIN,
      }));
    }

    if (step === 4 && data) {
      setFormData((prev) => ({
        ...prev,
        instagram_link: data?.instagram_link,
        linkdin_link: data?.linkdin_link,
        instructor_website: data?.instructor_website,
        facebook_link: data?.facebook_link,
        youtube_link: data?.youtube_link,
      }));
    }

    if (step === 5 && data) {
      setFormData((prev) => ({
        ...prev,
        yoga_style: data?.yoga_style || [],
        video_url: data?.video_url || [""],
        instructor_website: data?.instructor_website,
        teaching_philosophy: data?.teaching_philosophy,
      }));
    }
    if (step === 6 && data) {
      const mappedData = mapClassAvailabilityToFormData(data);

      setFormData((prev) => ({
        ...prev,
        ...mappedData,
      }));
    }

    if (step === 7 && data) {
      setFormData((prev) => ({
        ...prev,
        group_class_rate: data?.pricing_agreement?.group_class_rate,
        private_class_rate: data?.pricing_agreement?.private_class_rate,
        single_class_rate: data?.pricing_agreement?.single_class_rate,
        trial_period_days: data?.pricing_agreement?.trial_period_days,
        signature: data?.pricing_agreement?.signature,
      }));

      if (data?.pricing_agreement?.isAgree === true) {
        setFormData((prev) => ({
          confirmAccurate: true,
          ethicalStandards: true,
          serviceMindset: true,
        }));
      }
    }
  }, [step, defaultOnboardingStepData?.data]);

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
    const { name, value, type, checked, files } = e.target;

    // Clear existing error for this field
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });

    // Checkbox
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    // File input
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      return;
    }

    // Date of Birth validation (18+)
    if (name === "dateOfBirth") {
      if (!isAdult(value)) {
        setValidationErrors((prev) => ({
          ...prev,
          dateOfBirth: "You must be at least 18 years old",
        }));
      }
    }

    // Default input handler
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleArrayToggle = useCallback(
    (field, value, replaceArray = false) => {
      setFormData((prev) => {
        const current = prev[field];
        // If replaceArray is true, replace the entire array with the new value
        const updated = replaceArray
          ? value
          : current.includes(value)
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
    },
    []
  );

  const handleTimeSlotsChange = useCallback((newTimeSlots) => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: newTimeSlots,
    }));
  }, []);

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

  // --- CORE VALIDATION LOGIC (Omitted for brevity, assuming it's correct from the prompt) ---
  const validateFormFields = useCallback((data) => {
    const errors = {};

    const requiredFields = {
      1: [
        "name",
        "dateOfBirth",
        "gender",
        "primaryMobile",
        "language",
        "pCountry",
        "pState",
        "pCity",
        "pPincode",
        "pArea",
        "pBuilding",
        "pBlock",
        "eName",
        "eMobile",
        "eRelation",
      ],
      2: ["collegeName", "qualification", "institute"],
      3: ["registerAs"],
      5: ["profileImage", "introVideo", "teaching_philosophy", "video_url"],
      6: ["startTime", "endTime", "responseTime"],
      7: [], // handled conditionally below
      8: ["confirmAccurate", "ethicalStandards", "serviceMindset", "signature"],
    };

    let fields = requiredFields[step] || [];

    // Step 1-8: required fields
    (requiredFields[step] || []).forEach((field) => {
      if (isEmpty(data[field]))
        errors[field] = `${FIELD_LABELS[field]} is required.`;
    });

    // Step 1: current address if different
    if (step === 1 && !isCurrentSameAsPermanent) {
      [
        "cCountry",
        "cState",
        "cCity",
        "cPincode",
        "cArea",
        "cBuilding",
        "cBlock",
      ].forEach((f) => {
        if (isEmpty(data[f])) errors[f] = `${FIELD_LABELS[f]} is required.`;
      });
    }

    // Regex validations
    if (step === 1) {
      if (data.email) {
        const isNormalEmail = REGEX.email.test(data.email);
        const isYopmail = REGEX.yopmail.test(data.email);

        if (!isNormalEmail && !isYopmail) {
          errors.email = "Invalid email";
        }
      }

      if (data.dateOfBirth) {
        const today = new Date();
        const dob = new Date(data.dateOfBirth);

        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < dob.getDate())
        ) {
          age--;
        }

        if (age < 18) {
          errors.dateOfBirth = "You must be at least 18 years old";
        }
      }
    }

    if (step === 3) {
      const isIndia = data.pCountry === "india";
      const isIndividual = data.registerAs === "individual";
      const isBusiness = data.registerAs === "business";

      if (isIndia) {
        if (!data.panCard) errors.panCard = "PAN number is required";
        if (!data.aadharNo) errors.aadharNo = "Aadhaar number is required";
        if (isBusiness && !data.gstin) errors.gstin = "GST number is required";
      }

      if (!isIndia && !isIndividual) {
        if (!data.taxIdentification)
          errors.taxIdentification = "Tax Identification Number is required";
      }
    }
    if (step === 4) {
      [
        "instagram_link",
        "facebook_link",
        "linkdin_link",
        "youtube_link",
        "instructor_website",
      ].forEach((f) => {
        if (data[f]?.trim() && !REGEX.url.test(data[f].trim()))
          errors[f] = "Invalid URL";
      });
    }
    if (step === 5) {
      if (!data.yoga_style?.length)
        errors.yoga_style = "Select at least one Yoga Style";
      if (!data.certifications?.length)
        errors.certifications = "Add at least one certification";
      const videos = data.video_url?.filter((v) => v.trim()) || [];
      if (videos.length < 2)
        errors.video_url = "Minimum two sample videos required";
      data.video_url?.forEach((v, i) => {
        if (v.trim() && !REGEX.url.test(v))
          errors[`video_url[${i}]`] = `Video ${i + 1} is invalid`;
      });
      if (data.introVideo && !REGEX.url.test(data.introVideo))
        errors.introVideo = "Invalid video URL";
    }

    // Step 6: class selection
    if (
      step === 6 &&
      !data.availablePrivateClass &&
      !data.availableGroupClass &&
      !data.availableOnlineClass
    )
      errors.classType = "Select at least one class type";
    if (step === 6 && !data.days?.length)
      errors.days = "Select at least one teaching day";
    // if (step === 6 && !data.times?.length)
    //   errors.times = "Select at least one class time";

    // Step 7: pricing
    if (step === 7) {
      [
        ["group_class_rate", "availableGroupClass"],
        ["private_class_rate", "availableOneOnOne"],
        ["single_class_rate", "singleClass"],
      ].forEach(([field, cond]) => {
        if (data[cond]) {
          if (isEmpty(data[field]))
            errors[field] = `${FIELD_LABELS[field]} is required`;
          else if (
            !REGEX.positiveNumber.test(data[field]) ||
            Number(data[field]) <= 0
          )
            errors[field] = `${FIELD_LABELS[field]} must be positive`;
        }
      });
      if (
        (data.availableGroupClass || data.availableOneOnOne) &&
        (!data.trialMode || data.trialMode === "none")
      )
        errors.trialMode = "Trial Policy is required";
    }

    return errors;
  });

  // --- END OF VALIDATION LOGIC ---
  const validateStep = () => {
    const fieldErrors = validateFormFields(formData);
    console.log("fieldErrors", fieldErrors);

    if (step === 3 && formData.registerAs) {
      const isIndia = formData.pCountry === "india";
      const isIndividual = formData.registerAs === "individual";
      const isBusiness = formData.registerAs === "business";

      // 🇮🇳 INDIA
      if (isIndia) {
        if (!formData.panCard) {
          fieldErrors.panCard = "PAN is required";
        } else if (!REGEX.pan.test(formData.panCard.toUpperCase())) {
          fieldErrors.panCard = "Invalid PAN format";
        }

        if (!formData.aadharNo) {
          fieldErrors.aadharNo = "Aadhaar number is required";
        } else if (!REGEX.aadhar.test(formData.aadharNo.replace(/\s/g, ""))) {
          fieldErrors.aadharNo = "Invalid Aadhaar number";
        }

        if (isBusiness) {
          if (!formData.GSTIN) {
            fieldErrors.GSTIN = "GST number is required";
          } else if (!REGEX.gstin.test(formData.GSTIN.replace(/\s/g, ""))) {
            fieldErrors.GSTIN = "Invalid GST number";
          }
        }
      }

      // 🌍 NON-INDIA
      if (!isIndia && isBusiness) {
        if (!formData.taxIdentification) {
          fieldErrors.taxIdentification = "Taxpayer ID is required";
        }
      }
    }
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

  const nextStep = (e) => {
    if (validateStep()) {
      //   // Uncomment for mandatory validation
      //   document
      //     .getElementById("form-content-area")
      //     ?.scrollTo({ top: 0, behavior: "smooth" });
      if (!validateStep()) return;
      handleSubmit(e);
    }
  };

  const prevStep = () => {
    setValidationErrors({});
    setTimeError(null);
    document
      .getElementById("form-content-area")
      ?.scrollTo({ top: 0, behavior: "smooth" });

    setStep((prevStep) => prevStep - 1);
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

  const buildPayloadByStep = (step, formData, extra = {}) => {
    const payload = {};
    const finalLanguages = formData?.language?.map((lang) =>
      lang === "Other" ? formData?.otherLanguage?.trim() : lang
    );
    STEP_FIELDS[step]?.forEach((key) => {
      if (key === "email") return;
      if (key === "panCard") return;
      if (key === "introVideo") return;
      if (key === "profileImage") return;
      if (formData[key] !== undefined) {
        payload[key] = formData[key];
      }
    });

    if (step === 1) {
      payload.countryCode = countryCode;
      payload.primaryMobile = mobileNumber;
      payload.secondMobile = SecondMobileNumber;
      payload.language = finalLanguages;
      payload.dateOfBirth = moment(formData.dateOfBirth).format("DD-MM-YYYY");
    }

    if (step === 3) {
      const isIndia = formData.pCountry === "india";
      const isIndividual = formData.registerAs === "individual";
      const isBusiness = formData.registerAs === "business";

      payload.registerAs = formData.registerAs;

      // Clear all tax fields first (prevents stale data bugs)
      delete payload.panCard;
      delete payload.aadharNo;
      delete payload.GSTIN;
      delete payload.taxIdentification;

      // 🇮🇳 INDIA
      if (isIndia) {
        // PAN always required in India
        payload.taxIdentification = formData.panCard;

        // Aadhaar only for India
        payload.aadharNo = formData.aadharNo;

        // GSTIN ONLY for business
        if (isBusiness) {
          payload.GSTIN = formData.GSTIN;
        }
      }

      // 🌍 NON-INDIA
      if (!isIndia) {
        // Only business requires tax ID
        payload.taxIdentification = formData.taxIdentification;
        // Individual + non-India → NOTHING sent
      }
    }

    if (step === 5) {
      payload.profile_image = "uploads/profile_123.jpg";
      payload.yoga_style = formData.yoga_style;
      payload.certificates = [
        {
          certificate_name: "test",
          file_url: "https://www.instagram.com/",
        },
        {
          certificate_name: "Prenatal Yoga Certification",
          file_url: "https://www.instagram.com/",
        },
      ];
      payload.video_url = formData.video_url;
    }

    return payload;
  };

  const buildClassAvailabilityPayload = (formData) => {
    // 1️⃣ Build class types
    const classTypes = [];
    if (formData.availableGroupClass) classTypes.push("GROUP");
    if (formData.availablePrivateClass) classTypes.push("PRIVATE");
    if (formData.availableOnlineClass) classTypes.push("ONLINE");

    // 2️⃣ Convert response time ("6h" → 6)
    const responseTimeHours = parseInt(formData.responseTime, 10) || 0;

    // 3️⃣ Build availability map
    const availability = {};

    Object.entries(formData.timeSlots || {}).forEach(([day, slots]) => {
      if (!slots?.length) return;

      const dayName = day.charAt(0).toUpperCase() + day.slice(1);
      availability[dayName] = [];

      slots.forEach((slot) => {
        classTypes.forEach((classKey) => {
          availability[dayName].push({
            class_key: classKey,
            start_time: slot.start || formData.startTime, // fallback if slot.start is empty
            end_time: slot.end || formData.endTime, // fallback if slot.end is empty
          });
        });
      });
    });

    // 4️⃣ Final payload
    return {
      class_availability: [
        {
          class_types: classTypes,
          response_time_hours: responseTimeHours,
          availability,
        },
      ],
    };
  };

  // --- MODIFIED SUBMISSION HANDLER: Opens Dialog ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload;
    if (step === 6) {
      payload = buildClassAvailabilityPayload(formData);
    } else if (step === 7) {
      payload = {
        pricing_agreement: {
          group_class_rate: Number(formData.group_class_rate) || 0,
          private_class_rate: Number(formData.private_class_rate) || 0,
          single_class_rate: Number(formData.single_class_rate) || 0,
          trial_period_days: 7,
          isAgree:
            !!formData.confirmAccurate &&
            !!formData.ethicalStandards &&
            !!formData.serviceMindset,
          signature: formData.signature || "",
        },
      };
    } else {
      payload = buildPayloadByStep(step, formData);
    }

    // Map step to corresponding async thunk
    const stepDispatchMap = {
      1: onboardingStepOne,
      2: onboardingStepTwo,
      3: onboardingStepThree,
      4: onboardingStepFour,
      5: onboardingStepFive,
      6: onboardingStepSixth,
      7: onboardingStepSeven,
    };

    const stepThunk = stepDispatchMap[step];

    if (!stepThunk) {
      // toast.error("Invalid step!");
      return;
    }

    try {
      const res = await dispatch(stepThunk(payload)).unwrap();

      if (res.status === 200) {
        if (step < totalSteps) {
          setStep((prev) => prev + 1); // ✅ SAFE
        }
        if (step === 7) {
          setShowSuccessDialog(true);
          toast.success(res.message || `User Onboarding successfully!`);
        }
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };
  // --- NEW: Final Accept Handler ---
  const handleFinalAccept = () => {
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
  const isPrivateSelected = formData.availablePrivateClass;
  const isOnlineSelected = formData.availableOnlineClass;

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
                  setFormData={setFormData}
                  defaultOnboardingStep={defaultOnboardingStep}
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
                  setFormData={setFormData}
                  handleChange={handleChange}
                  setProfileImagePreview={setProfileImagePreview}
                  validationErrors={validationErrors}
                  handleArrayToggle={handleArrayToggle}
                  handleCertChange={handleCertChange}
                  profileImagePreview={profileImagePreview}
                  addCertification={addCertification}
                  addSampleVideo={addSampleVideo}
                  handleSampleVideoChange={handleSampleVideoChange}
                  removeCertification={removeCertification}
                  removeSampleVideo={removeSampleVideo}
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
                  handleTimeSlotsChange={handleTimeSlotsChange}
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
                  isOnlineSelected={isOnlineSelected}
                  trialOptions={trialOptions}
                />
              )}

              {/* FINAL STEP: VERIFICATION PENDING */}
              {isSubmitted && (
                <div className="flex flex-col items-center justify-center text-center h-full py-10 animate-in zoom-in-95">
                  <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-xl">
                    <FaShieldAlt size={40} />
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
                    onClick={() => router.push("/verification")}
                    className="text-white cursor-pointer bg-teal-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-teal-700 transition-colors"
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
          <OnboardingFooter
            prevStep={prevStep}
            nextStep={nextStep}
            step={step}
            saveStatus={saveStatus}
            saveDraft={saveDraft}
            totalSteps={totalSteps}
            formData={formData}
            saveButtonText={saveButtonText}
            handleSubmit={handleSubmit}
          />
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
