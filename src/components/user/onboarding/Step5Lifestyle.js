export default function Step5Lifestyle({ formData, updateFormData }) {
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        updateFormData({ [name]: checked });
    };

    const dietTypeOptions = [
        { value: 'vegetarian', label: 'Vegetarian', desc: 'No meat', icon: '🥗', color: 'from-lime-500 to-green-500' },
        { value: 'vegan', label: 'Vegan', desc: 'No animal products', icon: '🌱', color: 'from-emerald-500 to-teal-500' },
        { value: 'balanced', label: 'Balanced', desc: 'Eat everything in moderation', icon: '🍽️', color: 'from-green-500 to-emerald-500' },
        { value: 'gluten_free', label: 'Gluten Free', desc: 'No gluten', icon: '🌾', color: 'from-yellow-500 to-orange-500' },
        { value: 'other', label: 'Other', desc: 'Custom diet', icon: '🍴', color: 'from-purple-500 to-pink-500' },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-green-600 tracking-wide">STEP 5 OF 6 · DIET</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                    Dietary Preferences
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Help us provide nutrition guidance that aligns with your lifestyle and wellness goals.
                </p>
            </div>

            {/* Diet Type Selection */}
            <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">
                    What best describes your diet?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dietTypeOptions.map(diet => {
                        const isSelected = formData.diet_type === diet.value;
                        return (
                            <button
                                key={diet.value}
                                type="button"
                                onClick={() => updateFormData({ diet_type: diet.value })}
                                className={`
                                    group relative p-6 rounded-2xl border-2 transition-all transform hover:scale-105
                                    ${isSelected
                                        ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl shadow-primary/20'
                                        : 'border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg'
                                    }
                                `}
                            >
                                {isSelected && (
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-primary to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${diet.color} rounded-2xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110`}>
                                    <span className="text-3xl">{diet.icon}</span>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-lg text-slate-900 mb-1">{diet.label}</div>
                                    <div className="text-sm text-slate-600">{diet.desc}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Diet Tips Requested */}
            <div className="mt-8 transform transition-all hover:scale-[1.01]">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200/50 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 pt-1">
                            <input
                                type="checkbox"
                                id="diet_tips_requested"
                                name="diet_tips_requested"
                                checked={formData.diet_tips_requested || false}
                                onChange={handleCheckboxChange}
                                className="w-6 h-6 text-primary border-emerald-300 rounded-lg focus:ring-primary focus:ring-2 cursor-pointer transition-all"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="diet_tips_requested" className="font-bold text-slate-900 cursor-pointer text-lg">
                                I'd like to receive dietary tips and nutrition guidance
                            </label>
                            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                                Get personalized nutrition advice to complement your yoga practice and help you achieve your wellness goals faster.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-2xl">🥗</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Card */}
            <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/50 rounded-2xl p-6 shadow-sm">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-green-900 mb-1">Holistic Wellness</h3>
                        <p className="text-sm text-green-800 leading-relaxed">
                            Yoga and nutrition work together to create lasting wellness. We'll provide tips that align with your dietary preferences and fitness goals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
