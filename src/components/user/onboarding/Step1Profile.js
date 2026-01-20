import Input from '@/components/common/Input';
import Selector from '@/components/common/Selector';
import TextArea from '@/components/common/TextArea';

export default function Step1Profile({ formData, updateFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 100 }, (_, i) => {
        const year = currentYear - i - 10;
        return { value: year.toString(), label: year.toString() };
    });

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];

    return (
        <div className="space-y-8 animate-fadeIn font-jakarta">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-emerald-500/10 rounded-full">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-primary tracking-wide">STEP 1 OF 6 · PROFILE</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text">
                    Let's Get to Know You
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Help us personalize your yoga journey for the best results.
                </p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Full Name */}
                <div className="md:col-span-2 transform transition-all hover:scale-[1.01]">
                    <Input
                        label="What's your name?"
                        name="full_name"
                        type="text"
                        value={formData.full_name || ''}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Year of Birth */}
                <div className="transform transition-all hover:scale-[1.01]">
                    <Selector
                        label="Year of Birth"
                        name="dob"
                        value={formData.dob || ''}
                        onChange={handleChange}
                        options={yearOptions}
                        placeholder="Select year"
                        required
                    />
                </div>

                {/* Gender */}
                <div className="transform transition-all hover:scale-[1.01]">
                    <Selector
                        label="Gender Identity"
                        name="gender"
                        value={formData.gender || ''}
                        onChange={handleChange}
                        options={genderOptions}
                        placeholder="Select gender"
                        required
                    />
                </div>

                {/* Height */}
                <div className="transform transition-all hover:scale-[1.01]">
                    <Input
                        label="Height (cm)"
                        name="height"
                        type="number"
                        value={formData.height || ''}
                        onChange={handleChange}
                        placeholder="e.g., 175"
                        min="100"
                        max="250"
                        required
                    />
                </div>

                {/* Weight */}
                <div className="transform transition-all hover:scale-[1.01]">
                    <Input
                        label="Weight (kg)"
                        name="weight"
                        type="number"
                        value={formData.weight || ''}
                        onChange={handleChange}
                        placeholder="e.g., 72"
                        min="30"
                        max="200"
                        required
                    />
                </div>

                {/* Occupation */}
                <div className="md:col-span-2 transform transition-all hover:scale-[1.01]">
                    <Input
                        label="Occupation"
                        name="occupation"
                        type="text"
                        value={formData.occupation || ''}
                        onChange={handleChange}
                        placeholder="e.g., Software Engineer, Teacher, Student"
                        required
                    />
                </div>

                {/* Daily Routine */}
                <div className="md:col-span-2 transform transition-all hover:scale-[1.01]">
                    <TextArea
                        label="Daily Routine"
                        name="daily_routine"
                        value={formData.daily_routine || ''}
                        onChange={handleChange}
                        placeholder="e.g., Works 9-6, sits most of the day, walks in the evening"
                        rows={3}
                        required
                    />
                </div>
            </div>
        </div>
    );
}
