import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Table = ({
  columns,
  data,
  itemsPerPage = 5,
  rowRedirection,
  isPagination = 1,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            {columns.map((col, index) => (
              <th key={index} className="p-3 border-b">
                {col.label}
              </th>
            ))}
            {/* <th className="p-3 border-b">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b hover:bg-gray-100"
                onClick={() => rowRedirection && navigate(`${rowRedirection}`)}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-3 cursor-pointer">
                    {row[col.key]}
                  </td>
                ))}
                {/* <td className="p-3 flex gap-2">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer">Edit</button>
                  <button className="px-2 py-1 bg-red-400 text-white rounded cursor-pointer">Delete</button>
                  <button className="px-2 py-1 bg-green-500 text-white rounded cursor-pointer">View</button>
                  <button className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer">Sync</button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="p-3 text-center text-gray-500"
              >
                Loading ...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination Controls */}
      {isPagination ? (
        <div className="flex justify-between items-center mt-4">
          <button
            className={`px-4 py-2 bg-gray-300 rounded cursor-pointer ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 bg-gray-300 rounded cursor-pointer ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400"
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      ) : (
        " "
      )}
    </div>
  );
};
