import Input from '@/components/common/Input';
import Selector from '@/components/common/Selector';
import SmartSelect from '@/components/common/SmartSelect';
import TextArea from '@/components/common/TextArea';
import PhoneInput from '@/components/common/PhoneInput';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
// These icons are kept here as they are directly imported from 'react-icons/bi' in your first prompt
import {
    BiCalendar, BiFile, BiLogoFacebook, BiLogoInstagram, BiMaleSign,
    BiPlusCircle, BiShield, BiSolidIdCard, BiTrash, BiUser,
    BiVideo, BiSave, BiSolidGraduation, BiChevronLeft, BiChevronRight,
    BiWorld, BiAlarm, BiLink
} from 'react-icons/bi';

// Icon Mapping
const FaCheckCircle = BiSave; // Using BiSave for checkmark style completion
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

// Mock Components (assuming these are correctly imported/defined elsewhere)
const SectionHeader = ({ title, subtitle, className = "" }) => <div className={`mb-6 border-b border-slate-100 pb-2 ${className}`}> <h2 className="text-xl font-bold text-teal-900">{title}</h2> {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>} </div>;
const Label = ({ children, required }) => (<label className="mb-1 block text-sm font-medium text-gray-700">{children} {required && <span className="text-teal-600">*</span>}</label>);
const CheckboxToggle = ({ label, name, checked, onChange }) => (
    <div className={`mb-4 flex items-center justify-between rounded-lg border p-3 transition-colors ${checked ? 'border-teal-400 bg-teal-50' : 'border-gray-300 bg-white'}`}>
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <input type="checkbox" name={name} checked={checked} onChange={onChange} className="h-4 w-4 text-teal-600" />
    </div>
);
const StepIndicator = ({ currentStep, totalSteps }) => {
    // Retaining original StepIndicator implementation
    const steps = useMemo(() => [
        { id: 1, label: "Personal & Contact", icon: FaUser },
        { id: 2, label: "Education", icon: FaGraduationCap },
        { id: 3, label: "Taxation", icon: FaIdCard },
        { id: 4, label: "Socials & Videos", icon: FaVideo },
        { id: 5, label: "Qualifications", icon: FaFileAlt },
        { id: 6, label: "Availability", icon: FaCalendarAlt },
        { id: 7, label: "Pricing", icon: FaDollarSign },
        { id: 8, label: "Agreements", icon: FaSignature },
    ], []);

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
                    const isVisibleOnMobile = s.id % 2 === 1 || s.id === totalSteps || isActive;

                    return (
                        <div key={s.id} className={`flex flex-col items-center group relative bg-white p-1 rounded-full ${!isVisibleOnMobile && 'hidden sm:flex'}`}>
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive ? 'border-teal-600 text-teal-600 shadow-lg scale-110 bg-white' : isCompleted ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-200 text-slate-300 bg-white'}`}>
                                {isCompleted ? <FaCheckCircle size={14} /> : <Icon size={14} />}
                            </div>
                            <span className={`absolute top-12 text-[10px] font-medium whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-teal-600 opacity-100' : 'text-slate-400 opacity-0'} hidden md:block`}>{s.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const useRouter = () => ({ push: (path) => console.log(`Simulating navigation to: ${path}`) });
const isTimeSlotValid = (start, end) => {
    if (!start || !end) return true;
    const [startH, startM] = start.split(':').map(Number);
    let [endH, endM] = end.split(':').map(Number);
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
/* --- MAIN COMPONENT: InstructorOnboarding --- */
/* -------------------------------------------------------------------------- */

const InstructorOnboarding = () => {
    const totalSteps = 8;
    const DRAFT_KEY = 'instructorOnboardingDraft';
    const [step, setStep] = useState(1); // Start at Step 1
    const router = useRouter();
    const [isCurrentSameAsPermanent, setIsCurrentSameAsPermanent] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);
    const [timeError, setTimeError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    // Added: languages, instructorWebsite, responseTime, registrationType
    const initialFormData = useMemo(() => ({
        fullName: "", dob: "", gender: "", email: "", phone: "", alternatePhone: "",
        permanentCountry: "", permanentState: "", permanentCity: "", permanentPincode: "", permanentArea: "", permanentBuilding: "", permanentBlock: "",
        currentCountry: "", currentState: "", currentCity: "", currentPincode: "", currentArea: "", currentBuilding: "", currentBlock: "",
        emergencyName: "", emergencyPhone: "", emergencyRelation: "",
        languages: [], // Existing Field
        schoolCollege: "", degreeName: "", universityName: "",
        registrationType: "individual", // Existing Field: default to individual
        panCard: "", aadharNumber: "", gstin: "",
        socialFb: "", socialLi: "", socialInsta: "", socialYt: "",
        instructorWebsite: "", // Existing Field
        profileImage: null, // [NEW FIELD]
        certifications: [{ title: "", file: null }],
        yogaStyles: [],
        introVideo: "", sampleVideos: ["", ""],
        philosophy: "",
        days: [], times: [], startTime: "07:00", endTime: "12:00",
        responseTime: "", // Existing Field
        availableOneOnOne: false,
        availableGroupClass: false,
        singleClass: false,
        groupRate: "", privateRate: "", singleClassRate: "", trialMode: "",
        confirmAccurate: false, ethicalStandards: false, serviceMindset: false, signature: "",
    }), []);

    const [formData, setFormData] = useState(initialFormData);

    // --- EFFECT TO LOAD DRAFT DATA ---
    useEffect(() => {
        const draft = localStorage.getItem(DRAFT_KEY);
        if (draft) {
            try {
                const draftData = JSON.parse(draft);
                // Merge draft data with initial data, providing fallbacks for arrays
                setFormData(prev => ({
                    ...prev,
                    ...draftData,
                    // Do not load actual File objects (profileImage and cert.file) from localStorage
                    profileImage: null, // Reset as File object cannot be stored
                    certifications: (draftData.certifications || [{ title: "", file: null }]).map(cert => ({ ...cert, file: null })),
                    sampleVideos: draftData.sampleVideos || ["", ""],
                    yogaStyles: draftData.yogaStyles || [],
                    days: draftData.days || [],
                    times: draftData.times || [],
                    languages: draftData.languages || [],
                }));
                if (draftData.isCurrentSameAsPermanent) {
                    setIsCurrentSameAsPermanent(true);
                }
            } catch (error) {
                console.error("Failed to parse draft data:", error);
            }
        }
    }, [initialFormData]);


    // --- HANDLERS ---

    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;

        setValidationErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });

        if (type === 'checkbox') {
            setFormData(prev => {
                const updatedData = { ...prev, [name]: checked };

                // Logic for trialMode dependent on class availability
                if (name === 'availableOneOnOne' || name === 'availableGroupClass') {
                    if (!updatedData.availableOneOnOne && !updatedData.availableGroupClass) {
                        updatedData.trialMode = 'none';
                    } else if (updatedData.trialMode === 'none' || updatedData.trialMode === '') {
                        // Auto-select a default trial if one is now available
                        updatedData.trialMode = updatedData.availableOneOnOne ? '1private' : updatedData.availableGroupClass ? '2group' : '';
                    }
                }
                return updatedData;
            });
            return;
        }

        if (type === 'file') {
            // [MODIFIED] Handles file input for both profileImage and certification files
            setFormData(prev => ({ ...prev, [name]: e.target.files[0] }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleArrayToggle = useCallback((field, value) => {
        setFormData(prev => {
            const current = prev[field];
            const updated = current.includes(value) ? current.filter(i => i !== value) : [...current, value];

            setValidationErrors(v => {
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
        setFormData(prev => {
            const updated = [...prev.certifications];
            updated[index][field] = file || value;
            setValidationErrors(v => {
                const newErrors = { ...v };
                delete newErrors[`certifications[${index}].${field}`];
                return newErrors;
            });
            return { ...prev, certifications: updated };
        });
    }, []);

    const addCertification = () => formData.certifications.length < 10 && setFormData(prev => ({ ...prev, certifications: [...prev.certifications, { title: "", file: null }] }));
    const removeCertification = (index) => setFormData(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== index) }));

    const handleSampleVideoChange = useCallback((index, value) => {
        setFormData(prev => {
            const updated = [...prev.sampleVideos];
            updated[index] = value;
            setValidationErrors(v => {
                const newErrors = { ...v };
                delete newErrors[`sampleVideos[${index}]`];
                return newErrors;
            });
            return { ...prev, sampleVideos: updated };
        });
    }, []);
    const addSampleVideo = () => formData.sampleVideos.length < 10 && setFormData(prev => ({ ...prev, sampleVideos: [...prev.sampleVideos, ""] }));
    const removeSampleVideo = (index) => formData.sampleVideos.length > 2 && setFormData(prev => ({ ...prev, sampleVideos: prev.sampleVideos.filter((_, i) => i !== index) }));

    const handleSameAsPermanentToggle = (e) => {
        const isChecked = e.target.checked;
        setIsCurrentSameAsPermanent(isChecked);
        if (isChecked) {
            setFormData(prev => ({
                ...prev,
                currentCountry: prev.permanentCountry, currentState: prev.permanentState, currentCity: prev.permanentCity,
                currentPincode: prev.permanentPincode, currentArea: prev.permanentArea, currentBuilding: prev.permanentBuilding, currentBlock: prev.permanentBlock,
            }));
            setValidationErrors(v => {
                const keysToRemove = ['currentCountry', 'currentState', 'currentCity', 'currentPincode', 'currentArea', 'currentBuilding', 'currentBlock'];
                const newErrors = { ...v };
                keysToRemove.forEach(key => delete newErrors[key]);
                return newErrors;
            });
        } else {
            setFormData(prev => ({
                ...prev,
                currentCountry: "", currentState: "", currentCity: "", currentPincode: "", currentArea: "", currentBuilding: "", currentBlock: "",
            }));
        }
    };

    // --- CORE VALIDATION LOGIC ---

    const validateFormFields = useCallback((stepData) => {
        const errors = {};
        const urlRegex = /^(ftp|http|https):\/\/[^ "\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        const aadharRegex = /^\d{4}\s?\d{4}\s?\d{4}$/;
        const positiveNumberRegex = /^\d+(\.\d+)?$/;

        const validateRequired = (field, message) => {
            if (!stepData[field] || (typeof stepData[field] === 'string' && stepData[field].trim() === '') || (Array.isArray(stepData[field]) && stepData[field].length === 0)) {
                errors[field] = message;
            }
        };

        if (step === 1) {
            validateRequired('fullName', 'Full Name is required.');
            validateRequired('dob', 'Date of Birth is required.');
            validateRequired('gender', 'Gender is required.');
            if (stepData.email && !emailRegex.test(stepData.email)) {
                errors.email = 'Please enter a valid email address.';
            } else {
                validateRequired('email', 'Email is required.');
            }
            validateRequired('phone', 'Primary Phone Number is required.');
            validateRequired('languages', 'Please select at least one language.');

            validateRequired('permanentCountry', 'Permanent Country is required.');
            validateRequired('permanentState', 'Permanent State is required.');
            validateRequired('permanentCity', 'Permanent City is required.');
            validateRequired('permanentPincode', 'Permanent Pincode is required.');
            validateRequired('permanentArea', 'Permanent Area is required.');
            validateRequired('permanentBuilding', 'Permanent Building Name is required.');
            validateRequired('permanentBlock', 'Permanent Block/Door No. is required.');

            if (!isCurrentSameAsPermanent) {
                validateRequired('currentCountry', 'Current Country is required.');
                validateRequired('currentState', 'Current State is required.');
                validateRequired('currentCity', 'Current City is required.');
                validateRequired('currentPincode', 'Current Pincode is required.');
                validateRequired('currentArea', 'Current Area is required.');
                validateRequired('currentBuilding', 'Current Building Name is required.');
                validateRequired('currentBlock', 'Current Block/Door No. is required.');
            }

            validateRequired('emergencyName', 'Emergency Contact Name is required.');
            validateRequired('emergencyPhone', 'Emergency Phone Number is required.');
            validateRequired('emergencyRelation', 'Relationship is required.');

        } else if (step === 2) {
            validateRequired('schoolCollege', 'School/College Name is required.');
            validateRequired('degreeName', 'Degree/Qualification is required.');
            validateRequired('universityName', 'University/Institution Name is required.');

        } else if (step === 3) {
            validateRequired('registrationType', 'Registration Type is required.');
            validateRequired('panCard', 'PAN Card Number is required.');
            if (stepData.panCard && !panRegex.test(stepData.panCard.toUpperCase())) {
                errors.panCard = 'Invalid PAN format. Example: ABCDE1234F';
            }
            validateRequired('aadharNumber', 'Aadhaar Card Number is required.');
            if (stepData.aadharNumber && !aadharRegex.test(stepData.aadharNumber.trim().replace(/\s/g, ''))) {
                errors.aadharNumber = 'Invalid Aadhaar format. Must be 12 digits.';
            }
            // GSTIN validation is not strict as it is optional

        } else if (step === 4) { // Socials & Videos
            const checkUrl = (field, label) => {
                if (stepData[field] && stepData[field].trim() !== "" && !urlRegex.test(stepData[field].trim())) {
                    errors[field] = `Please enter a valid URL for ${label}.`;
                }
            };
            checkUrl('socialInsta', 'Instagram');
            checkUrl('socialFb', 'Facebook');
            checkUrl('socialLi', 'LinkedIn');
            checkUrl('socialYt', 'YouTube');
            checkUrl('instructorWebsite', 'Instructor Website');

        } else if (step === 5) { // Qualifications (Styles, Certs, Videos, Philosophy)
            validateRequired('profileImage', 'Profile Image is required.'); // [NEW VALIDATION]

            if (stepData.yogaStyles.length === 0) {
                errors.yogaStyles = 'Please select at least one Yoga Style.';
            }

            if (stepData.certifications.length === 0) {
                errors.certifications = 'Please add at least one certification.';
            } else {
                const firstCert = stepData.certifications[0];
                if (!firstCert.title.trim()) {
                    errors['certifications[0].title'] = 'Title is required for the first certification.';
                }
                // File upload cannot be reliably validated in this mock setup, but the error handling is structured.
                if (!firstCert.file) {
                    errors['certifications[0].file'] = 'File upload is required for the first certification.';
                }
            }

            validateRequired('introVideo', 'Introduction Video URL is required.');
            if (stepData.introVideo && !urlRegex.test(stepData.introVideo.trim())) {
                errors.introVideo = 'Please enter a valid URL.';
            }

            const filledSampleVideos = stepData.sampleVideos.filter(v => v.trim() !== '');
            if (filledSampleVideos.length < 2) {
                errors.sampleVideos = 'A minimum of two Sample Video URLs are required.';
                if (!stepData.sampleVideos[0] || !stepData.sampleVideos[0].trim()) errors[`sampleVideos[0]`] = `Video URL 1 is required.`;
                if (!stepData.sampleVideos[1] || !stepData.sampleVideos[1].trim()) errors[`sampleVideos[1]`] = `Video URL 2 is required.`;
            }

            stepData.sampleVideos.forEach((video, index) => {
                if (video.trim() && !urlRegex.test(video.trim())) {
                    errors[`sampleVideos[${index}]`] = `Video URL ${index + 1} is invalid.`;
                }
            });

            validateRequired('philosophy', 'Teaching Philosophy is required.');

        } else if (step === 6) { // Availability
            if (!stepData.availableOneOnOne && !stepData.availableGroupClass) {
                errors.classType = 'Please select at least one class type.';
            }
            if (stepData.days.length === 0) {
                errors.days = 'Please select at least one preferred teaching day.';
            }
            if (stepData.times.length === 0) {
                errors.times = 'Please select at least one preferred class time.';
            }
            validateRequired('startTime', 'Start Time is required.');
            validateRequired('endTime', 'End Time is required.');
            validateRequired('responseTime', 'Response Time is required.');

        } else if (step === 7) { // Pricing
            if (stepData.availableGroupClass) {
                validateRequired('groupRate', 'Group Class Rate is required.');
                if (stepData.groupRate && (!positiveNumberRegex.test(stepData.groupRate) || Number(stepData.groupRate) <= 0)) {
                    errors.groupRate = 'Rate must be a positive number.';
                }
            }
            if (stepData.availableOneOnOne) {
                validateRequired('privateRate', 'Private Session Rate is required.');
                if (stepData.privateRate && (!positiveNumberRegex.test(stepData.privateRate) || Number(stepData.privateRate) <= 0)) {
                    errors.privateRate = 'Rate must be a positive number.';
                }
            }

            if (stepData.singleClass) {
                validateRequired('singleClass', 'single Class Rate is required.');
                if (stepData.singleClass && (!positiveNumberRegex.test(stepData.singleClass) || Number(stepData.singleClass) <= 0)) {
                    errors.singleClass = 'Rate must be a positive number.';
                }
            }
            if (stepData.availableGroupClass || stepData.availableOneOnOne) {
                if (!stepData.trialMode || stepData.trialMode === 'none') {
                    errors.trialMode = 'Trial Policy is required.';
                }
            }


        } else if (step === 8) { // Agreements
            if (!stepData.confirmAccurate) errors.confirmAccurate = 'Agreement is required.';
            if (!stepData.ethicalStandards) errors.ethicalStandards = 'Agreement is required.';
            if (!stepData.serviceMindset) errors.serviceMindset = 'Agreement is required.';
            validateRequired('signature', 'Digital Signature is required.');
        }

        return errors;
    }, [step, isCurrentSameAsPermanent]);

    const validateStep = () => {
        const fieldErrors = validateFormFields(formData);

        let customError = null;
        if (step === 6 && formData.startTime && formData.endTime) {
            const isValidTime = isTimeSlotValid(formData.startTime, formData.endTime);
            if (!isValidTime) {
                customError = "Your total available window cannot exceed 5 hours. Please adjust Start/End Time.";
                fieldErrors.startTime = fieldErrors.startTime || customError;
                fieldErrors.endTime = fieldErrors.endTime || customError;
            }
        }
        setTimeError(customError);

        if (Object.keys(fieldErrors).length > 0) {
            setValidationErrors(fieldErrors);
            document.getElementById('form-content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
            return false;
        }

        setValidationErrors({});
        return true;
    };

    const nextStep = () => {
        // Uncomment the below line to enable mandatory validation before advancing
        // if (validateStep()) {
        //     document.getElementById('form-content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(prev => Math.min(prev + 1, totalSteps));
        // }
    };

    const prevStep = () => {
        setValidationErrors({});
        setTimeError(null);
        document.getElementById('form-content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep()) {
            console.log("Final Submission Data:", formData);
            localStorage.removeItem(DRAFT_KEY);
            setStep(totalSteps + 1);
            // In a real app, this is where you'd call the API to submit the final data
        }
    };

    const handleSaveDraft = useCallback(async () => {
        setSaveStatus('saving');
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            // NOTE: Files (cert.file, profileImage) cannot be stored in localStorage. We store the title/URL and skip the file object itself.
            const draftToSave = {
                ...formData,
                profileImage: null, // Do not save actual File objects to localStorage
                certifications: formData.certifications.map(cert => ({
                    title: cert.title,
                    file: null // Do not save actual File objects to localStorage
                })),
                isCurrentSameAsPermanent: isCurrentSameAsPermanent,
            };

            localStorage.setItem(DRAFT_KEY, JSON.stringify(draftToSave));
            setSaveStatus('saved');
        } catch (error) {
            setSaveStatus('error');
            console.error("Error saving draft:", error);
        }
        setTimeout(() => setSaveStatus(null), 3000);

    }, [formData, isCurrentSameAsPermanent]);

    const isSubmitted = step === totalSteps + 1;
    const isGroupSelected = formData.availableGroupClass;
    const isPrivateSelected = formData.availableOneOnOne;
    const isSingleSelected = formData.singleClass;


    const saveButtonText = useMemo(() => {
        switch (saveStatus) {
            case 'saving': return 'Saving...';
            case 'saved': return 'Draft Saved! ✓';
            case 'error': return 'Save Failed! ❌';
            default: return 'Save as Draft'
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
        if (isSingleSelected) {
            options.push({ label: "No Free Trial", value: "nofreetrial" });
        }
        options.push({ label: "No Trial", value: "none" });
        return options;
    }, [isPrivateSelected, isGroupSelected]);

    return (
        <div className="h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-2 md:p-6 font-sans text-slate-800 overflow-hidden">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-screen h-full md:h-auto md:min-h-[650px]">

                {/* HEADER */}
                <div className="flex-none px-4 py-6 md:px-10 border-b border-slate-100 bg-white rounded-t-3xl z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div><h1 className="text-2xl md:text-3xl font-bold text-teal-900">Yogalink Instructor</h1><p className="text-slate-500 text-sm">Join the collective.</p></div>
                        <div className="text-right hidden sm:block"><span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase">{isSubmitted ? "Complete" : `Step ${step} of ${totalSteps}`}</span></div>
                    </div>

                    {!isSubmitted && <StepIndicator currentStep={step} totalSteps={totalSteps} />}
                </div>

                {/* SCROLLABLE CONTENT */}
                <div id="form-content-area" className="flex-1 overflow-y-auto px-6 py-6 md:px-12 scroll-smooth custom-scrollbar">

                    <form id="onboarding-form" onSubmit={handleSubmit} className="max-w-4xl mx-auto min-h-full">
                        <div className={`transition-opacity duration-300 ease-out ${isSubmitted ? 'opacity-100' : 'opacity-100'} pb-4`}>

                            {/* STEP 1: PERSONAL, ADDRESS, EMERGENCY CONTACT, LANGUAGES */}
                            {step === 1 && (
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <SectionHeader title="1. Basic Personal Details" subtitle="Required for identification and communication." />
                                        <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Your full legal name" error={validationErrors.fullName} />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required error={validationErrors.dob} />
                                            <Selector label="Gender" name="gender" options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }, { label: "Other", value: "other" }]} value={formData.gender} onChange={handleChange} required placeholder="Select Gender" error={validationErrors.gender} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com" error={validationErrors.email} />
                                            <PhoneInput label="Primary Phone Number" name="phone" value={formData.phone} onChange={handleChange} required placeholder="98765 43210" error={validationErrors.phone} />
                                        </div>
                                        <PhoneInput label="Alternate Phone Number (Optional)" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} required={false} placeholder="Optional contact number" error={validationErrors.alternatePhone} />

                                        {/* New Field: Languages Spoken */}
                                        <SmartSelect
                                            label="Languages Spoken (Required)"
                                            name="languages"
                                            options={["English", "Hindi", "Sanskrit", "Tamil", "Telugu", "Kannada", "Malayalam", "Gujarati", "Marathi", "Bengali", "Other"]}
                                            selectedValues={formData.languages}
                                            onToggle={(val) => handleArrayToggle('languages', val)}
                                            required
                                            error={validationErrors.languages}
                                            className="pt-4"
                                            icon={<BiWorldIcon className="text-teal-600 mr-2" />}
                                        />
                                    </div>

                                    <div className="space-y-6 pt-4">
                                        <SectionHeader title="2. Permanent & Current Address" subtitle="Ensure addresses are accurate for legal and tax purposes." className="mt-6" />

                                        {/* Permanent Address */}
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                            <h4 className="text-md font-bold text-teal-900 mb-3 flex items-center"><FaRoad className="mr-2 text-teal-600" size={14} /> Permanent Address</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <Selector label="Country" name="permanentCountry" options={[{ label: "India", value: "india" }, { label: "USA", value: "usa" }, { label: "UK", value: "uk" }, { label: "Other", value: "other" }]} value={formData.permanentCountry} onChange={handleChange} required placeholder="Select Country" error={validationErrors.permanentCountry} />
                                                <Input label="State" name="permanentState" value={formData.permanentState} onChange={handleChange} required error={validationErrors.permanentState} />
                                                <Input label="City" name="permanentCity" value={formData.permanentCity} onChange={handleChange} required error={validationErrors.permanentCity} />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                                <Input label="Pincode / Zip" name="permanentPincode" value={formData.permanentPincode} onChange={handleChange} required error={validationErrors.permanentPincode} />
                                                <Input label="Area" name="permanentArea" value={formData.permanentArea} onChange={handleChange} required error={validationErrors.permanentArea} />
                                                <Input label="Building Name" name="permanentBuilding" value={formData.permanentBuilding} onChange={handleChange} required error={validationErrors.permanentBuilding} />
                                            </div>
                                            <div className="mt-4">
                                                <Input label="Block / Door No." name="permanentBlock" value={formData.permanentBlock} onChange={handleChange} required error={validationErrors.permanentBlock} />
                                            </div>
                                        </div>

                                        {/* Current Address */}
                                        <div className="p-4 bg-white rounded-xl border border-slate-200">
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="text-md font-bold text-teal-900 flex items-center"><FaMapMarkerAlt className="mr-2 text-teal-600" size={14} /> Current Address</h4>
                                                <div className="flex items-center">
                                                    <input type="checkbox" id="sameAsPermanent" checked={isCurrentSameAsPermanent} onChange={handleSameAsPermanentToggle} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                                    <label htmlFor="sameAsPermanent" className="ml-2 text-sm text-slate-600 font-medium">Same as Permanent</label>
                                                </div>
                                            </div>
                                            <fieldset disabled={isCurrentSameAsPermanent} className={isCurrentSameAsPermanent ? 'opacity-60' : 'opacity-100'}>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <Selector label="Country" name="currentCountry" options={[{ label: "India", value: "india" }, { label: "USA", value: "usa" }, { label: "UK", value: "uk" }, { label: "Other", value: "other" }]} value={formData.currentCountry} onChange={handleChange} required={!isCurrentSameAsPermanent} placeholder="Select Country" disabled={isCurrentSameAsPermanent} error={validationErrors.currentCountry} />
                                                    <Input label="State" name="currentState" value={formData.currentState} onChange={handleChange} required={!isCurrentSameAsPermanent} disabled={isCurrentSameAsPermanent} error={validationErrors.currentState} />
                                                    <Input label="City" name="currentCity" value={formData.currentCity} onChange={handleChange} required={!isCurrentSameAsPermanent} disabled={isCurrentSameAsPermanent} error={validationErrors.currentCity} />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                                    <Input label="Pincode / Zip" name="currentPincode" value={formData.currentPincode} onChange={handleChange} required={!isCurrentSameAsPermanent} disabled={isCurrentSameAsPermanent} error={validationErrors.currentPincode} />
                                                    <Input label="Area" name="currentArea" value={formData.currentArea} onChange={handleChange} required={!isCurrentSameAsPermanent} disabled={isCurrentSameAsPermanent} error={validationErrors.currentArea} />
                                                    <Input label="Building Name" name="currentBuilding" value={formData.currentBuilding} onChange={handleChange} required={!isCurrentSameAsPermanent} disabled={isCurrentSameAsPermanent} error={validationErrors.currentBuilding} />
                                                </div>
                                                <div className="mt-4">
                                                    <Input label="Block / Door No." name="currentBlock" value={formData.currentBlock} onChange={handleChange} required={!isCurrentSameAsPermanent} disabled={isCurrentSameAsPermanent} error={validationErrors.currentBlock} />
                                                </div>
                                            </fieldset>
                                        </div>

                                        {/* Section 1.3: Emergency Contact */}
                                        <div className="space-y-6 pt-4">
                                            <SectionHeader title="3. Emergency Contact" subtitle="In case of urgent issues, who should we contact?" className="mt-6" />
                                            <div className="p-6 bg-red-50 rounded-xl border border-red-200 space-y-4">
                                                <Input label="Full Name" name="emergencyName" value={formData.emergencyName} onChange={handleChange} required placeholder="Emergency Contact Full Name" error={validationErrors.emergencyName} />
                                                <PhoneInput label="Phone Number" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} required placeholder="98765 43210" error={validationErrors.emergencyPhone} />
                                                <Input label="Relationship" name="emergencyRelation" value={formData.emergencyRelation} onChange={handleChange} required placeholder="e.g., Spouse, Parent, Sibling" error={validationErrors.emergencyRelation} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: EDUCATION DETAILS */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <SectionHeader title="Education Details" subtitle="Your highest educational background." />
                                    <Input label="School / College Name" name="schoolCollege" value={formData.schoolCollege} onChange={handleChange} required error={validationErrors.schoolCollege} />
                                    <Input label="Degree / Qualification Name" name="degreeName" value={formData.degreeName} onChange={handleChange} required placeholder="e.g., Master of Arts in Yoga" error={validationErrors.degreeName} />
                                    <Input label="University / Institution Name" name="universityName" value={formData.universityName} onChange={handleChange} required error={validationErrors.universityName} />
                                </div>
                            )}

                            {/* STEP 3: TAXATION DETAILS (India Only) */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <SectionHeader title="Taxation Details" subtitle="Required for compliant payouts. Currently focused on Indian Tax IDs." />
                                    <div className="p-6 rounded-xl border border-orange-300 bg-orange-50 transition-all duration-300 ">
                                        <div className="space-y-4 animate-in fade-in">
                                            <div className="flex items-center gap-2 mb-2 text-orange-800 font-semibold text-sm">
                                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                                Indian Tax Residency Required for PAN/Aadhaar
                                            </div>
                                            {/* New Field: Registration Type */}
                                            <Selector
                                                label="Register As"
                                                name="registrationType"
                                                options={[{ label: "Individual (PAN/Aadhaar)", value: "individual" }, { label: "Business (GSTIN/Foreign ID)", value: "business" }]}
                                                value={formData.registrationType}
                                                onChange={handleChange}
                                                required
                                                error={validationErrors.registrationType}
                                                placeholder="Select Registration Type"
                                            />

                                            <Input label="PAN Card Number" name="panCard" placeholder="ABCDE1234F" value={formData.panCard} onChange={handleChange} required error={validationErrors.panCard} />
                                            <Input label="Aadhaar Card Number" name="aadharNumber" placeholder="1234 5678 9012" value={formData.aadharNumber} onChange={handleChange} required error={validationErrors.aadharNumber} />
                                            <Input label="GSTIN" name="gstin" placeholder="22AAAAA0000A1Z5" value={formData.gstin} onChange={handleChange} required={false} error={validationErrors.gstin} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: SOCIAL MEDIA DETAILS & INSTRUCTOR WEBSITE */}
                            {step === 4 && (
                                <div className="space-y-6">
                                    <SectionHeader title="Social Media Profiles & Website" subtitle="Connect your platforms to showcase your digital presence." />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input label="Instagram Link" name="socialInsta" prefix={<BiLogoInstagram className="text-pink-500" size={16} />} placeholder="https://instagram.com/user" value={formData.socialInsta} onChange={handleChange} required={false} error={validationErrors.socialInsta} />
                                        <Input label="Facebook Link" name="socialFb" prefix={<BiLogoFacebook className="text-blue-600" size={16} />} placeholder="https://facebook.com/profile" value={formData.socialFb} onChange={handleChange} required={false} error={validationErrors.socialFb} />
                                        <Input label="LinkedIn Link" name="socialLi" prefix={<BiMaleSign className="text-blue-700" size={16} />} placeholder="https://linkedin.com/in/profile" value={formData.socialLi} onChange={handleChange} required={false} error={validationErrors.socialLi} />
                                        <Input label="YouTube Channel Link" name="socialYt" prefix={<BiVideo className="text-red-600" size={16} />} placeholder="https://youtube.com/channel" value={formData.socialYt} onChange={handleChange} required={false} error={validationErrors.socialYt} />
                                    </div>
                                    {/* New Field: Instructor Website */}
                                    <Input label="Instructor Website (Optional)" name="instructorWebsite" prefix={<BiLinkIcon className="text-teal-600" size={16} />} placeholder="https://yourwebsite.com" value={formData.instructorWebsite} onChange={handleChange} required={false} error={validationErrors.instructorWebsite} />
                                </div>
                            )}

                            {/* STEP 5: QUALIFICATIONS & EXPERTISE (Styles, Certs, Videos, Philosophy) */}
                            {step === 5 && (
                                <div className="space-y-8">
                                    {/* Profile Image Upload [NEW SECTION] */}
                                    <div>
                                        <SectionHeader title="Profile Image & Yoga Expertise" subtitle="Upload a professional photo and select your teaching styles." />
                                        <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 mb-6">
                                            <Label required>Profile Image (250px X 250px Recommended)</Label>
                                            <input
                                                type="file"
                                                id="profileImage"
                                                name="profileImage"
                                                onChange={handleChange}
                                                className={`block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200 cursor-pointer rounded-xl ${validationErrors.profileImage ? 'border-red-500 border-2' : 'border-slate-300 border'}`}
                                                accept="image/*"
                                                required
                                            />
                                            {formData.profileImage && <p className="mt-2 text-xs text-slate-600">Selected: **{formData.profileImage.name}**</p>}
                                            {validationErrors.profileImage && <p className="mt-1 text-xs text-red-500">{validationErrors.profileImage}</p>}
                                        </div>
                                    </div>

                                    {/* Yoga Styles */}
                                    <div>
                                        <SmartSelect
                                            label="Yoga Styles (Required)"
                                            name="yogaStyles"
                                            options={["Hatha", "Vinyasa", "Ashtanga", "Iyengar", "Kundalini", "Yin", "Meditation", "Prenatal", "Restorative"]}
                                            selectedValues={formData.yogaStyles}
                                            onToggle={(val) => handleArrayToggle('yogaStyles', val)}
                                            required
                                            error={validationErrors.yogaStyles}
                                        />
                                    </div>

                                    {/* Certifications */}
                                    <div>
                                        <SectionHeader title="Certifications" subtitle="Upload copies of your certifications (e.g., RYT 200, 500). First one is mandatory." />
                                        <div className="space-y-4">
                                            {formData.certifications.map((cert, index) => (
                                                <div key={index} className="flex flex-col md:flex-row gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-200">
                                                    <div className="flex-1 w-full">
                                                        <Input label={`Certificate ${index + 1} Title`} value={cert.title} placeholder="e.g. RYT 200 from Sivananda" onChange={(e) => handleCertChange(index, 'title', e.target.value)} required={index === 0} error={validationErrors[`certifications[${index}].title`]} />
                                                    </div>
                                                    <div className="flex-1 w-full">
                                                        <div className="flex flex-col w-full">
                                                            <label htmlFor={`file-${index}`} className="mb-1 text-sm font-medium text-gray-700">Upload File (PDF/Image) {index === 0 && <span className="text-teal-600">*</span>}</label>
                                                            <input
                                                                type="file"
                                                                id={`file-${index}`}
                                                                onChange={(e) => handleCertChange(index, 'file', e.target.value, e.target.files[0])}
                                                                className={`block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200 cursor-pointer rounded-xl ${validationErrors[`certifications[${index}].file`] ? 'border-red-500 border-2' : 'border-slate-300 border'}`}
                                                                required={index === 0}
                                                            />
                                                            {validationErrors[`certifications[${index}].file`] && <p className="mt-1 text-xs text-red-500">{validationErrors[`certifications[${index}].file`]}</p>}
                                                        </div>
                                                    </div>
                                                    {formData.certifications.length > 1 && <button type="button" onClick={() => removeCertification(index)} className="p-3 text-red-500 bg-white border border-red-100 rounded-lg mb-[2px] hover:bg-red-50"><BiTrash size={14} /></button>}
                                                </div>
                                            ))}
                                            {validationErrors.certifications && <p className="mt-1 text-sm text-red-500">{validationErrors.certifications}</p>}
                                            {formData.certifications.length < 10 && <button type="button" onClick={addCertification} className="flex items-center text-teal-600 font-semibold hover:text-teal-700 mt-2"><BiPlusCircle className="mr-2" size={14} /> Add Certificate</button>}
                                        </div>
                                    </div>

                                    {/* Videos & Philosophy */}
                                    <div>
                                        <SectionHeader title="Profile Videos & Philosophy" subtitle="Your introductory video and teaching philosophy." />
                                        <Input label="Introduction Video URL (Required)" name="introVideo" value={formData.introVideo} onChange={handleChange} required placeholder="YouTube or Vimeo URL" error={validationErrors.introVideo} />

                                        <label className="pt-6 mb-1 block text-sm font-medium text-gray-700">Sample Video URLs (Minimum 2)</label>
                                        <div className="space-y-4">
                                            {formData.sampleVideos.map((video, index) => (
                                                <div key={index} className="flex gap-2 items-center">
                                                    <div className="flex-1">
                                                        <Input label={`Video ${index + 1}`} name={`sampleVideos[${index}]`} placeholder={`Video URL ${index + 1}`} value={video} onChange={(e) => handleSampleVideoChange(index, e.target.value)} required={index < 2} error={validationErrors[`sampleVideos[${index}]`]} />
                                                    </div>
                                                    {formData.sampleVideos.length > 2 && <button type="button" onClick={() => removeSampleVideo(index)} className="p-3 text-slate-400 hover:text-red-500"><BiTrash size={14} /></button>}
                                                </div>
                                            ))}
                                        </div>
                                        {validationErrors.sampleVideos && <p className="mt-1 text-xs text-red-500">{validationErrors.sampleVideos}</p>}
                                        {formData.sampleVideos.length < 10 && <button type="button" onClick={addSampleVideo} className="mt-3 flex items-center text-teal-600 font-semibold"><BiPlusCircle className="mr-2" size={14} /> Add Video URL</button>}

                                        <TextArea label="Your Teaching Philosophy (Required)" name="philosophy" rows={5} value={formData.philosophy} onChange={handleChange} required placeholder="Describe your approach, values, and why you teach yoga." error={validationErrors.philosophy} />
                                    </div>
                                </div>
                            )}

                            {/* STEP 6: AVAILABILITY (ENHANCED) */}
                            {step === 6 && (
                                <div className="space-y-6">
                                    <SectionHeader title="Class Availability" subtitle="Indicate when you are generally available for online classes (Time zone: IST)." />
                                    {/* <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3 border border-blue-100 mb-6"><BiVideo className="mt-1 flex-shrink-0" size={14} /><div><p className="font-bold text-sm">Online Only Classes</p><p className="text-xs">Physical studio support will be added in a later phase.</p></div></div> */}

                                    {/* Class Type Selection */}
                                    <div className="mt-4">
                                        <Label required>Available Class Types</Label>
                                        <CheckboxToggle
                                            label="Available for One-on-One Private Session"
                                            name="availableOneOnOne"
                                            checked={formData.availableOneOnOne}
                                            onChange={handleChange}
                                        />
                                        <CheckboxToggle
                                            label="Available for Group Class"
                                            name="availableGroupClass"
                                            checked={formData.availableGroupClass}
                                            onChange={handleChange}
                                        />
                                        <CheckboxToggle
                                            label="Single Class"
                                            name="singleClass"
                                            checked={formData.singleClass}
                                            onChange={handleChange}
                                        />
                                        {validationErrors.classType && <p className="mt-2 text-xs text-red-500">{validationErrors.classType}</p>}
                                    </div>

                                    {/* Preferred Days */}
                                    <SmartSelect
                                        label="Preferred Teaching Days (Required)"
                                        options={[
                                            { label: "Mon", value: "monday" }, { label: "Tue", value: "tuesday" },
                                            { label: "Wed", value: "wednesday" }, { label: "Thu", value: "thursday" },
                                            { label: "Fri", value: "friday" }, { label: "Sat", value: "saturday" },
                                            { label: "Sun", value: "sunday" },
                                        ]}
                                        selectedValues={formData.days}
                                        onToggle={(val) => handleArrayToggle("days", val)}
                                        error={validationErrors.days}
                                    />

                                    {/* Preferred Times */}
                                    <SmartSelect
                                        label="Preferred Class Times (Required)"
                                        options={[
                                            { label: "Morning (6-10am)", value: "morning" },
                                            { label: "Mid-Day (10am-4pm)", value: "midday" },
                                            { label: "Evening (4-9pm)", value: "evening" }
                                        ]}
                                        selectedValues={formData.times}
                                        onToggle={(val) => handleArrayToggle("times", val)}
                                        error={validationErrors.times}
                                    />

                                    {/* Start/End Time */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                        <Input label="Earliest Start Time (IST)" name="startTime" type="time" value={formData.startTime} onChange={handleChange} required error={validationErrors.startTime} />
                                        <Input label="Latest End Time (IST)" name="endTime" type="time" value={formData.endTime} onChange={handleChange} required error={validationErrors.endTime} />
                                    </div>
                                    {timeError && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 font-medium mt-3">{timeError}</div>}

                                    {/* New Field: Response Time */}
                                    <Selector
                                        label="Expected Response Time to Queries (Required)"
                                        name="responseTime"
                                        options={[
                                            { label: "Within 6 hours", value: "6h" },
                                            { label: "Within 12 hours", value: "12h" },
                                            { label: "Within 24 hours", value: "24h" },
                                            { label: "Within 48 hours", value: "48h" } // [NEW OPTION ADDED]
                                        ]}
                                        value={formData.responseTime}
                                        onChange={handleChange}
                                        required
                                        placeholder="Select expected response time"
                                        error={validationErrors.responseTime}
                                        prefix={<BiAlarmIcon className="text-teal-600" />}
                                    />
                                </div>
                            )}

                            {/* STEP 7: PRICING (ENHANCED) */}
                            {step === 7 && (
                                <div className="space-y-6">
                                    <SectionHeader title="Pricing Structure" subtitle="" />

                                    {/* Conditional Pricing Inputs */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {isGroupSelected && (
                                            <Input label="Group Class Rate (per person/hour)" name="groupRate" prefix="rs" value={formData.groupRate} onChange={handleChange} required={isGroupSelected} placeholder="e.g., 10rs" type="number" min="0" error={validationErrors.groupRate} />
                                        )}
                                        {isPrivateSelected && (
                                            <Input label="Private Session Rate (per hour)" name="privateRate" prefix="rs" value={formData.privateRate} onChange={handleChange} required={isPrivateSelected} placeholder="e.g., 50rs" type="number" min="0" error={validationErrors.privateRate} />
                                        )}
                                        {isSingleSelected && (
                                            <Input label="Single Class Rate (per hour)" name="sigleClassRate" prefix="rs" value={formData.singleClass} onChange={handleChange} required={isSingleSelected} placeholder="e.g., 50rs" type="number" min="0" error={validationErrors.s} />
                                        )}

                                        {(!isGroupSelected && !isPrivateSelected && !isSingleSelected) && (
                                            <div className="md:col-span-2 p-6 bg-red-50 rounded-xl border border-red-200 text-red-800 font-semibold">
                                                <p>⚠️ Please go back to the **Availability** step and select at least one class type (One-on-One or Group Class) to set your rates.</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Conditional Trial Policy */}
                                    {(isPrivateSelected || isGroupSelected) && (
                                        <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
                                            <Selector
                                                label="Trial Policy (Required)"
                                                name="trialMode"
                                                options={trialOptions}
                                                value={formData.trialMode}
                                                onChange={handleChange}
                                                required
                                                placeholder="Select a trial policy"
                                                error={validationErrors.trialMode}
                                            />
                                            <p className="text-xs text-slate-500 mt-2">The platform automatically manages the trial based on your selection.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* STEP 8: AGREEMENTS & SIGNATURE */}
                            {step === 8 && (
                                <div className="space-y-6">
                                    <SectionHeader title="Service Agreements" subtitle="Please read and confirm the following legal and ethical standards." />
                                    <div className="bg-slate-50 p-6 rounded-xl space-y-4 border border-slate-200">
                                        {[
                                            { label: "I confirm all submitted details are accurate and truthful.", name: "confirmAccurate" },
                                            { label: "I agree to uphold the platform's ethical standards and professional conduct guidelines.", name: "ethicalStandards" },
                                            { label: "I accept the Yogalink service mindset, prioritizing student safety and experience.", name: "serviceMindset" }
                                        ].map((item) => (
                                            <div key={item.name} className="flex items-start">
                                                <input
                                                    type="checkbox"
                                                    id={item.name}
                                                    name={item.name}
                                                    checked={formData[item.name]}
                                                    onChange={handleChange}
                                                    required
                                                    className={`mt-1 h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 ${validationErrors[item.name] ? 'border-red-500 ring-red-500' : ''}`}
                                                />
                                                <label htmlFor={item.name} className="ml-3 text-sm text-slate-600 cursor-pointer">{item.label}</label>
                                                {validationErrors[item.name] && <span className="ml-3 text-xs text-red-500 hidden sm:block">({validationErrors[item.name]})</span>}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Digital Signature <span className="text-teal-600">*</span></label>
                                        <input
                                            type="text"
                                            name="signature"
                                            value={formData.signature}
                                            onChange={handleChange}
                                            placeholder="Type your full legal name to sign"
                                            required
                                            className={`w-full border-b-2 bg-transparent py-3 text-2xl font-serif italic text-teal-900 outline-none ${validationErrors.signature ? 'border-red-500' : 'border-slate-300 focus:border-teal-600'}`}
                                        />
                                        <p className="text-xs text-slate-400 mt-1">Typing your name constitutes a legally binding electronic signature. {validationErrors.signature && <span className="text-red-500">({validationErrors.signature})</span>}</p>
                                    </div>
                                    {/* <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 text-teal-800 text-sm font-medium">
                                        <p>A registration fee of **100 Rs** will be processed upon successful submission and initial verification. This fee covers administrative and initial profile setup costs.</p>
                                    </div> */}
                                </div>
                            )}

                            {/* FINAL STEP: VERIFICATION PENDING */}
                            {isSubmitted && (
                                <div className="flex flex-col items-center justify-center text-center h-full py-10 animate-in zoom-in-95">
                                    <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-xl"><BiShield size={40} /></div>
                                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Application Submitted!</h2>
                                    <p className="text-slate-500 max-w-md mx-auto mb-4">Thank you for submitting your profile. We are now verifying your documents and qualifications.</p>
                                    <p className="text-slate-600 font-semibold mb-8">Application ID: #YGL-{Math.floor(Math.random() * 90000 + 10000)}</p>
                                    <button onClick={() => router.push('/')} className="text-white bg-teal-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-teal-700 transition-colors">Return Home</button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* FOOTER - NAVIGATION & DRAFT */}
                {!isSubmitted && (
                    <div className="flex-none px-6 py-6 border-t border-slate-100 bg-white rounded-b-3xl">
                        <div className="flex items-center justify-between max-w-4xl mx-auto w-full">

                            {/* Back Button and Draft Button Group */}
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={step === 1}
                                    className={`flex items-center px-6 py-3 border border-slate-200 rounded-xl font-medium transition-all ${step === 1 ? 'opacity-0 cursor-default pointer-events-none' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    <BiChevronLeftIcon className="w-5 h-5 mr-1" size={16} /> Back
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSaveDraft}
                                    disabled={saveStatus === 'saving'}
                                    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-colors text-sm ${saveStatus === 'saving' ? 'bg-amber-100 text-amber-700 cursor-not-allowed' :
                                        saveStatus === 'saved' ? 'bg-green-100 text-green-700' :
                                            saveStatus === 'error' ? 'bg-red-100 text-red-700' :
                                                'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    <BiSave className="w-4 h-4 mr-2" size={16} /> {saveButtonText}
                                </button>
                            </div>


                            {/* Next / Submit Button */}
                            {step < totalSteps ? (
                                <button type="button" onClick={nextStep} className="flex items-center bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-teal-700 transition-colors">
                                    {step === totalSteps - 1 ? 'Review & Sign' : 'Next'} <BiChevronRightIcon className="w-5 h-5 ml-1" size={16} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="flex items-center bg-teal-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!formData.confirmAccurate || !formData.ethicalStandards || !formData.serviceMindset || !formData.signature || Object.keys(validationErrors).length > 0}
                                >
                                    Submit Application <BiSave className="w-4 h-4 ml-2" size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {/* Tailwind CSS scrollbar utility class */}
            <style jsx>{` .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; } `}</style>
        </div>
    );
};

export default InstructorOnboarding;