"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
    LuFlower2, LuUser, LuTarget, LuActivity, LuHeart,
    LuCalendar, LuCheck, LuArrowRight, LuArrowLeft
} from 'react-icons/lu';

// Import step components
import Step1Profile from '@/components/user/onboarding/Step1Profile';
import Step2Goals from '@/components/user/onboarding/Step2Goals';
import Step3Experience from '@/components/user/onboarding/Step3Experience';
import Step4Health from '@/components/user/onboarding/Step4Health';
import Step5Lifestyle from '@/components/user/onboarding/Step5Lifestyle';
import Step6Review from '@/components/user/onboarding/Step6Review';

// Import Redux actions
import {
    userOnboardingStepOne,
    userOnboardingStepTwo,
    userOnboardingStepThree,
    userOnboardingStepFour,
    userOnboardingStepFive,
    userOnboardingStepSix,
    getUserOnboardingStepData,
} from '@/redux/slices/userOnboardingSlice';

export default function Onboarding() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [formData, setFormData] = useState({
        // Step 1: Profile
        full_name: '',
        dob: '',
        gender: '',
        height: '',
        weight: '',
        occupation: '',
        daily_routine: '',

        // Step 2: Health
        medical_conditions: '',
        injuries: '',
        medications: '',
        mobility_restrictions: '',

        // Step 3: Fitness
        current_fitness_level: '',
        yoga_experience_level: '',
        previous_yoga_styles: '',
        other_activities: '',
        goals: '',
        specific_targets: '',
        areas_of_interest: '',

        // Step 4: Lifestyle
        preferred_session_time: '',
        session_duration: '',
        stress_level: '',
        sleep_quality: '',
        interest_in_meditation: '',
        mental_health_goals: '',

        // Step 5: Diet
        diet_type: '',
        diet_tips_requested: false,

        // Step 6: Preferences
        practice_type: '',
        motivation: '',
        reminders_enabled: false,
        other_preferences: '',
    });

    const steps = [
        { id: 1, name: 'Profile', icon: LuUser, component: Step1Profile, apiAction: userOnboardingStepOne },
        { id: 2, name: 'Health', icon: LuHeart, component: Step2Goals, apiAction: userOnboardingStepTwo },
        { id: 3, name: 'Fitness', icon: LuActivity, component: Step3Experience, apiAction: userOnboardingStepThree },
        { id: 4, name: 'Lifestyle', icon: LuCalendar, component: Step4Health, apiAction: userOnboardingStepFour },
        { id: 5, name: 'Diet', icon: LuTarget, component: Step5Lifestyle, apiAction: userOnboardingStepFive },
        { id: 6, name: 'Preferences', icon: LuCheck, component: Step6Review, apiAction: userOnboardingStepSix }
    ];

    const CurrentStepComponent = steps[currentStep - 1].component;

    // Get step-specific data
    const getStepData = () => {
        switch (currentStep) {
            case 1:
                return {
                    full_name: formData.full_name,
                    dob: formData.dob,
                    gender: formData.gender,
                    height: formData.height,
                    weight: formData.weight,
                    occupation: formData.occupation,
                    daily_routine: formData.daily_routine,
                };
            case 2:
                return {
                    medical_conditions: formData.medical_conditions,
                    injuries: formData.injuries,
                    medications: formData.medications,
                    mobility_restrictions: formData.mobility_restrictions,
                };
            case 3:
                return {
                    current_fitness_level: formData.current_fitness_level,
                    yoga_experience_level: formData.yoga_experience_level,
                    previous_yoga_styles: formData.previous_yoga_styles,
                    other_activities: formData.other_activities,
                    goals: formData.goals,
                    specific_targets: formData.specific_targets,
                    areas_of_interest: formData.areas_of_interest,
                };
            case 4:
                return {
                    preferred_session_time: formData.preferred_session_time,
                    session_duration: parseInt(formData.session_duration) || 30,
                    stress_level: formData.stress_level,
                    sleep_quality: formData.sleep_quality,
                    interest_in_meditation: formData.interest_in_meditation,
                    mental_health_goals: formData.mental_health_goals,
                };
            case 5:
                return {
                    diet_type: formData.diet_type,
                    diet_tips_requested: formData.diet_tips_requested,
                };
            case 6:
                return {
                    practice_type: formData.practice_type,
                    motivation: formData.motivation,
                    reminders_enabled: formData.reminders_enabled,
                    other_preferences: formData.other_preferences,
                };
            default:
                return {};
        }
    };

    // Fetch step data when component mounts or step changes
    useEffect(() => {
        const fetchStepData = async () => {
            try {
                const res = await dispatch(getUserOnboardingStepData(currentStep)).unwrap();

                console.log("res", res);
                if (res?.status === 200 && res?.data) {
                    // Merge fetched data with existing formData
                    setFormData(prev => ({
                        ...prev,
                        ...res.data.data
                    }));
                    setDataLoaded(true);
                }
            } catch (error) {
                // If no data exists for this step, that's okay - user hasn't filled it yet
                console.log(`No saved data for step ${currentStep}`);
                setDataLoaded(true);
            }
        };

        fetchStepData();
    }, [currentStep, dispatch]);

    const handleNext = async () => {
        setLoading(true);

        try {
            const stepData = getStepData();
            const currentStepConfig = steps[currentStep - 1];

            // Call the API for the current step
            const res = await dispatch(currentStepConfig.apiAction(stepData)).unwrap();

            if (res?.status === 200) {
                toast.success(res?.message || `Step ${currentStep} completed`);

                if (currentStep < steps.length) {
                    setCurrentStep(currentStep + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } else {
                toast.error(res?.message || 'Failed to save step data');
            }
        } catch (error) {
            toast.error(error?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = async () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Data will be fetched automatically by useEffect when currentStep changes
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const stepData = getStepData();
            const currentStepConfig = steps[currentStep - 1];

            // Call the final step API
            const res = await dispatch(currentStepConfig.apiAction(stepData)).unwrap();

            if (res?.status === 200) {
                toast.success('Onboarding completed successfully!');
                // Redirect to dashboard
                router.push('/user/dashboard');
            } else {
                toast.error(res?.message || 'Failed to complete onboarding');
            }
        } catch (error) {
            toast.error(error?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const updateFormData = (data) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const progressPercentage = (currentStep / steps.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                {/* Progress Bar */}
                <div className="h-1 bg-slate-100">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-12">

                {/* Step Content */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100 font-jakarta">
                    {/* <div className="mb-12">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isActive = currentStep === step.id;
                                const isCompleted = currentStep > step.id;

                                return (
                                    <div key={step.id} className="flex items-center flex-1">
                                        <div className="flex flex-col items-center">
                                            <div className={`
                                            w-12 h-12 rounded-full flex items-center justify-center transition-all
                                            ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110' : ''}
                                            ${isCompleted ? 'bg-primary/20 text-primary' : ''}
                                            ${!isActive && !isCompleted ? 'bg-slate-100 text-slate-400' : ''}
                                        `}>
                                                {isCompleted ? <LuCheck size={24} /> : <Icon size={24} />}
                                            </div>
                                            <span className={`
                                            text-xs mt-2 font-medium hidden sm:block
                                            ${isActive ? 'text-primary' : 'text-slate-500'}
                                        `}>
                                                {step.name}
                                            </span>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className={`
                                            flex-1 h-1 mx-2 transition-all
                                            ${isCompleted ? 'bg-primary' : 'bg-slate-200'}
                                        `}></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div> */}
                    <CurrentStepComponent
                        formData={formData}
                        updateFormData={updateFormData}
                    />

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1 || loading}
                            className={`
                                flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
                                ${currentStep === 1 || loading
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95'
                                }
                            `}
                        >
                            <LuArrowLeft size={20} />
                            Back
                        </button>

                        {currentStep < steps.length ? (
                            <button
                                onClick={handleNext}
                                disabled={loading}
                                className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : 'Continue'}
                                <LuArrowRight size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Completing...' : 'Complete Setup'}
                                <LuCheck size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
