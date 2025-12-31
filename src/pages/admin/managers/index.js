"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/components/layout/Layout";
import CreateManagerModal from "@/components/admin/CreateManagerModal";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { getManagers, selectManagers } from "@/redux/slices/userSlice";

function Manager() {
    const dispatch = useDispatch();
    const managersState = useSelector(selectManagers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    // Fetch managers on component mount and when page/limit changes
    useEffect(() => {
        dispatch(getManagers({ page, limit, role: "manager" }));
    }, [dispatch, page, limit]);

    const handleCreateManager = () => {
        // Refresh the managers list after creating a new manager
        dispatch(getManagers({ page, limit, role: "manager" }));
    };

    const handleDeleteManager = (id) => {
        if (window.confirm("Are you sure you want to delete this manager?")) {
            // TODO: Implement delete API call
            console.log("Delete manager:", id);
            // After deletion, refresh the list
            dispatch(getManagers({ page, limit, role: "manager" }));
        }
    };

    // Get managers from Redux state
    const managers = Array.isArray(managersState?.data?.data) ? managersState.data.data : [];
    const isLoading = managersState?.loading || false;

    const filteredManagers = managers.filter(
        (manager) =>
            manager.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            manager.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            manager.mobile?.includes(searchTerm)
    );

    return (
        <Layout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Managers</h1>
                    <p className="text-gray-600">Manage all managers in the system</p>
                </div>

                {/* Actions Bar */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaSearch size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search managers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Create Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-2.5 cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-200 font-medium"
                    >
                        <FaPlus size={16} />
                        Create Manager
                    </button>
                </div>

                {/* Managers Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Mobile
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Created At
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <svg className="animate-spin h-6 w-6 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span className="text-gray-500">Loading managers...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredManagers.length > 0 ? (
                                    filteredManagers.map((manager) => (
                                        <tr
                                            key={manager._id || manager.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold mr-3">
                                                        {manager.name?.charAt(0)?.toUpperCase() || 'M'}
                                                    </div>
                                                    <div className="font-medium text-gray-900">
                                                        {manager.name || 'N/A'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                                {manager.email || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                                {manager.mobile || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                                {manager.createdAt ? new Date(manager.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                            {/* <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    <button
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <FaEdit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteManager(manager._id || manager.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <FaTrash size={16} />
                                                    </button>
                                                </div>
                                            </td> */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            No managers found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create Manager Modal */}
            <CreateManagerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateManager}
            />
        </Layout>
    );
}

export default Manager;