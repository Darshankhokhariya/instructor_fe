import { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { LuLanguages } from 'react-icons/lu';
import { MdNotifications } from 'react-icons/md';

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
            <div class="flex items-center justify-between px-6 pb-2 h-[10svh] bg-white">
                <div class="flex flex-col">
                    <span class="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Good Morning</span>
                    <h2 class="text-text-main-light dark:text-text-main-dark text-xl font-bold leading-tight tracking-tight">Namaste, Priya</h2>
                </div>
                <div class="flex items-center gap-3">
                    <div class="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 bg-gray-200">
                        <img alt="Profile" class="h-full w-full object-cover" data-alt="Portrait of a yoga instructor smiling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRusvG5X2RFhmH9y_qAXcQNrK8AZ8v2ppSGDI72vLFgvdFccPR0hETCjdgma4pXr2uyJ74jvF7nyxMsXiaGapcrnorwzsLCdETGNJUV0a6_SI6I0yps7E_88SQvFiLEODzCEb9n9hFLku94XHRHIjYWhNRSocnrPM2SfUcI5mjgQMz52Rldsq645flUNeMoCxndGjNLCjKjKQEEH3Eco9X3GU6UMUt1j1T9BHpZeDOvw5hgbuYxKWH_n9hGkRCX-rndTiVHvCI23Jw" />
                    </div>
                    <button class="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-card-dark shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 transition-transform active:scale-95">
                        <MdNotifications class="text-text-sub-light dark:text-text-sub-dark text-lg" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;