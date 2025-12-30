import React, { useEffect, useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { FiCalendar, FiPlus, FiX, FiClock, FiCheck } from "react-icons/fi";

const WeeklySchedule = ({
  selectedDays = [],
  onDaysChange,
  timeSlots = {},
  onTimeSlotsChange,
  error,
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

  const [commonTime, setCommonTime] = useState({ start: "", end: "" });
  const [customTimes, setCustomTimes] = useState({});
  const [editingDay, setEditingDay] = useState(null);
  const isInitialized = useRef(false);
  /* ===============================
       SYNC → OLD WORKING FORMAT
    =============================== */
  const syncToParent = (days, common, custom) => {
    const result = {};

    days.forEach((day) => {
      const time = custom[day] || common;
      if (time.start && time.end) {
        result[day] = [{ start: time.start, end: time.end }];
      }
    });

    onDaysChange(days);
    onTimeSlotsChange(result);
  };

  /* ===============================
       DAY TOGGLE
    =============================== */
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      const updatedDays = selectedDays.filter((d) => d !== day);
      const updatedCustom = { ...customTimes };
      delete updatedCustom[day];

      setCustomTimes(updatedCustom);
      syncToParent(updatedDays, commonTime, updatedCustom);
    } else {
      const updatedDays = [...selectedDays, day];
      syncToParent(updatedDays, commonTime, customTimes);
    }
  };

  /* ===============================
       COMMON TIME
    =============================== */
  const updateCommonTime = (field, value) => {
    const updated = { ...commonTime, [field]: value };
    setCommonTime(updated);
    syncToParent(selectedDays, updated, customTimes);
  };

  /* ===============================
       CUSTOM TIME
    =============================== */
  const enableCustomTime = (day) => {
    const updated = {
      ...customTimes,
      [day]: { ...commonTime },
    };
    setCustomTimes(updated);
    syncToParent(selectedDays, commonTime, updated);
  };

  const updateCustomTime = (day, field, value) => {
    const updated = {
      ...customTimes,
      [day]: { ...customTimes[day], [field]: value },
    };
    setCustomTimes(updated);
    syncToParent(selectedDays, commonTime, updated);
  };

  const handleSetCustomTime = (day) => {
    // sync latest custom time
    syncToParent(selectedDays, commonTime, customTimes);

    // close customize UI ONLY
    setEditingDay(null);
  };

  const removeCustomTime = (day) => {
    const updated = { ...customTimes };
    delete updated[day];
    setCustomTimes(updated);
    syncToParent(selectedDays, commonTime, updated);
  };

  /* ===============================
       HELPERS
    =============================== */
  const formatTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour % 12 || 12}:${m} ${ampm}`;
  };

  const isComplete =
    selectedDays.length > 0 &&
    commonTime.start &&
    commonTime.end &&
    selectedDays.every(
      (d) =>
        (customTimes[d] || commonTime).start &&
        (customTimes[d] || commonTime).end
    );

  useEffect(() => {
    if (
      isInitialized.current ||
      !timeSlots ||
      Object.keys(timeSlots).length === 0
    ) {
      return;
    }

    const days = Object.keys(timeSlots);
    const firstDay = days[0];
    const firstSlot = timeSlots[firstDay]?.[0];

    if (!firstSlot) return;

    // set common time
    setCommonTime({
      start: firstSlot.start,
      end: firstSlot.end,
    });

    // set custom times
    const custom = {};

    days.forEach((day) => {
      const slot = timeSlots[day]?.[0];
      if (slot.start !== firstSlot.start || slot.end !== firstSlot.end) {
        custom[day] = {
          start: slot.start,
          end: slot.end,
        };
      }
    });

    setCustomTimes(custom);

    // 🔒 lock initialization
    isInitialized.current = true;
  }, [timeSlots]);

  /* ===============================
       UI
    =============================== */
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Availability (Required)
      </label>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase">
            <FiCalendar className="text-teal-500" />
            Weekly Schedule
          </div>

          {isComplete && (
            <div className="flex items-center gap-1.5 text-xs text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full">
              <FiCheck />
              Complete
            </div>
          )}
        </div>

        {/* Days */}
        <div className="flex gap-2 flex-wrap">
          {daysOfWeek.map((day) => {
            const isSelected = selectedDays.includes(day.value);
            return (
              <button
                key={day.value}
                type="button"
                onClick={() => toggleDay(day.value)}
                className={`h-12 w-12 rounded-full font-semibold transition
                  ${isSelected
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  }`}
              >
                {day.label}
              </button>
            );
          })}
        </div>

        {/* Common Time */}
        {selectedDays.length > 0 && (
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="flex items-center gap-2 font-semibold">
              <FiClock className="text-teal-500" />
              Default Time Slot
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="time"
                value={commonTime.start}
                onChange={(e) => updateCommonTime("start", e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="time"
                value={commonTime.end}
                onChange={(e) => updateCommonTime("end", e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
            </div>
          </div>
        )}

        {/* Custom Days */}
        {selectedDays.map((dayValue) => {
          const day = daysOfWeek.find((d) => d.value === dayValue);
          const custom = customTimes[dayValue];
          const isEditing = editingDay === dayValue;
          const effective = custom || commonTime;

          return (
            <div
              key={dayValue}
              className={`border rounded-lg p-4 ${isEditing ? "bg-teal-50 border-teal-200" : ""
                }`}
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">{day.full}</h4>

                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => {
                      enableCustomTime(dayValue);
                      setEditingDay(dayValue);
                    }}
                    className="text-sm text-teal-600 flex items-center gap-1"
                  >
                    <FiPlus /> Customize
                  </button>
                ) : (
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        removeCustomTime(dayValue);
                        setEditingDay(null);
                      }}
                      className="text-sm px-2 border rounded-2xl text-red-500 flex items-center gap-1 cursor-pointer"
                    >
                      <FiX />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetCustomTime(dayValue)}
                      className="text-sm bg-primary text-white flex px-4 rounded-2xl items-center gap-1 cursor-pointer"
                    >
                      <BiCheck /> Set
                    </button>
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500 mb-2">
                {formatTime(effective.start)} – {formatTime(effective.end)}
              </p>

              {isEditing && custom && (
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="time"
                    value={custom.start}
                    onChange={(e) =>
                      updateCustomTime(dayValue, "start", e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
                  />
                  <input
                    type="time"
                    value={custom.end}
                    onChange={(e) =>
                      updateCustomTime(dayValue, "end", e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default WeeklySchedule;
