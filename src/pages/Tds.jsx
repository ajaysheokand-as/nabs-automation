import React, { useEffect, useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { InfoCard } from "../components/InfoCard";
import { NoticeSummery } from "../components/NoticeSummery";
import { Calender } from "../components/Calender";
import { Table } from "../components/Table";
import {
  FaRegCalendar,
  FaRegClock,
  FaFileAlt,
  FaIdCard,
  FaExclamationCircle,
  FaUserLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAxiosPost } from "../hooks/useAxios";

export const Tds = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState({});
  const [fetchTDSCards] = useAxiosPost("fin_buddy.api.get_tds_cards");

  useEffect(() => {
    fetchTDSCards({
      cb: (data) => {
        setCardsData(data?.result || {});
      },
    });
  }, []);

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
            count={cardsData?.total_notices || 0}
            icon={<FaFileAlt />}
            onClick={() => navigate("notice")}
          />
          <InfoCard title="Open Notices" count="0" icon={<FaFileAlt />} />
          <InfoCard
            title="Total Clients"
            count={cardsData?.total_clients || 0}
            onClick={() => navigate("clients")}
            icon={<FaIdCard />}
          />
          <InfoCard
            title="Last 24 Hours"
            count={cardsData?.last_24_hours || 0}
            icon={<FaRegClock />}
          />
          <InfoCard
            title="Due within 7 Days"
            count="0"
            icon={<FaExclamationCircle />}
          />
          <InfoCard title="Failed Logins" count="0" icon={<FaUserLock />} />
          <InfoCard
            title="Last 15 Days"
            count={cardsData?.last_15_days || 0}
            icon={<FaRegCalendar />}
          />
          {/* <InfoCard title="Total GSTIN" count="0" icon={<FaFileAlt />} /> */}

          <InfoCard title="Over Due" count="0" icon={<FaFileAlt />} />
        </div>
        <Calender />
      </div>

      {/* Action Buttons */}
      {/* <div className="flex flex-wrap gap-2 mb-6">
        <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
          Add Company
        </button>
        <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
          Import Company
        </button>
        <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
          Download Template
        </button>
        <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
          Sync All
        </button>
      </div> */}

      {/* Notice Summary Table & Calendar */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Table columns={columns} data={data} type="tds" itemsPerPage={3} />
      </div> */}
    </div>
  );
};
