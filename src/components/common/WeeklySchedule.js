import React, { useState } from "react";
import { FiCalendar, FiMinus } from "react-icons/fi";

const WeeklySchedule = ({
    selectedDays = [],
    onDaysChange,
    timeSlots = {},
    onTimeSlotsChange,
    error
}) => {
    const daysOfWeek = [
        { label: "M", value: "monday", full: "Monday" },
        { label: "T", value: "tuesday", full: "Tuesday" },
        { label: "W", value: "wednesday", full: "Wednesday" },
        { label: "T", value: "thursday", full: "Thursday" },
        { label: "F", value: "friday", full: "Friday" },
        { label: "S", value: "saturday", full: "Saturday" },
        { label: "S", value: "sunday", full: "Sunday" },
    ];

    const [expandedDay, setExpandedDay] = useState(null);

    const toggleDay = (dayValue) => {
        if (selectedDays.includes(dayValue)) {
            // Remove day
            onDaysChange(selectedDays.filter(d => d !== dayValue));
            // Remove time slots for this day
            const newTimeSlots = { ...timeSlots };
            delete newTimeSlots[dayValue];
            onTimeSlotsChange(newTimeSlots);
            if (expandedDay === dayValue) {
                setExpandedDay(null);
            }
        } else {
            // Add day
            onDaysChange([...selectedDays, dayValue]);
            // Initialize with one empty time slot
            onTimeSlotsChange({
                ...timeSlots,
                [dayValue]: [{ start: "", end: "" }]
            });
            setExpandedDay(dayValue);
        }
    };

    const addTimeSlot = (dayValue) => {
        const currentSlots = timeSlots[dayValue] || [];
        onTimeSlotsChange({
            ...timeSlots,
            [dayValue]: [...currentSlots, { start: "", end: "" }]
        });
    };

    const removeTimeSlot = (dayValue, index) => {
        const currentSlots = timeSlots[dayValue] || [];
        if (currentSlots.length > 1) {
            onTimeSlotsChange({
                ...timeSlots,
                [dayValue]: currentSlots.filter((_, i) => i !== index)
            });
        }
    };

    const updateTimeSlot = (dayValue, index, field, value) => {
        const currentSlots = timeSlots[dayValue] || [];
        const updatedSlots = [...currentSlots];
        updatedSlots[index] = { ...updatedSlots[index], [field]: value };
        onTimeSlotsChange({
            ...timeSlots,
            [dayValue]: updatedSlots
        });
    };

    const toggleDayExpansion = (dayValue) => {
        if (selectedDays.includes(dayValue)) {
            setExpandedDay(expandedDay === dayValue ? null : dayValue);
        }
    };

    const isDayEnabled = (dayValue) => {
        return selectedDays.includes(dayValue);
    };

    const getTimeSlotCount = (dayValue) => {
        return timeSlots[dayValue]?.length || 0;
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Teaching Days (Required)
            </label>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                {/* Weekly Schedule Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <FiCalendar className="text-gray-400" />
                        Weekly Schedule
                    </div>
                </div>

                {/* Day Selector */}
                <div className="flex gap-2 mb-6">
                    {daysOfWeek.map((day) => {
                        const isSelected = isDayEnabled(day.value);
                        return (
                            <button
                                key={day.value}
                                type="button"
                                onClick={() => toggleDay(day.value)}
                                className={`
                  relative  h-12 w-12 rounded-full font-semibold text-sm transition-all duration-200
                  ${isSelected
                                        ? "bg-teal-500 text-white shadow-md shadow-teal-200"
                                        : "bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-200"
                                    }
                `}
                            >
                                {day.label}
                                {isSelected && getTimeSlotCount(day.value) > 0 && (
                                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Expanded Day Details */}
                {selectedDays.map((dayValue) => {
                    const day = daysOfWeek.find(d => d.value === dayValue);
                    const isExpanded = expandedDay === dayValue;
                    const slots = timeSlots[dayValue] || [];

                    return (
                        <div key={dayValue} className="mb-4 last:mb-0">
                            <div
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => toggleDayExpansion(dayValue)}
                            >
                                <div>
                                    <h3 className="font-semibold text-gray-900">{day.full}</h3>
                                    <p className="text-xs text-gray-500">
                                        {slots.length} time slot{slots.length !== 1 ? 's' : ''} defined
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        checked={isDayEnabled(dayValue)}
                                        onChange={() => toggleDay(dayValue)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                </label>
                            </div>

                            {isExpanded && (
                                <div className="mt-3 space-y-3 pl-4">
                                    {slots.map((slot, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="flex-1 grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
                                                        Start
                                                    </label>
                                                    <input
                                                        type="time"
                                                        value={slot.start}
                                                        onChange={(e) => updateTimeSlot(dayValue, index, 'start', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
                                                        End
                                                    </label>
                                                    <input
                                                        type="time"
                                                        value={slot.end}
                                                        onChange={(e) => updateTimeSlot(dayValue, index, 'end', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                                    />
                                                </div>
                                            </div>
                                            {slots.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeTimeSlot(dayValue, index)}
                                                    className="mt-6 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <FiMinus className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() => addTimeSlot(dayValue)}
                                        className="w-full py-2.5 border-2 border-dashed border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium text-sm"
                                    >
                                        + Add Time Slot
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}

                {selectedDays.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                        Select days above to define your availability
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-2 text-xs text-red-500">{error}</p>
            )}
        </div>
    );
};

export default WeeklySchedule;
