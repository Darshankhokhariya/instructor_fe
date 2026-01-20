import { useState } from 'react';

export default function InteractiveBodyMap({ selectedAreas = [], onAreaToggle }) {
    const bodyAreas = [
        { id: 'upper-back', label: 'Upper Back', x: 50, y: 25 },
        { id: 'lower-back', label: 'Lower Back', x: 50, y: 50 },
        { id: 'right-shoulder', label: 'Right Shoulder', x: 30, y: 20 },
        { id: 'left-shoulder', label: 'Left Shoulder', x: 70, y: 20 },
        { id: 'right-knee', label: 'Right Knee', x: 40, y: 75 },
        { id: 'left-knee', label: 'Left Knee', x: 60, y: 75 },
        { id: 'neck', label: 'Neck', x: 50, y: 10 },
        { id: 'hips', label: 'Hips', x: 50, y: 55 },
    ];

    const isSelected = (areaId) => selectedAreas.includes(areaId);

    return (
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="flex items-start gap-6">
                {/* Body SVG */}
                <div className="flex-shrink-0">
                    <div className="relative w-48 h-80 bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            {/* Body outline */}
                            <g className="text-slate-300" fill="currentColor" opacity="0.3">
                                {/* Head */}
                                <circle cx="50" cy="8" r="6" />
                                {/* Neck */}
                                <rect x="48" y="14" width="4" height="6" />
                                {/* Torso */}
                                <ellipse cx="50" cy="40" rx="15" ry="20" />
                                {/* Arms */}
                                <rect x="25" y="22" width="5" height="25" rx="2" />
                                <rect x="70" y="22" width="5" height="25" rx="2" />
                                {/* Legs */}
                                <rect x="40" y="58" width="6" height="35" rx="3" />
                                <rect x="54" y="58" width="6" height="35" rx="3" />
                            </g>

                            {/* Clickable areas */}
                            {bodyAreas.map((area) => (
                                <circle
                                    key={area.id}
                                    cx={area.x}
                                    cy={area.y}
                                    r="5"
                                    className={`cursor-pointer transition-all ${isSelected(area.id)
                                            ? 'fill-teal-500 stroke-teal-600'
                                            : 'fill-slate-200 stroke-slate-300 hover:fill-teal-200'
                                        }`}
                                    strokeWidth="1"
                                    onClick={() => onAreaToggle(area.id)}
                                />
                            ))}
                        </svg>
                    </div>
                    <p className="text-xs text-slate-500 text-center mt-2">
                        Tap areas where you feel pain or have had injuries
                    </p>
                </div>

                {/* Selected areas list */}
                <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-3">Selected Areas</h4>
                    {selectedAreas.length === 0 ? (
                        <p className="text-sm text-slate-500 italic">No areas selected</p>
                    ) : (
                        <div className="space-y-2">
                            {selectedAreas.map((areaId) => {
                                const area = bodyAreas.find(a => a.id === areaId);
                                return (
                                    <div
                                        key={areaId}
                                        className="flex items-center justify-between bg-teal-50 border border-teal-200 rounded-lg px-3 py-2"
                                    >
                                        <span className="text-sm font-medium text-teal-900">
                                            {area?.label.toUpperCase()} SELECTED
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => onAreaToggle(areaId)}
                                            className="text-teal-600 hover:text-teal-800"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
