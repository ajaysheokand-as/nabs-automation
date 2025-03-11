import { Skeleton } from "antd";
import React from "react";

export const InfoCard = ({ title, count, icon, onClick, loading }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition cursor-pointer "
      onClick={onClick}
    >
      {loading ? (
        <Skeleton.Avatar title active size="small" />
      ) : (
        <div className="text-blue-900 text-3xl">{icon}</div>
      )}
      <div>
        <h3 className="text-gray-600 font-semibold">{title}</h3>
        {loading ? (
          <div className="w-8">
            <Skeleton.Input active size="small" />
          </div>
        ) : (
          <p className="text-xl font-bold">{count}</p>
        )}
      </div>
    </div>
  );
};
