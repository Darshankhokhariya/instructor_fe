import { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { LuLanguages } from 'react-icons/lu';

// Dummy components to replace Redux/external dependencies
const DummyLanguageSelector = () => (
    <div className="text-gray-700 flex items-center gap-2">
        <LuLanguages className="w-5 h-5" />
        <span className="text-sm font-medium hidden md:inline">EN</span>
    </div>
);

const DummyCreatableSelector = ({ options, value, onChange, placeholder, classNamePrefix, isClearable = true }) => (
    <select
        value={value?.value || ''}
        onChange={(e) => {
            const selected = options.find(option => option.value === e.target.value);
            onChange(selected);
        }}
        className={`${classNamePrefix} block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
    >
        {isClearable && <option value="">{placeholder || 'Select...'}</option>}
        {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
);

const Header = ({ onToggleSidebar }) => {
    // Dummy state for selected company/workspace
    const dummyCompanyOptions = [
        { label: 'Yogalink Studio (2024-2025)', value: '1', data: { businessName: 'Yogalink Studio', financialYear: '2024-2025' } },
        { label: 'Peaceful Practice (2023-2024)', value: '2', data: { businessName: 'Peaceful Practice', financialYear: '2023-2024' } },
    ];
    const [selectedCompany, setSelectedCompany] = useState(dummyCompanyOptions[0].data);
    const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    // Company dropdown logic
    const companyOptions = dummyCompanyOptions;

    const selectedOption = selectedCompany
        ? {
            label: `${selectedCompany.businessName} (${selectedCompany.financialYear || "-"})`,
            value: selectedCompany.value,
            data: selectedCompany,
        }
        : null;

    const handleCompanyChange = (selectedOption) => {
        if (selectedOption) {
            setSelectedCompany(selectedOption.data);
        }
    };

    // Close right sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setRightSidebarOpen(false);
            }
        };

        if (isRightSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isRightSidebarOpen]);

    return (
        <>
            <header className="flex items-center justify-between bg-white sticky top-0 h-[6svh] md:h-[8svh] border-b border-gray-200 md:border-0 md:shadow z-50">
                {/* Left Side - Logo and Sidebar Toggle */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-md hover:bg-gray-200 transition"
                        aria-label="Toggle Sidebar"
                    >
                        <FaBars className="cursor-pointer w-6 h-6 text-gray-700" />
                    </button>
                    {/* Placeholder for Yogalink Logo - use your actual path */}
                    Yogalink
                    {/* <img src="/images/yogalink-logo.png" alt="Yogalink Logo" className="h-12 object-contain" />
                     */}
                </div>
            </header>
        </>
    );
};

export default Header;