import Selector from '@/components/common/Selector';
import TextArea from '@/components/common/TextArea';

export default function Step4Health({ formData, updateFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const sessionTimeOptions = [
        { value: 'morning', label: '🌅 Morning (6 AM - 12 PM)' },
        { value: 'afternoon', label: '☀️ Afternoon (12 PM - 5 PM)' },
        { value: 'evening', label: '🌆 Evening (5 PM - 9 PM)' },
        { value: 'night', label: '🌙 Night (9 PM - 12 AM)' },
    ];

    const sessionDurationOptions = [
        { value: '15', label: '⚡ 15 minutes - Quick session' },
        { value: '30', label: '✨ 30 minutes - Balanced practice' },
        { value: '45', label: '🔥 45 minutes - Deep practice' },
        { value: '60', label: '💎 60 minutes - Full experience' },
    ];

    const stressLevelOptions = [
        { value: 'low', label: '😌 Low - Generally relaxed' },
        { value: 'moderate', label: '😐 Moderate - Some stress' },
        { value: 'high', label: '😰 High - Frequently stressed' },
    ];

    const sleepQualityOptions = [
        { value: 'poor', label: '😴 Poor - Often have trouble sleeping' },
        { value: 'average', label: '😊 Average - Sleep okay most nights' },
        { value: 'good', label: '😃 Good - Sleep well regularly' },
        { value: 'excellent', label: '🌟 Excellent - Always sleep great' },
    ];

    const meditationInterestOptions = [
        { value: 'yes', label: '✅ Yes, I\'m interested' },
        { value: 'no', label: '❌ No, not interested' },
    ];

    return (
        <div className="space-y-10 animate-fadeIn max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-semibold text-primary tracking-wide">
                        STEP 4 OF 6 · LIFESTYLE
                    </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Your Lifestyle & Preferences
                </h2>

                <p className="text-slate-600 max-w-2xl mx-auto">
                    Help us schedule and customize your practice to fit seamlessly into your daily life.
                </p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Preferred Session Time */}
                <LifestyleCard
                    title="Preferred Session Time"
                    icon="⏰"
                    colSpan
                >
                    <Selector
                        name="preferred_session_time"
                        value={formData.preferred_session_time || ""}
                        onChange={handleChange}
                        options={sessionTimeOptions}
                        placeholder="When do you prefer to practice?"
                        required
                    />
                </LifestyleCard>

                {/* Session Duration */}
                <LifestyleCard
                    title="Ideal Session Duration"
                    icon="⏱️"
                    colSpan
                >
                    <Selector
                        name="session_duration"
                        value={formData.session_duration || ""}
                        onChange={handleChange}
                        options={sessionDurationOptions}
                        placeholder="How long do you want to practice?"
                        required
                    />
                </LifestyleCard>

                {/* Stress Level */}
                <SimpleCard>
                    <Selector
                        label="Current Stress Level"
                        name="stress_level"
                        value={formData.stress_level || ""}
                        onChange={handleChange}
                        options={stressLevelOptions}
                        placeholder="How stressed do you feel?"
                        required
                    />
                </SimpleCard>

                {/* Sleep Quality */}
                <SimpleCard>
                    <Selector
                        label="Sleep Quality"
                        name="sleep_quality"
                        value={formData.sleep_quality || ""}
                        onChange={handleChange}
                        options={sleepQualityOptions}
                        placeholder="How well do you sleep?"
                        required
                    />
                </SimpleCard>

                {/* Meditation Interest */}
                <LifestyleCard
                    title="Interest in Meditation"
                    icon="🧘"
                    gradient="from-indigo-50 to-purple-50"
                    iconGradient="from-indigo-500 to-purple-500"
                    colSpan
                >
                    <Selector
                        name="interest_in_meditation"
                        value={formData.interest_in_meditation || ""}
                        onChange={handleChange}
                        options={meditationInterestOptions}
                        placeholder="Are you interested in meditation?"
                        required
                    />
                </LifestyleCard>

                {/* Mental Health Goals */}
                <SimpleCard colSpan>
                    <TextArea
                        label="Mental Health Goals"
                        name="mental_health_goals"
                        value={formData.mental_health_goals || ""}
                        onChange={handleChange}
                        placeholder="Reduce anxiety, improve focus, better sleep (optional)"
                        rows={3}
                    />
                </SimpleCard>
            </div>
        </div>

    );
}


function LifestyleCard({
    title,
    icon,
    gradient,
    iconGradient,
    colSpan,
    children,
}) {
    return (
        <div
            className={`rounded-2xl border border-slate-200  p-6 shadow-sm transition hover:shadow-md ${colSpan ? "md:col-span-2" : ""
                }`}
        >
            <div className="flex items-center gap-3 mb-4">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl  text-xl text-white shadow-lg`}
                >
                    {icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                    {title}
                </h3>
            </div>
            {children}
        </div>
    );
}

function SimpleCard({ colSpan, children }) {
    return (
        <div
            className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md ${colSpan ? "md:col-span-2" : ""
                }`}
        >
            {children}
        </div>
    );
}
