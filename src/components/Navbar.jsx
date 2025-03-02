import React from 'react'
import { useState } from "react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold text-blue-600">
            NABS Automation
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li><a href="#" className="text-gray-700 hover:text-blue-600">Home</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600">About</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600">Services</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600">Contact</a></li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md">
            <ul className="flex flex-col space-y-4 p-4">
              <li><a href="#" className="block text-gray-700 hover:text-blue-600">Home</a></li>
              <li><a href="#" className="block text-gray-700 hover:text-blue-600">About</a></li>
              <li><a href="#" className="block text-gray-700 hover:text-blue-600">Services</a></li>
              <li><a href="#" className="block text-gray-700 hover:text-blue-600">Contact</a></li>
            </ul>
          </div>
        )}
      </nav>
  )
}
