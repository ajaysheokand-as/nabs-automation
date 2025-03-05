import React from "react";
import { Card } from "antd";

const DashboardCard = ({ image, title, onClick, description }) => {
  const { Meta } = Card;

  // If no title, return nothing
  if (!title) return null;

  return (
    <Card
      hoverable
      style={{ width: 240, height: 280 }}
      onClick={onClick}
      cover={
        <img src={image} alt={title} className="w-full h-40 object-cover" />
      }
      // className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm w-full cursor-pointer
      //            transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
    >
      <Meta title={title} description={description ? description : ""} />
    </Card>
  );
};

export default DashboardCard;
