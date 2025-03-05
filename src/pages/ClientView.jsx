import React, {useState} from 'react'
import { Header } from '../components/Header'
import { MainLayout } from '../layouts/MainLayout';
import { useNavigate } from "react-router-dom";

export const ClientView = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        clientName: "HRC Infra Pvt Ltd",
        dob: "",
        disabled: false,
        username: "AADCH3199K",
        password: "********",
        lastSync: "03-03-2025 11:37:18",
        timezone: "Asia/Kolkata",
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };
  return (
    <MainLayout>
        <Header title={"Client Details"} navigate={()=>navigate(-1)}/>
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      {/* Buttons */}
      <div className="flex justify-between mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
          Response to Outstanding Demand
        </button>
        <button onClick={() => navigate('/eproceedings')} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
          E Proceeding <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded ml-2">2</span>
        </button>
      </div>

      {/* Client Details */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Client Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-600 text-sm">Client Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-gray-800"
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm">DOB</label>
            <input
              type="text"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              className="w-full p-2 border rounded bg-gray-100 text-gray-800"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="disabled"
              checked={formData.disabled}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600"
            />
            <label className="text-gray-600 text-sm">Disabled</label>
          </div>
        </div>
      </div>

      {/* Income Tax Login Credentials */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Income Tax Login Credentials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-600 text-sm">IncomeTax Username <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-gray-800"
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm">Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Sync Details */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Sync Details</h2>
        <div>
          <label className="text-gray-600 text-sm">Last Income Tax Sync</label>
          <input
            type="text"
            name="lastSync"
            value={formData.lastSync}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-gray-800"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">{formData.timezone}</p>
      </div>
    </div>
    </MainLayout>
  )
}
