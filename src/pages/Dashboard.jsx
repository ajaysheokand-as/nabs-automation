import React from "react";
import Card from "../components/Card";
import { MainLayout } from "../layouts/MainLayout";
import GSTIN from "../assets/images/GSTIN.jpeg"
import INCOMETAX from '../assets/images/INCOMETAX.jpeg'
import TDS from '../assets/images/TDS.jpeg'
export const Dashboard = () => {
  return (
    <MainLayout>
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {/* GSTIN Card */}
      <Card
        image={GSTIN}
        title="GSTIN Registration"
        description="Get your GSTIN registered hassle-free."
        onClick={() => alert("TDS Filing Clicked!")}
        // buttonText="Apply Now"
        // onButtonClick={() => alert("GSTIN Registration Clicked!")}
      />

      {/* TDS Card */}
      <Card
        image={INCOMETAX}
        title="TDS Filing"
        description="File your TDS returns quickly and easily."
        onClick={() => alert("TDS Filing Clicked!")}
        // buttonText="File Now"
        // onButtonClick={() => alert("TDS Filing Clicked!")}
      />

      {/* Income Tax E-filing Card */}
      <Card
        image={TDS}
        title="Income Tax E-Filing"
        description="E-file your income tax returns with ease."
        onClick={() => alert("TDS Filing Clicked!")}
        // buttonText="Start Filing"
        // onButtonClick={() => alert("Income Tax E-Filing Clicked!")}
      />
    </div>
    </MainLayout>
  )
}
