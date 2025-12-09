import React from 'react'

function Application() {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full py-10 animate-in zoom-in-95">
            <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-xl"><FaShieldAlt size={40} /></div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Application Submitted!</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-4">Thank you for submitting your profile. We are now verifying your documents and qualifications.</p>
            <p className="text-slate-600 font-semibold mb-8">Application ID: #YGL-{Math.floor(Math.random() * 90000 + 10000)}</p>
            <button onClick={() => router.push('/')} className="text-white bg-teal-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-teal-700 transition-colors">Return Home</button>
        </div>
    )
}

export default Application