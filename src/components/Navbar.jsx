import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";

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
          <li>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300">
              <FaHome /> <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300">
              <FaInfoCircle /> <span>About</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300">
              <FaServicestack /> <span>Services</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300">
              <FaEnvelope /> <span>Contact</span>
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300">
                <FaHome /> <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300">
                <FaInfoCircle /> <span>About</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300">
                <FaServicestack /> <span>Services</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300">
                <FaEnvelope /> <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};