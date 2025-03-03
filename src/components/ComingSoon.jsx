import React from 'react'
import { useNavigate } from "react-router-dom";

export const ComingSoon = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Coming Soon</h1>
      <p className="text-lg text-gray-600 mb-6">We are working hard to bring you something amazing. Stay tuned!</p>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-6"></div>
      <button 
        onClick={() => navigate(-1)} 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
      >
        Go Back
      </button>
    </div>
  )
}
