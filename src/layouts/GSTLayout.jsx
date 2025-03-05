import React from "react";
import { Navbar } from "../components/gst/Navbar";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";

export const GSTLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-16 p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
