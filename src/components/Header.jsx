import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export const Header = ({ title, navigate }) => {
    
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-center relative shadow-md">
      <button 
        onClick={navigate} 
        className="absolute left-4 text-white text-xl hover:text-gray-200 transition cursor-pointer"
      >
        <FaArrowLeft />
      </button>
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  )
}
