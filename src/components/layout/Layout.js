import { useState, useEffect } from 'react';
import Header from './Header'; // Import the Header component
import Sidebar from './Sidebar'; // Import the Sidebar component

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userRole, setUserRole] = useState('admin');

    useEffect(() => {
        // Determine user role based on current pathname
        if (typeof window !== 'undefined') {
            const pathname = window.location.pathname;
            if (pathname.startsWith('/manager')) {
                setUserRole('manager');
            } else if (pathname.startsWith('/admin')) {
                setUserRole('admin');
            }
        }
    }, []);

    // Function to toggle the sidebar state
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const contentShiftClass = isSidebarOpen ? '' : '';

    return (
        <div className="flex flex-col  bg-gray-50">

            <div className="flex ">

                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} userRole={userRole} />

                <div className='flex flex-col h-screen w-full'>
                    <Header onToggleSidebar={toggleSidebar} />
                    <main
                        className={`flex-grow  transition-all duration-300 ${contentShiftClass} overflow-x-hidden  pb-20 md:pb-0 h-[90svh]`}
                    >
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;