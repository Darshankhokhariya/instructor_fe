import React, { useState, useCallback, useMemo } from 'react';
// The external import below was causing the compilation error. It is now removed.
// import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'; 

// --- MOCK ICONS (Replacing external 'react-icons' imports) ---
// This mock ensures the application runs without external dependencies while preserving intended visual structure.
const MockIcon = ({ icon, className = "", size = 14 }) => {
    const IconMap = {
        FaCheckCircle: '✓', FaUser: '👤', FaFileAlt: '📄', FaVideo: '📹',
        FaCalendarAlt: '📅', FaDollarSign: '$', FaShieldAlt: '🛡️', FaIdCard: '🆔',
        FaPlus: '+', FaTrash: '🗑️', FaInstagram: '📷', FaFacebook: '📘',
        FaLinkedin: '🔗', FaFaYoutube: '▶️', FaRoad: '🛣️', FaSchool: '🏫',
        FaMapMarkerAlt: '📍', FaHeartbeat: '❤️', FaGraduationCap: '🎓',
        FaSignature: '✍️', MdChevronLeft: '<', MdChevronRight: '>', // Used for navigation arrows
    };
    const iconKey = icon.name || icon.displayName;
    const symbol = IconMap[iconKey] || '•';

    return <span className={`inline-block ${className}`} style={{ fontSize: `${size}px` }}>{symbol}</span>;
};

// Use the mock icons for local reference:
const FaCheckCircle = MockIcon.bind(null, { icon: { displayName: 'FaCheckCircle' } });
const FaUser = MockIcon.bind(null, { icon: { displayName: 'FaUser' } });
const FaFileAlt = MockIcon.bind(null, { icon: { displayName: 'FaFileAlt' } });
const FaVideo = MockIcon.bind(null, { icon: { displayName: 'FaVideo' } });
const FaCalendarAlt = MockIcon.bind(null, { icon: { displayName: 'FaCalendarAlt' } });
const FaDollarSign = MockIcon.bind(null, { icon: { displayName: 'FaDollarSign' } });
const FaShieldAlt = MockIcon.bind(null, { icon: { displayName: 'FaShieldAlt' } });
const FaIdCard = MockIcon.bind(null, { icon: { displayName: 'FaIdCard' } });
const FaPlus = MockIcon.bind(null, { icon: { displayName: 'FaPlus' } });
const FaTrash = MockIcon.bind(null, { icon: { displayName: 'FaTrash' } });
const FaInstagram = MockIcon.bind(null, { icon: { displayName: 'FaInstagram' } });
const FaFacebook = MockIcon.bind(null, { icon: { displayName: 'FaFacebook' } });
const FaLinkedin = MockIcon.bind(null, { icon: { displayName: 'FaLinkedin' } });
const FaYoutube = MockIcon.bind(null, { icon: { displayName: 'FaFaYoutube' } }); // Note: Corrected typo in key
const FaRoad = MockIcon.bind(null, { icon: { displayName: 'FaRoad' } });
const FaMapMarkerAlt = MockIcon.bind(null, { icon: { displayName: 'FaMapMarkerAlt' } });
const FaHeartbeat = MockIcon.bind(null, { icon: { displayName: 'FaHeartbeat' } });
const FaGraduationCap = MockIcon.bind(null, { icon: { displayName: 'FaGraduationCap' } });
const FaSignature = MockIcon.bind(null, { icon: { displayName: 'FaSignature' } });

// Correctly mocking BiChevronLeft and BiChevronRight using the MockIcon structure
// We use the MdChevronLeft/Right display name to pull the '<' and '>' symbols from the IconMap
const BiChevronLeft = MockIcon.bind(null, { icon: { displayName: 'MdChevronLeft' } });
const BiChevronRight = MockIcon.bind(null, { icon: { displayName: 'MdChevronRight' } });


/* -------------------------------------------------------------------------- */
/* MOCK COMPONENTS (for single-file execution)                                */
/* -------------------------------------------------------------------------- */

