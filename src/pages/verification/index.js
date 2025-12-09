import Link from 'next/link';

export default function PendingVerification() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">

            {/* Brand / Logo Area */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
                <h2 className="text-3xl font-extrabold text-primary tracking-tight">
                    YogaLink
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    Connect. Flow. Grow.
                </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-teal-900/10 sm:rounded-lg sm:px-10 border-t-4 border-primary">

                    {/* Status Icon with Pulse Animation */}
                    <div className="flex justify-center mb-6">
                        <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-amber-50">
                            <div className="absolute animate-ping h-16 w-16 rounded-full bg-amber-200 opacity-75"></div>
                            {/* Hourglass Icon */}
                            <svg
                                className="relative h-10 w-10 text-amber-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Main Message */}
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold text-gray-900">
                            Verification in Progress
                        </h3>
                        <p className="text-gray-600">
                            Thanks for joining YogaLink! We are currently reviewing your documents to ensure the safety and quality of our community.
                        </p>
                    </div>

                    {/* Timeline / Steps */}
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-2 bg-white text-sm text-gray-500">
                                    Estimated time: 24-48 hours
                                </span>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className="mt-6 space-y-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-sm text-gray-500">Profile Details Submitted</p>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-sm text-gray-500">Certification Uploaded</p>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    {/* Spinner Icon */}
                                    <svg className="animate-spin h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                                <p className="ml-3 text-sm text-gray-900 font-medium">Admin Approval Pending</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 space-y-3">
                        <Link href="/" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out">
                            Return to Homepage
                        </Link>

                        <button
                            type="button"
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
                        >
                            Contact Support
                        </button>
                    </div>

                </div>

                {/* Footer Text */}
                <p className="mt-6 text-center text-xs text-gray-500">
                    Check your email inbox. We will notify you once the process is complete.
                </p>
            </div>
        </div>
    );
}