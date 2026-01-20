import Input from "@/components/common/Input";
import Selector from "@/components/common/Selector";
import TextArea from "@/components/common/TextArea";

export default function Step3Experience({ formData, updateFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const fitnessLevelOptions = [
        { value: "sedentary", label: "🪑 Sedentary – Little to no exercise" },
        { value: "moderately active", label: "🏃 Moderately Active – 3–5 days/week" },
        { value: "very active", label: "💪 Very Active – 6–7 days/week" },
    ];

    const yogaExperienceOptions = [
        { value: "beginner", label: "🌱 Beginner – New to yoga" },
        { value: "intermediate", label: "🌿 Intermediate – 6 months to 2 years" },
        { value: "advanced", label: "🌳 Advanced – 2+ years of practice" },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-10 animate-fadeIn">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-semibold text-emerald-600 tracking-wide">
                        STEP 3 OF 6 · FITNESS
                    </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Your Fitness Journey
                </h2>

                <p className="text-slate-600 max-w-2xl mx-auto">
                    Tell us about your fitness level and yoga experience so we can
                    personalize your practice.
                </p>
            </div>

            {/* Form Cards */}
            <div className="grid gap-6">
                {/* Fitness Level */}
                <Card>
                    <Selector
                        label="Current Fitness Level"
                        name="current_fitness_level"
                        value={formData.current_fitness_level || ""}
                        onChange={handleChange}
                        options={fitnessLevelOptions}
                        placeholder="Select your fitness level"
                        required
                    />
                </Card>

                {/* Yoga Experience */}
                <Card>
                    <Selector
                        label="Yoga Experience Level"
                        name="yoga_experience_level"
                        value={formData.yoga_experience_level || ""}
                        onChange={handleChange}
                        options={yogaExperienceOptions}
                        placeholder="Select your yoga experience"
                        required
                    />
                </Card>

                {/* Previous Yoga Styles */}
                <Card>
                    <Input
                        label="Previous Yoga Styles"
                        name="previous_yoga_styles"
                        value={formData.previous_yoga_styles || ""}
                        onChange={handleChange}
                        placeholder="Hatha, Vinyasa (optional)"
                    />
                </Card>

                {/* Other Activities */}
                <Card>
                    <Input
                        label="Other Physical Activities"
                        name="other_activities"
                        value={formData.other_activities || ""}
                        onChange={handleChange}
                        placeholder="Running, swimming, cycling"
                    />
                </Card>

                {/* Goals */}
                <Card>
                    <TextArea
                        label="Your Fitness Goals"
                        name="goals"
                        value={formData.goals || ""}
                        onChange={handleChange}
                        placeholder="Weight loss, flexibility, stress relief"
                        rows={3}
                    />
                </Card>

                {/* Specific Targets */}
                <Card>
                    <Input
                        label="Specific Targets"
                        name="specific_targets"
                        value={formData.specific_targets || ""}
                        onChange={handleChange}
                        placeholder="Lose 5 kg in 3 months"
                    />
                </Card>

                {/* Areas of Interest */}
                <Card>
                    <TextArea
                        label="Areas of Interest"
                        name="areas_of_interest"
                        value={formData.areas_of_interest || ""}
                        onChange={handleChange}
                        placeholder="Meditation, strength building, balance"
                        rows={2}
                    />
                </Card>
            </div>

            {/* Info Card */}
            <div className="rounded-2xl border bg-gradient-to-br from-indigo-50 to-blue-50 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 shadow-lg">
                        <svg
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-indigo-900">
                            Personalized Practice
                        </h3>
                        <p className="text-sm text-indigo-800 leading-relaxed">
                            We’ll tailor your yoga plan based on your fitness level and
                            goals to ensure safe and effective progress.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                  UI Card                                   */
/* -------------------------------------------------------------------------- */

function Card({ children }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            {children}
        </div>
    );
}
