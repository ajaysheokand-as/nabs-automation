import React from "react";
import Card from "../components/Card";
import { MainLayout } from "../layouts/MainLayout";
import GSTIN from "../assets/images/GSTnew.jpg";
import INCOMETAX from "../assets/images/INCOMETAX.jpeg";
import TDS from "../assets/images/TDS.jpeg";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/Card";
import BannerImage from "../assets/images/Banner.jpg";
export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex gap-4  justify-center gap-16 ">
        <div>
          {" "}
          <p className="text-5xl font-bold  text-blue-900 mb-2">
            Simplify Your Tax,
          </p>
          <p className="text-5xl font-bold text-blue-900 mb-16">
            GST Needs with NABS Automation!
          </p>
          <div className="flex flex-wrap justify-center gap-8 ">
            {/* GSTIN Card */}
            <DashboardCard
              image={GSTIN}
              title="GSTIN Registration"
              description="Get your GSTIN registered hassle-free."
              onClick={() => navigate("/gstin?type=gstin")}
            />

            {/* Income Tax E-filing DashboardCard */}
            <DashboardCard
              image={INCOMETAX}
              title="Income Tax E-Filing"
              description="E-file your income tax returns with ease."
              onClick={() => navigate("/income-tax?type=incometax")}
            />

            {/* TDS DashboardCard */}
            <DashboardCard
              image={TDS}
              title="TDS Filing"
              description="File your TDS returns quickly and easily."
              onClick={() => navigate("/tds?type=tds")}
            />
          </div>
        </div>

        <img
          src={BannerImage}
          width={400}
          height={200}
          className="rounded-md"
        />
      </div>
    </div>
  );
};
