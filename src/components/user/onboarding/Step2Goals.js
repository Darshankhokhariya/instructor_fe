import TextArea from '@/components/common/TextArea';

export default function Step2Goals({ formData, updateFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/10 rounded-full">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-primary tracking-wide">STEP 2 OF 6 · HEALTH</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    Health & Medical Information
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Help us understand your health background to create a safe and effective practice plan.
                </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Medical Conditions */}
                <div className="group transform transition-all hover:scale-[1.01]">
                    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border-2 border-slate-200 group-hover:border-primary/30 transition-all shadow-sm group-hover:shadow-md">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white text-xl">🏥</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Medical Conditions</h3>
                        </div>
                        <TextArea
                            name="medical_conditions"
                            value={formData.medical_conditions || ''}
                            onChange={handleChange}
                            placeholder="e.g., Hypertension, mild asthma (leave blank if none)"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Injuries */}
                <div className="group transform transition-all hover:scale-[1.01]">
                    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border-2 border-slate-200 group-hover:border-primary/30 transition-all shadow-sm group-hover:shadow-md">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white text-xl">🩹</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Past or Current Injuries</h3>
                        </div>
                        <TextArea
                            name="injuries"
                            value={formData.injuries || ''}
                            onChange={handleChange}
                            placeholder="e.g., Lower back pain, knee injury (leave blank if none)"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Medications */}
                <div className="group transform transition-all hover:scale-[1.01]">
                    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border-2 border-slate-200 group-hover:border-primary/30 transition-all shadow-sm group-hover:shadow-md">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white text-xl">💊</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Current Medications</h3>
                        </div>
                        <TextArea
                            name="medications"
                            value={formData.medications || ''}
                            onChange={handleChange}
                            placeholder="e.g., Blood pressure medication (leave blank if none)"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Mobility Restrictions */}
                <div className="group transform transition-all hover:scale-[1.01]">
                    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border-2 border-slate-200 group-hover:border-primary/30 transition-all shadow-sm group-hover:shadow-md">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white text-xl">🦴</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Mobility Restrictions</h3>
                        </div>
                        <TextArea
                            name="mobility_restrictions"
                            value={formData.mobility_restrictions || ''}
                            onChange={handleChange}
                            placeholder="e.g., Knee stiffness during squats, limited shoulder mobility (leave blank if none)"
                            rows={3}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
