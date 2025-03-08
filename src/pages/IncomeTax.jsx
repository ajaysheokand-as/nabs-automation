import React from "react";
import { InfoCard } from "../components/InfoCard";
import { Calender } from "../components/Calender";
import { FaRegCalendar, FaRegClock, FaFileAlt } from "react-icons/fa";
import {
  FaIdCard,
  FaExclamationTriangle,
  FaExclamationCircle,
  FaTimesCircle,
  FaUserLock,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export const IncomeTax = () => {
  const navigate = useNavigate();

  const data = [
    { title: "Company 1", count: 0, icon: <FaFileAlt /> },
    { title: "Company 2", count: 0, icon: <FaRegCalendar /> },
    { title: "Company 3", count: 0, icon: <FaRegClock /> },
    { title: "Company 4", count: 0, icon: <FaFileAlt /> },
    { title: "Company 5", count: 0, icon: <FaFileAlt /> },
    { title: "Company 6", count: 0, icon: <FaFileAlt /> },
  ];

  const columns = [
    { label: "Title", key: "title" },
    { label: "Count", key: "count" },
    { label: "Icon", key: "icon" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Dropdown */}
      {/* <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Type Of Notices
        </label>
        <select className="border rounded-md p-2 w-full max-w-xs bg-white shadow-md">
          <option value="all">All</option>
          <option value="open">Open Notices</option>
          <option value="due">Due Notices</option>
        </select>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cards Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <InfoCard
            title="Total Notices"
            count="10"
            onClick={() => navigate("notice")}
            icon={<FaFileAlt />}
          />
          <InfoCard
            title="Open Notices"
            count="0"
            icon={<FaExclamationTriangle />}
          />
          <InfoCard
            title="Total Clients"
            count="3"
            onClick={() => navigate("clients")}
            icon={<FaIdCard />}
          />
          <InfoCard title="Last 24 Hours" count="0" icon={<FaRegClock />} />
          <InfoCard
            title="Due within 7 Days"
            count="0"
            icon={<FaExclamationCircle />}
          />
          <InfoCard title="Failed Logins" count="0" icon={<FaUserLock />} />
          <InfoCard title="Last 15 Days" count="0" icon={<FaRegClock />} />

          <InfoCard title="Over Due" count="0" icon={<FaTimesCircle />} />
        </div>
        <Calender />
      </div>

      {/* Notice Summary Table & Calendar */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Table columns={columns} data={data} itemsPerPage={3} />
                </div> */}
    </div>
  );
};
