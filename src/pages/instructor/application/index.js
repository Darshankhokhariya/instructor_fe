import React from 'react'
import { FaShieldAlt } from 'react-icons/fa'

function Application() {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full py-10 animate-in zoom-in-95">
            <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-xl"><FaShieldAlt size={40} /></div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Application Submitted!</h2>
            <button onClick={() => router.push('/')} className="text-white bg-teal-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-teal-700 transition-colors">Return Home</button>
        </div>
    )
}

export default Application