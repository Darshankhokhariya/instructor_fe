export default function ToggleSwitch({ enabled, onChange, label, description }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex-1">
                {label && <div className="font-semibold text-slate-900 mb-1">{label}</div>}
                {description && <div className="text-sm text-slate-600">{description}</div>}
            </div>
            <button
                type="button"
                onClick={() => onChange(!enabled)}
                className={`
                    relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ease-in-out
                    ${enabled ? 'bg-teal-500' : 'bg-slate-300'}
                `}
            >
                <span
                    className={`
                        inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ease-in-out
                        ${enabled ? 'translate-x-6' : 'translate-x-1'}
                    `}
                />
            </button>
        </div>
    );
}
