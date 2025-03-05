import React from "react";

export const NoticeSummery = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Notice Summary</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-2">Remarks</th>
            <th className="p-2">Total</th>
            <th className="p-2">Open</th>
            <th className="p-2">Closed</th>
            <th className="p-2">Replied</th>
          </tr>
        </thead>
        <tbody>
          {["Refund", "ASMT 10", "TDRC 03", "Recovery", "Audit"].map(
            (remark, index) => (
              <tr key={index} className="border-b text-center">
                <td className="p-2">{remark}</td>
                <td className="p-2">-</td>
                <td className="p-2">-</td>
                <td className="p-2">-</td>
                <td className="p-2">-</td>
              </tr>
            )
          )}
          <tr className="bg-blue-100 font-bold">
            <td className="p-2">Total</td>
            <td className="p-2">0</td>
            <td className="p-2">0</td>
            <td className="p-2">0</td>
            <td className="p-2">0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
