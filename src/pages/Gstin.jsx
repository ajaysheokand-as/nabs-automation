import React, { useEffect, useState } from "react";
import { InfoCard } from "../components/InfoCard";
import { NoticeSummery } from "../components/NoticeSummery";
import { Calender } from "../components/Calender";
import { FaRegCalendar, FaRegClock, FaFileAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAxiosPost } from "../hooks/useAxios";
import { CardTypes } from "../utils/enums";
import { Breadcrumb } from "antd";

const Cards = [
  {
    id: CardTypes.TOTAL_NOTICES,
    title: "Total Notices",
    path: "notices",
    icon: FaFileAlt,
  },
  {
    id: CardTypes.LAST_15_DAYS,
    title: "Last 15 Days",
    icon: FaRegCalendar,
  },
  {
    id: CardTypes.LAST_24_HOURS,
    title: "Last 24 Hours",
    icon: FaRegClock,
  },
  {
    id: CardTypes.TOTAL_CLIENTS,
    title: "Total Clients",
    path: "clients",
    icon: FaFileAlt,
  },
  {
    id: CardTypes.OPEN_NOTICES,
    title: "Open Notices",
    icon: FaFileAlt,
  },
  {
    id: CardTypes.OVER_DUE,
    title: "Over Due",
    icon: FaFileAlt,
  },
];

export const Gstin = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState({});
  const [fetchGSTCards] = useAxiosPost("fin_buddy.api.get_gst_cards");

  useEffect(() => {
    fetchGSTCards({
      cb: (data) => {
        setCardsData(data?.result || {});
      },
    });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Breadcrumb
        items={[
          {
            title: (
              <Link
                to={{
                  pathname: "/",
                }}
              >
                Home
              </Link>
            ),
          },
          {
            title: "GSTIN Registration",
          },
        ]}
        style={{
          marginBottom: "10px",
          color: "#151c40",
        }}
      />

      <div className="flex flex-col gap-4 md:flex-row md:gap-4">
        <div className="w-full md:w-1/2">
          {/* Header Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Type Of Notices
            </label>
            <select className="border rounded-md p-2 w-full max-w-xs bg-white shadow-md">
              <option value="all">All</option>
              <option value="open">Open Notices</option>
              <option value="due">Due Notices</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2 mb-6 mt-6 ">
            <button className="px-4 py-2 border border-blue-500 bg-blue-900 text-[#fff] rounded-lg hover:bg-blue-800 hover:text-white transition cursor-pointer">
              Add Company
            </button>
            <button className="px-4 py-2 border border-blue-500 bg-blue-900 text-[#fff] rounded-lg hover:bg-blue-800  hover:text-white transition cursor-pointer">
              Import Company
            </button>
            <button className="px-4 py-2 border border-blue-500 bg-blue-900 text-[#fff] rounded-lg hover:bg-blue-800  hover:text-white transition cursor-pointer">
              Download Template
            </button>
            <button className="px-4 py-2 border border-blue-500 bg-blue-900 text-[#fff] rounded-lg hover:bg-blue-800  hover:text-white transition cursor-pointer">
              Sync All
            </button>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-[20px]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 ">
              {/* Action Buttons */}

              {Cards.map((card, index) => (
                <InfoCard
                  key={index}
                  title={card.title}
                  count={cardsData[card.id] || 0}
                  icon={<card.icon />}
                  onClick={() => {
                    if (card.path) {
                      navigate(card.path);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Calender />
        </div>
      </div>

      {/* Notice Summary Table & Calendar */}
      <div className="w-full">
        {/* <Table columns={columns} data={data} itemsPerPage={3} /> */}

        <NoticeSummery />
      </div>
    </div>
  );
};
