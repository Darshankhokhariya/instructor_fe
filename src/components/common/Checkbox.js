const Checkbox = ({ label, name, checked, onChange }) => (
    <div className="mb-3 flex items-start">
        <input
            id={name}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor={name} className="ml-2 text-sm text-gray-700">{label}</label>
    </div>
);


export default Checkbox;