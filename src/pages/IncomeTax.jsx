import React, { useEffect, useState } from "react";
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
import { useAxiosPost } from "../hooks/useAxios";
import { CardTypes } from "../utils/enums";

export const IncomeTax = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState({});
  const [fetchGSTCards] = useAxiosPost("fin_buddy.api.get_income_tax_cards");

  useEffect(() => {
    fetchGSTCards({
      cb: (data) => {
        setCardsData(data?.result || {});
      },
    });
  }, []);

  const Cards = [
    {
      id: CardTypes.TOTAL_NOTICES,
      title: "Total Notices",
      path: "notice",
      icon: FaFileAlt,
    },
    {
      id: CardTypes.OPEN_NOTICES,
      title: "Open Notices",
      icon: FaFileAlt,
    },
    {
      id: CardTypes.TOTAL_CLIENTS,
      title: "Total Clients",
      path: "clients",
      icon: FaFileAlt,
    },
    {
      id: CardTypes.LAST_24_HOURS,
      title: "Last 24 Hours",
      icon: FaRegClock,
    },
    {
      id: CardTypes.OVER_DUE_7_DAYS,
      title: "Due within 7 days",
      icon: FaRegCalendar,
    },
    {
      id: CardTypes.failed_login,
      title: "Failed Login",
      icon: FaRegCalendar,
    },
    {
      id: CardTypes.LAST_15_DAYS,
      title: "Last 15 Days",
      icon: FaRegCalendar,
    },
    {
      id: CardTypes.OVER_DUE,
      title: "Over Due",
      icon: FaFileAlt,
    },
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
        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <InfoCard
            title="Total Notices"
            count={cardsData?.total_notices || 0}
            onClick={() => navigate("notice")}
            icon={<FaFileAlt />}
          />
          <InfoCard
            title="Open Notices"
            count={cardsData?.total_notices || 0}
            icon={<FaExclamationTriangle />}
          />
          <InfoCard
            title="Total Clients"
            count={cardsData?.total_notices || 0}
            onClick={() => navigate("clients")}
            icon={<FaIdCard />}
          />
          <InfoCard title="Last 24 Hours" count="0" icon={<FaRegClock />} />
          <InfoCard
            title="Due within 7 Days"
            count={cardsData?.total_notices || 0}
            icon={<FaExclamationCircle />}
          />
          <InfoCard
            title="Failed Logins"
            count={cardsData?.total_notices || 0}
            icon={<FaUserLock />}
          />
          <InfoCard
            title="Last 15 Days"
            count={cardsData?.total_notices || 0}
            icon={<FaRegClock />}
          />

          <InfoCard
            title="Over Due"
            count={cardsData?.total_notices || 0}
            icon={<FaTimesCircle />}
          />
        </div> */}
        <Calender />
      </div>

      {/* Notice Summary Table & Calendar */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Table columns={columns} data={data} itemsPerPage={3} />
                </div> */}
    </div>
  );
};
