import React, { useState } from 'react';
import { FaVideo, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

// --- YOUR COMMON COMPONENTS ---
import Input from '@/components/common/Input';
import Selector from '@/components/common/Selector';
import TextArea from '@/components/common/TextArea';
import Toggle from '@/components/common/Toggle';
import Modal from '../common/Modal';

const CreateClassModal = ({ isOpen, onClose }) => {

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        duration: '60 Mins',
        type: 'ONLINE', // 'ONLINE' or 'IN_PERSON'
        location: '',
        priceType: 'PAID', // 'PAID' or 'FREE'
        price: '',
        capacity: '20',
    });

    // Handle standard changes (matching your Onboarding logic)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' || type === 'toggle') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Class Created:", formData);
        // TODO: Add API call here
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Schedule New Class">
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* 1. Basic Info - Using your Input/TextArea */}
                <div className="space-y-6">
                    <Input
                        label="Class Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Morning Vinyasa Flow"
                        required
                    />

                    <TextArea
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="What will students learn?"
                    />
                </div>

                {/* 2. Timing - Using your Input/Selector */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                        label="Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Start Time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                    <Selector
                        label="Duration"
                        name="duration"
                        options={["30 Mins", "45 Mins", "60 Mins", "90 Mins", "120 Mins"]}
                        value={formData.duration}
                        onChange={handleChange}
                    />
                </div>

                {/* 3. Class Type (Custom UI for Visual Clarity) */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 tracking-wide">
                        Class Location
                    </label>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Online Option */}
                        <div
                            onClick={() => setFormData(prev => ({ ...prev, type: 'ONLINE' }))}
                            className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${formData.type === 'ONLINE'
                                ? 'border-teal-600 bg-teal-50 text-teal-800'
                                : 'border-slate-100 hover:border-slate-300 text-slate-500'
                                }`}
                        >
                            <FaVideo size={20} className="mb-2" />
                            <span className="font-semibold text-sm">Online Class</span>
                        </div>

                        {/* In-Person Option */}
                        <div
                            onClick={() => setFormData(prev => ({ ...prev, type: 'IN_PERSON' }))}
                            className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${formData.type === 'IN_PERSON'
                                ? 'border-teal-600 bg-teal-50 text-teal-800'
                                : 'border-slate-100 hover:border-slate-300 text-slate-500'
                                }`}
                        >
                            <FaMapMarkerAlt size={20} className="mb-2" />
                            <span className="font-semibold text-sm">In-Studio</span>
                        </div>
                    </div>

                    {/* Conditional Fields based on Type */}
                    {formData.type === 'ONLINE' ? (
                        <div className="bg-primary/10 p-4 rounded-xl border border-primary text-sm text-primary">
                            <span className="font-bold">Note:</span> A Zoom link will be auto-generated and sent to attendees.
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-top-2">
                            <Input
                                label="Studio Address / Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Room B, Main Wellness Center"
                            />
                        </div>
                    )}
                </div>

                {/* 4. Pricing & Capacity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Custom Price Logic combining your Selector and Input */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 tracking-wide">Pricing</label>
                        <div className="flex gap-2">
                            <div className="w-1/3">
                                <select
                                    name="priceType"
                                    value={formData.priceType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-none focus:border-teal-500 transition-colors"
                                >
                                    <option value="PAID">Paid</option>
                                    <option value="FREE">Free</option>
                                </select>
                            </div>
                            <div className="w-2/3">
                                {formData.priceType === 'PAID' ? (
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-teal-500 transition-colors"
                                            placeholder="0.00"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 flex items-center">
                                        No Charge
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <Input
                        label="Max Capacity"
                        name="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={handleChange}
                    />
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 mt-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-medium text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center px-8 py-3 bg-teal-600 text-white rounded-xl font-bold shadow-md hover:bg-teal-700 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                        Create Class
                        <FaCheckCircle className="ml-2" />
                    </button>
                </div>

            </form>
        </Modal>
    );
};

export default CreateClassModal;