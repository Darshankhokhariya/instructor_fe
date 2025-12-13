import { useState } from 'react';
import Header from './Header'; // Import the Header component
import Sidebar from './Sidebar'; // Import the Sidebar component

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to toggle the sidebar state
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const contentShiftClass = isSidebarOpen ? '' : '';

    return (
        <div className="flex flex-col  bg-gray-50">

            <div className="flex ">

                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                <main
                    className={`flex-grow  transition-all duration-300 ${contentShiftClass} overflow-x-hidden  pb-20 md:pb-0`}
                >
                    <Header onToggleSidebar={toggleSidebar} />
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;