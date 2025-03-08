import React, { useState } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-start items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-900">
          NABS Automation
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 ml-4">
          <li>
            <Link
              to={"/"}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
            >
              <FaHome /> <span>Home</span>
            </Link>
          </li>
          {/* <li>
            <Link to={"/"} className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300">
              <FaInfoCircle /> <span>E-Proceeding</span>
            </Link>
          </li>
          <li>
            <Link to={"/notice"} className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300">
              <FaServicestack /> <span>Outstanding Demands</span>
            </Link>
          </li> */}
          <li>
            <Link
              to={"/coming-soon"}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
            >
              <FaUsers /> <span>All Users</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/coming-soon"}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
            >
              <FaClipboardList /> <span>Reports</span>
            </Link>
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
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
              >
                <FaHome /> <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/coming-soon"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
              >
                <FaInfoCircle /> <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                href="/coming-soon"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
              >
                <FaServicestack /> <span>Services</span>
              </Link>
            </li>
            <li>
              <Link
                href="/coming-soon"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
              >
                <FaEnvelope /> <span>Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
