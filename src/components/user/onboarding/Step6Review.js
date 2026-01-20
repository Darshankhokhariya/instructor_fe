import Selector from '@/components/common/Selector';
import TextArea from '@/components/common/TextArea';

export default function Step6Review({ formData, updateFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        updateFormData({ [name]: checked });
    };

    const practiceTypeOptions = [
        { value: 'guided', label: '🎥 Guided - Follow along with instructor videos' },
        { value: 'self-practice', label: '🧘 Self-Practice - Practice independently' },
        { value: 'mixed', label: '🔄 Mixed - Combination of both' },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-pink-600 tracking-wide">STEP 6 OF 6 · PREFERENCES</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                    Final Preferences
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Just a few more details to personalize your yoga experience!
                </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6 mt-8">
                {/* Practice Type */}
                <div className="transform transition-all hover:scale-[1.01]">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200/50 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white text-xl">🎯</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Preferred Practice Type</h3>
                        </div>
                        <Selector
                            name="practice_type"
                            value={formData.practice_type || ''}
                            onChange={handleChange}
                            options={practiceTypeOptions}
                            placeholder="How do you prefer to practice?"
                            required
                        />
                    </div>
                </div>

                {/* Motivation */}
                <div className="transform transition-all hover:scale-[1.01]">
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200/50 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white text-xl">💪</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">What Motivates You?</h3>
                        </div>
                        <TextArea
                            name="motivation"
                            value={formData.motivation || ''}
                            onChange={handleChange}
                            placeholder="e.g., Improve health and flexibility, reduce stress, build strength"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Reminders Enabled */}
                <div className="transform transition-all hover:scale-[1.01]">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200/50 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 pt-1">
                                <input
                                    type="checkbox"
                                    id="reminders_enabled"
                                    name="reminders_enabled"
                                    checked={formData.reminders_enabled || false}
                                    onChange={handleCheckboxChange}
                                    className="w-6 h-6 text-primary border-blue-300 rounded-lg focus:ring-primary focus:ring-2 cursor-pointer transition-all"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="reminders_enabled" className="font-bold text-slate-900 cursor-pointer text-lg">
                                    Enable practice reminders
                                </label>
                                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                                    Get gentle reminders to help you stay consistent with your yoga practice and build a lasting habit.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-2xl">🔔</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Preferences */}
                <div className="transform transition-all hover:scale-[1.01]">
                    <TextArea
                        label="Any Other Preferences?"
                        name="other_preferences"
                        value={formData.other_preferences || ''}
                        onChange={handleChange}
                        placeholder="e.g., Prefer evening sessions, like calming music, need modifications for injuries (optional)"
                        rows={3}
                    />
                </div>
            </div>

            {/* Success Card */}
            <div className="mt-8 bg-gradient-to-br from-primary/10 via-emerald-500/10 to-teal-500/10 border-2 border-primary/30 rounded-3xl p-8 text-center shadow-xl">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-emerald-500 rounded-full mb-4 shadow-2xl">
                    <span className="text-4xl">🎉</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">You're Almost Done!</h3>
                <p className="text-slate-700 leading-relaxed max-w-md mx-auto">
                    Click "Complete Setup" to finish your onboarding and start your personalized yoga journey with us.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Your data is secure and encrypted</span>
                </div>
            </div>

            <div className="text-center text-sm text-slate-500">
                You can always update these preferences later in your account settings.
            </div>
        </div>
    );
}
