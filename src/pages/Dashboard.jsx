import React from "react";
import Card from "../components/Card";
import { MainLayout } from "../layouts/MainLayout";
import GSTIN from "../assets/images/GSTIN.jpeg"
import INCOMETAX from '../assets/images/INCOMETAX.jpeg'
import TDS from '../assets/images/TDS.jpeg'
import { useNavigate } from "react-router-dom";
export const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <div className="flex flex-wrap justify-center gap-4 p-4">
                {/* GSTIN Card */}
                <Card
                    image={GSTIN}
                    title="GSTIN Registration"
                    description="Get your GSTIN registered hassle-free."
                    onClick={() => navigate("/gstin?type=gstin")}
                />

                {/* Income Tax E-filing Card */}
                <Card
                    image={INCOMETAX}
                    title="Income Tax E-Filing"
                    description="E-file your income tax returns with ease."
                    onClick={() => navigate("/income-tax?type=incometax")}
                />

                {/* TDS Card */}
                <Card
                    image={TDS}
                    title="TDS Filing"
                    description="File your TDS returns quickly and easily."
                    onClick={() => navigate("/tds?type=tds")}
                />
            </div>
        </MainLayout>
    )
}
