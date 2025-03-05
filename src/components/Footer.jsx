import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <h2 className="text-xl font-bold">NABS Automation</h2>
          <p className="text-gray-400 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#" className="hover:text-blue-400">
            Facebook
          </a>
          <a href="#" className="hover:text-blue-400">
            Twitter
          </a>
          <a href="#" className="hover:text-blue-400">
            Instagram
          </a>
          <a href="#" className="hover:text-blue-400">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};
