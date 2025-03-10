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

import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useAxiosPost } from "../hooks/useAxios";

export const IncomeTax = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState(null);
  const [fetchIncomeTaxCards] = useAxiosPost(
    "fin_buddy.api.get_income_tax_cards"
  );

  useEffect(() => {
    fetchIncomeTaxCards({
      cb: (data) => {
        setCardsData(data?.result || {});
      },
    });
  }, []);

  // {

  //   "last_15_days": 26,
  //   "open_notices": 15,
  //   "over_due": 17,

  // }

  return (
    <div className="p-6 bg-gray-100 ">
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
            title: "Income Tax E-Filing",
          },
        ]}
        style={{
          marginBottom: "10px",
          color: "#151c40",
        }}
      />

      <h2 className="text-xl font-bold text-blue-900 mb-4">Income Tax</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cards Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <InfoCard
            title="Total Notices"
            count={cardsData?.total_notices || 0}
            onClick={() => navigate("notice")}
            icon={<FaFileAlt />}
          />
          <InfoCard
            title="Open Notices"
            count={cardsData?.open_notices || 0}
            icon={<FaExclamationTriangle />}
          />
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
            count={cardsData?.over_due_7_days || 0}
            icon={<FaExclamationCircle />}
          />
          <InfoCard title="Failed Logins" count="0" icon={<FaUserLock />} />
          <InfoCard
            title="Last 15 Days"
            count={cardsData?.last_15_days || 0}
            icon={<FaRegClock />}
          />

          <InfoCard
            title="Over Due"
            count={cardsData?.over_due || 0}
            icon={<FaTimesCircle />}
          />
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