// Mock implementations for Input, Selector, TextArea
const Input = ({ label, name, value, onChange, required = true, type = 'text', prefix, placeholder, ...rest }) => (
    <div className="mt-4">
        <Label required={required}>{label}</Label>
        <div className="relative flex items-center">
            {prefix && <span className="absolute left-3 text-slate-400">{prefix}</span>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className={`w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors placeholder-slate-400 text-slate-700 ${prefix ? 'pl-9' : 'pl-3'}`}
                {...rest}
            />
        </div>
    </div>
);

const Selector = ({ label, name, options, value, onChange, required = true }) => (
    <div className="mt-4">
        <Label required={required}>{label}</Label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white text-slate-700 appearance-none"
        >
            <option value="" disabled>Select {label}</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

const TextArea = ({ label, name, value, onChange, required = true, rows = 3, placeholder }) => (
    <div className="mt-4">
        <Label required={required}>{label}</Label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            placeholder={placeholder}
            className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors placeholder-slate-400 text-slate-700"
        />
    </div>
);

// Mock useRouter for the completion screen
const useRouter = () => ({
    push: (path) => console.log(`Simulating navigation to: ${path}`)
});

const SmartSelect = ({ label, options, selectedValues, onToggle }) => (
    <div className="mt-4">
        <Label>{label}</Label>
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
                <button
                    key={opt}
                    type="button"
                    onClick={() => onToggle(opt)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border-2 ${selectedValues.includes(opt)
                        ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                >
                    {opt}
                </button>
            ))}
        </div>
    </div>
);

const PhoneInput = (props) => (
    <Input {...props} type="tel" placeholder="e.g., +91 98765 43210" />
);

/* -------------------------------------------------------------------------- */
/* UTILITY COMPONENTS                                                         */
/* -------------------------------------------------------------------------- */

const Label = ({ children, required }) => (
    <label className="mb-2 block text-sm font-semibold text-slate-700 tracking-wide">
        {children} {required && <span className="text-teal-600">*</span>}
    </label>
);

const SectionHeader = ({ title, subtitle, className = "" }) => (
    <div className={`mb-6 border-b border-slate-100 pb-2 ${className}`}>
        <h2 className="text-xl font-bold text-teal-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </div>
);

const StepIndicator = ({ currentStep, totalSteps }) => {
    // UPDATED steps array for 8 steps (1: Combined, 2-8: Old 4-10)
    const steps = useMemo(() => [
        { id: 1, label: "Personal & Contact", icon: FaUser },
        { id: 2, label: "Education", icon: FaGraduationCap },
        { id: 3, label: "Taxation", icon: FaIdCard },
        { id: 4, label: "Socials", icon: FaInstagram },
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

                    // Only show icons for every 2nd step on small screens to reduce clutter
                    // Adjusted visibility for the new 8-step structure
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

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

const InstructorOnboarding = () => {
    // UPDATED: 3 steps combined into 1, reducing total from 10 to 8
    const totalSteps = 8;
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [isCurrentSameAsPermanent, setIsCurrentSameAsPermanent] = useState(false);

    const initialFormData = useMemo(() => ({
        // 1. Personal
        fullName: "", dob: "", gender: "", email: "", phone: "", alternatePhone: "",

        // 2. Address (Permanent)
        permanentCountry: "india", // Defaulting to India for tax demo
        permanentState: "", permanentCity: "", permanentPincode: "", permanentArea: "", permanentBuilding: "", permanentBlock: "",

        // 2. Address (Current)
        currentCountry: "", currentState: "", currentCity: "", currentPincode: "", currentArea: "", currentBuilding: "", currentBlock: "",

        // 3. Emergency Contact
        emergencyName: "", emergencyPhone: "", emergencyRelation: "",

        // 4. Education (Now Step 2)
        schoolCollege: "", degreeName: "", universityName: "",

        // 5. Taxation (Now Step 3)
        panCard: "", aadharNumber: "", gstin: "",

        // 6. Social Media (Now Step 4)
        socialFb: "", socialLi: "", socialInsta: "", socialYt: "",

        // 7. Qualifications (Now Step 5)
        certifications: [{ title: "", file: null }],
        yogaStyles: [],
        introVideo: "", sampleVideos: ["", ""], // Two default sample video slots
        philosophy: "",

        // 8. Availability (Now Step 6)
        days: [], times: [], startTime: "07:00", endTime: "19:00",

        // 9. Pricing (Now Step 7)
        groupRate: "", privateRate: "", trialMode: "none",

        // 10. Agreements (Now Step 8)
        confirmAccurate: false, ethicalStandards: false, serviceMindset: false, signature: "",
    }), []);

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = useCallback((e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') setFormData(prev => ({ ...prev, [name]: files[0] }));
        else if (type === 'checkbox') setFormData(prev => ({ ...prev, [name]: checked }));
        else setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleArrayToggle = useCallback((field, value) => {
        setFormData(prev => {
            const current = prev[field];
            return current.includes(value) ? { ...prev, [field]: current.filter(i => i !== value) } : { ...prev, [field]: [...current, value] };
        });
    }, []);

    const handleCertChange = useCallback((index, field, value) => {
        const updated = [...formData.certifications];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, certifications: updated }));
    }, [formData.certifications]);

    const addCertification = () => formData.certifications.length < 10 && setFormData(prev => ({ ...prev, certifications: [...prev.certifications, { title: "", file: null }] }));
    const removeCertification = (index) => setFormData(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== index) }));

    const handleSampleVideoChange = useCallback((index, value) => {
        const updated = [...formData.sampleVideos];
        updated[index] = value;
        setFormData(prev => ({ ...prev, sampleVideos: updated }));
    }, [formData.sampleVideos]);

    const addSampleVideo = () => formData.sampleVideos.length < 10 && setFormData(prev => ({ ...prev, sampleVideos: [...prev.sampleVideos, ""] }));
    const removeSampleVideo = (index) => setFormData(prev => ({ ...prev, sampleVideos: prev.sampleVideos.filter((_, i) => i !== index) }));

    const nextStep = () => {
        document.getElementById('form-content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(prev => Math.min(prev + 1, totalSteps));
    };

    const prevStep = () => {
        document.getElementById('form-content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(totalSteps); // Move to the Verification Pending step (Now step 8)
    };

    const handleSameAsPermanentToggle = (e) => {
        const isChecked = e.target.checked;
        setIsCurrentSameAsPermanent(isChecked);
        if (isChecked) {
            setFormData(prev => ({
                ...prev,
                currentCountry: prev.permanentCountry,
                currentState: prev.permanentState,
                currentCity: prev.permanentCity,
                currentPincode: prev.permanentPincode,
                currentArea: prev.permanentArea,
                currentBuilding: prev.permanentBuilding,
                currentBlock: prev.permanentBlock,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                currentCountry: "",
                currentState: "",
                currentCity: "",
                currentPincode: "",
                currentArea: "",
                currentBuilding: "",
                currentBlock: "",
            }));
        }
    };

    // --- CONDITIONAL LOGIC FOR INDIA ---
    const isSubmitted = step === totalSteps;

    return (
        <div className="h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-2 md:p-6 font-sans text-slate-800 overflow-hidden">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-screen h-full md:h-auto md:min-h-[650px]">

                {/* HEADER */}
                <div className="flex-none px-4 py-6 md:px-10 border-b border-slate-100 bg-white rounded-t-3xl z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div><h1 className="text-2xl md:text-3xl font-bold text-teal-900">Yogalink Instructor</h1><p className="text-slate-500 text-sm">Join the collective.</p></div>
                        <div className="text-right hidden sm:block"><span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase">{isSubmitted ? "Complete" : `Step ${step} of ${totalSteps}`}</span></div>
                    </div>
                    <StepIndicator currentStep={step} totalSteps={totalSteps} />
                </div>

                {/* SCROLLABLE CONTENT */}
                <div id="form-content-area" className="flex-1 overflow-y-auto px-6 py-6 md:px-12 scroll-smooth custom-scrollbar">
                    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto min-h-full">
                        <div className={`transition-opacity duration-300 ease-out ${isSubmitted ? 'opacity-100' : 'opacity-100'} pb-4`}>

                            {/* NEW STEP 1: PERSONAL, ADDRESS, EMERGENCY CONTACT (Combined) */}
                            {step === 1 && (
                                <div className="space-y-10">

                                    {/* Section 1.1: Personal Details */}
                                    <div className="space-y-4">
                                        <SectionHeader title="1. Basic Personal Details" subtitle="Required for identification and communication." />
                                        <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Your full legal name" />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                                            <Selector label="Gender" name="gender" options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }, { label: "Other", value: "other" }]} value={formData.gender} onChange={handleChange} required />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                            <PhoneInput label="Primary Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
                                        </div>
                                        <PhoneInput label="Alternate Phone Number (Optional)" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} required={false} />
                                    </div>

                                    {/* Section 1.2: Permanent & Current Address */}
                                    <div className="space-y-6 pt-4">
                                        <SectionHeader title="2. Permanent & Current Address" subtitle="Ensure addresses are accurate for legal and tax purposes." className="mt-6" />

                                        {/* Permanent Address */}
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                            <h4 className="text-md font-bold text-teal-900 mb-3 flex items-center"><FaRoad className="mr-2 text-teal-600" size={14} /> Permanent Address</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <Selector label="Country" name="permanentCountry" options={[{ label: "India", value: "india" }, { label: "USA", value: "usa" }, { label: "UK", value: "uk" }, { label: "Other", value: "other" }]} value={formData.permanentCountry} onChange={handleChange} required />
                                                <Input label="State" name="permanentState" value={formData.permanentState} onChange={handleChange} required />
                                                <Input label="City" name="permanentCity" value={formData.permanentCity} onChange={handleChange} required />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <Input label="Pincode / Zip" name="permanentPincode" value={formData.permanentPincode} onChange={handleChange} required />
                                                <Input label="Area" name="permanentArea" value={formData.permanentArea} onChange={handleChange} required />
                                                <Input label="Building Name" name="permanentBuilding" value={formData.permanentBuilding} onChange={handleChange} required />
                                            </div>
                                            <Input label="Block / Door No." name="permanentBlock" value={formData.permanentBlock} onChange={handleChange} required />
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
                                                    <Selector label="Country" name="currentCountry" options={[{ label: "India", value: "india" }, { label: "USA", value: "usa" }, { label: "UK", value: "uk" }, { label: "Other", value: "other" }]} value={formData.currentCountry} onChange={handleChange} required={!isCurrentSameAsPermanent} />
                                                    <Input label="State" name="currentState" value={formData.currentState} onChange={handleChange} required={!isCurrentSameAsPermanent} />
                                                    <Input label="City" name="currentCity" value={formData.currentCity} onChange={handleChange} required={!isCurrentSameAsPermanent} />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <Input label="Pincode / Zip" name="currentPincode" value={formData.currentPincode} onChange={handleChange} required={!isCurrentSameAsPermanent} />
                                                    <Input label="Area" name="currentArea" value={formData.currentArea} onChange={handleChange} required={!isCurrentSameAsPermanent} />
                                                    <Input label="Building Name" name="currentBuilding" value={formData.currentBuilding} onChange={handleChange} required={!isCurrentSameAsPermanent} />
                                                </div>
                                                <Input label="Block / Door No." name="currentBlock" value={formData.currentBlock} onChange={handleChange} required={!isCurrentSameAsPermanent} />
                                            </fieldset>
                                        </div>
                                    </div>

                                    {/* Section 1.3: Emergency Contact */}
                                    <div className="space-y-6 pt-4">
                                        <SectionHeader title="3. Emergency Contact" subtitle="In case of urgent issues, who should we contact?" className="mt-6" />
                                        <div className="p-6 bg-red-50 rounded-xl border border-red-200 space-y-4">
                                            <Input label="Full Name" name="emergencyName" value={formData.emergencyName} onChange={handleChange} required placeholder="Emergency Contact Full Name" />
                                            <PhoneInput label="Phone Number" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} required />
                                            <Input label="Relationship" name="emergencyRelation" value={formData.emergencyRelation} onChange={handleChange} required placeholder="e.g., Spouse, Parent, Sibling" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* NEW STEP 2 (OLD STEP 4): EDUCATION DETAILS */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <SectionHeader title="Education Details" subtitle="Your highest educational background." />
                                    <Input label="School / College Name" name="schoolCollege" value={formData.schoolCollege} onChange={handleChange} required />
                                    <Input label="Degree / Qualification Name" name="degreeName" value={formData.degreeName} onChange={handleChange} required placeholder="e.g., Master of Arts in Yoga" />
                                    <Input label="University / Institution Name" name="universityName" value={formData.universityName} onChange={handleChange} required />
                                </div>
                            )}

                            {/* NEW STEP 3 (OLD STEP 5): TAXATION DETAILS (India Only) */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <SectionHeader title="Taxation Details" subtitle="Required for compliant payouts. Currently accepting Indian Tax IDs only." />
                                    <div className={`p-6 rounded-xl border transition-all duration-300 `}>
                                        <div className="space-y-4 animate-in fade-in">
                                            <div className="flex items-center gap-2 mb-2 text-orange-800 font-semibold text-sm">
                                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                                Indian Tax Residency Required
                                            </div>
                                            <Input
                                                label="PAN Card Number"
                                                name="panCard"
                                                placeholder="ABCDE1234F"
                                                value={formData.panCard}
                                                onChange={handleChange}
                                                required
                                            />
                                            <Input
                                                label="Aadhaar Card Number"
                                                name="aadharNumber"
                                                placeholder="1234 5678 9012"
                                                value={formData.aadharNumber}
                                                onChange={handleChange}
                                                required
                                            />
                                            <Input
                                                label="GSTIN (Goods and Services Tax Identification Number) - Optional"
                                                name="gstin"
                                                placeholder="22AAAAA0000A1Z5"
                                                value={formData.gstin}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* NEW STEP 4 (OLD STEP 6): SOCIAL MEDIA DETAILS */}
                            {step === 4 && (
                                <div className="space-y-6">
                                    <SectionHeader title="Social Media Profiles" subtitle="Connect your platforms to showcase your digital presence." />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input label="Instagram Link" name="socialInsta" prefix={<FaInstagram className="text-pink-500" size={16} />} placeholder="https://instagram.com/user" value={formData.socialInsta} onChange={handleChange} />
                                        <Input label="Facebook Link" name="socialFb" prefix={<FaFacebook className="text-blue-600" size={16} />} placeholder="https://facebook.com/profile" value={formData.socialFb} onChange={handleChange} />
                                        <Input label="LinkedIn Link" name="socialLi" prefix={<FaLinkedin className="text-blue-700" size={16} />} placeholder="https://linkedin.com/in/profile" value={formData.socialLi} onChange={handleChange} />
                                        <Input label="YouTube Channel Link" name="socialYt" prefix={<FaYoutube className="text-red-600" size={16} />} placeholder="https://youtube.com/channel" value={formData.socialYt} onChange={handleChange} />
                                    </div>
                                </div>
                            )}

                            {/* NEW STEP 5 (OLD STEP 7): QUALIFICATIONS & EXPERTISE */}
                            {step === 5 && (
                                <div className="space-y-8">
                                    <div>
                                        <SectionHeader title="Yoga Expertise" subtitle="Select the styles you are qualified to teach." />
                                        <SmartSelect
                                            label="Yoga Styles"
                                            options={["Hatha", "Vinyasa", "Ashtanga", "Iyengar", "Kundalini", "Yin", "Meditation", "Prenatal", "Restorative"]}
                                            selectedValues={formData.yogaStyles}
                                            onToggle={(val) => handleArrayToggle('yogaStyles', val)}
                                        />
                                    </div>
                                    <div>
                                        <SectionHeader title="Certifications" subtitle="Upload copies of your certifications (e.g., RYT 200, 500)." />
                                        <div className="space-y-4">
                                            {formData.certifications.map((cert, index) => (
                                                <div key={index} className="flex flex-col md:flex-row gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-200">
                                                    <div className="flex-1 w-full">
                                                        <Input label={`Certificate ${index + 1} Title`} value={cert.title} placeholder="e.g. RYT 200 from Sivananda" onChange={(e) => handleCertChange(index, 'title', e.target.value)} required={index === 0} />
                                                    </div>
                                                    <div className="flex-1 w-full">
                                                        <Label>Upload File (PDF/Image)</Label>
                                                        <input type="file" onChange={(e) => handleCertChange(index, 'file', e.target.files[0])} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200 cursor-pointer border border-slate-300 rounded-xl" required={index === 0} />
                                                    </div>
                                                    {formData.certifications.length > 1 && <button type="button" onClick={() => removeCertification(index)} className="p-3 text-red-500 bg-white border border-red-100 rounded-lg mb-[2px] hover:bg-red-50"><FaTrash size={14} /></button>}
                                                </div>
                                            ))}
                                            {formData.certifications.length < 10 && <button type="button" onClick={addCertification} className="flex items-center text-teal-600 font-semibold hover:text-teal-700 mt-2"><FaPlus className="mr-2" size={14} /> Add Certificate</button>}
                                        </div>
                                    </div>
                                    <div>
                                        <SectionHeader title="Profile Videos & Philosophy" subtitle="Your introductory video and teaching philosophy." />
                                        <Input label="Introduction Video URL (Required)" name="introVideo" value={formData.introVideo} onChange={handleChange} required placeholder="YouTube or Vimeo URL" />
                                        <Label className="mt-6">Sample Video URLs (Minimum 2)</Label>
                                        <div className="space-y-4">
                                            {formData.sampleVideos.map((video, index) => (
                                                <div key={index} className="flex gap-2 items-center">
                                                    <div className="flex-1 flex flex-col gap-1">
                                                        <label className="text-sm font-medium text-gray-700">
                                                            Video URL {index + 1} {index < 2 && <span className="text-red-500">*</span>}
                                                        </label>
                                                        <Input
                                                            placeholder={`Video URL ${index + 1}`}
                                                            value={video}
                                                            onChange={(e) => handleSampleVideoChange(index, e.target.value)}
                                                        />
                                                    </div>

                                                    {formData.sampleVideos.length > 2 && <button type="button" onClick={() => removeSampleVideo(index)} className="mt-1 p-3 text-slate-400 hover:text-red-500"><FaTrash size={14} /></button>}
                                                </div>
                                            ))}
                                        </div>
                                        {formData.sampleVideos.length < 10 && <button type="button" onClick={addSampleVideo} className="mt-3 flex items-center text-teal-600 font-semibold"><FaPlus className="mr-2" size={14} /> Add Video URL</button>}

                                        <TextArea label="Your Teaching Philosophy (Required)" name="philosophy" rows={5} value={formData.philosophy} onChange={handleChange} required placeholder="Describe your approach, values, and why you teach yoga." />
                                    </div>
                                </div>
                            )}

                            {/* NEW STEP 6 (OLD STEP 8): AVAILABILITY */}
                            {step === 6 && (
                                <div className="space-y-6">
                                    <SectionHeader title="Class Availability" subtitle="Indicate when you are generally available for online classes (Time zone: IST)." />
                                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3 border border-blue-100 mb-6"><FaVideo className="mt-1 flex-shrink-0" size={14} /><div><p className="font-bold text-sm">Online Only Classes</p><p className="text-xs">Physical studio support will be added in a later phase.</p></div></div>
                                    <SmartSelect label="Preferred Teaching Days (Required)" options={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} selectedValues={formData.days} onToggle={(val) => handleArrayToggle('days', val)} />
                                    <SmartSelect label="Preferred Class Times (Required)" options={["Morning (6-10am)", "Mid-Day (10am-4pm)", "Evening (4-9pm)"]} selectedValues={formData.times} onToggle={(val) => handleArrayToggle('times', val)} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                        <Input label="Earliest Start Time" name="startTime" type="time" value={formData.startTime} onChange={handleChange} required />
                                        <Input label="Latest End Time" name="endTime" type="time" value={formData.endTime} onChange={handleChange} required />
                                    </div>
                                </div>
                            )}

                            {/* NEW STEP 7 (OLD STEP 9): PRICING */}
                            {step === 7 && (
                                <div className="space-y-6">
                                    <SectionHeader title="Pricing Structure" subtitle="Set your rates in USD ($) and define your trial policy." />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input label="Group Class Rate (per person/hour)" name="groupRate" prefix="$" value={formData.groupRate} onChange={handleChange} required placeholder="e.g., 10" type="number" />
                                        <Input label="Private Session Rate (per hour)" name="privateRate" prefix="$" value={formData.privateRate} onChange={handleChange} required placeholder="e.g., 50" type="number" />
                                    </div>
                                    <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
                                        <Label>Trial Policy (Required)</Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {[{ label: "No Trial", value: "none" }, { label: "1 Free Class", value: "1class" }, { label: "3 Days Free", value: "3days" }, { label: "7 Days Free", value: "7days" }].map((opt) => (
                                                <label key={opt.value} className={`cursor-pointer border p-4 rounded-xl flex items-center justify-between transition-all ${formData.trialMode === opt.value ? 'bg-teal-100 border-teal-500 shadow-lg scale-[1.02]' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                                                    <span className="text-sm font-semibold text-slate-700">{opt.label}</span>
                                                    <input type="radio" name="trialMode" value={opt.value} checked={formData.trialMode === opt.value} onChange={handleChange} className="h-5 w-5 text-teal-600 border-gray-300 focus:ring-teal-500" />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* NEW STEP 8 (OLD STEP 10): AGREEMENTS & SIGNATURE */}
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
                                                    className="mt-1 h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                                />
                                                <label htmlFor={item.name} className="ml-3 text-sm text-slate-600 cursor-pointer">{item.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4">
                                        <Label required>Digital Signature</Label>
                                        <input
                                            type="text"
                                            name="signature"
                                            value={formData.signature}
                                            onChange={handleChange}
                                            placeholder="Type your full legal name to sign"
                                            required
                                            className="w-full border-b-2 border-slate-300 bg-transparent py-3 text-2xl font-serif italic text-teal-900 focus:border-teal-600 outline-none"
                                        />
                                        <p className="text-xs text-slate-400 mt-1">Typing your name constitutes a legally binding electronic signature.</p>
                                    </div>
                                </div>
                            )}

                            {/* FINAL STEP: VERIFICATION PENDING */}
                            {isSubmitted && (
                                <div className="flex flex-col items-center justify-center text-center h-full py-10 animate-in zoom-in-95">
                                    <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-xl"><FaShieldAlt size={40} /></div>
                                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Application Submitted!</h2>
                                    <p className="text-slate-500 max-w-md mx-auto mb-4">Thank you for submitting your profile. We are now verifying your documents and qualifications.</p>
                                    <p className="text-slate-600 font-semibold mb-8">Application ID: #YGL-{Math.floor(Math.random() * 90000 + 10000)}</p>
                                    <button onClick={() => router.push('/')} className="text-white bg-teal-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-teal-700 transition-colors">Return Home</button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* FOOTER */}
                {!isSubmitted && (
                    <div className="flex-none px-6 py-6 border-t border-slate-100 bg-white rounded-b-3xl">
                        <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={step === 1}
                                className={`flex items-center px-6 py-3 border border-slate-200 rounded-xl font-medium transition-all ${step === 1 ? 'opacity-0 cursor-default' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                <BiChevronLeft className="w-5 h-5 mr-1" size={16} /> Back
                            </button>

                            {/* totalSteps is now 8. We navigate to next until step 7, then submit at step 8. */}
                            {step < totalSteps ? (
                                <button type="button" onClick={nextStep} className="flex items-center bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-teal-700 transition-colors">
                                    {step === totalSteps - 1 ? 'Review & Submit' : 'Next'} <BiChevronRight className="w-5 h-5 ml-1" size={16} />
                                </button>
                            ) : (
                                <button type="button" onClick={handleSubmit} disabled={step < totalSteps} className="flex items-center bg-teal-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-teal-700 transition-colors">
                                    Submit Application <FaCheckCircle className="w-4 h-4 ml-2" size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{` .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; } `}</style>
        </div>
    );
};

export default InstructorOnboarding;