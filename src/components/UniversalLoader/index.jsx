import React from "react";
import { Spin } from "antd";

const UniversalLoader = ({ show, text }) => {
  if (!show) return null;

  return (
    <div
      style={{ background: "rgba(0, 0, 0, 0.8)" }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <Spin size="large" className="universal-spin" />
        {text && <div className="mt-4 text-white text-xl">{text}</div>}
      </div>
    </div>
  );
};

export default UniversalLoader;
