import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { FileExclamationOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const Table = ({
  columns,
  data,
  itemsPerPage = 5,
  rowRedirection,
  isPagination = 1,
  serviceType = null,
  isLoading = false,
  type = null,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const { setSelectedEproceeding } = useContext(AppContext);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
    minHeight: "40vh",
  };
  const content = <div style={contentStyle} />;

  const handleRowClick = (data) => {
    if (type == "eproceeding") {
      setSelectedEproceeding(data?.id);
    }

    if (rowRedirection && typeof rowRedirection === "function") {
      if (serviceType == "income-tax" && type == "clients") {
        navigate(`/${serviceType}/client-view/${data.id}`);
      } else if (serviceType == "tds" && type == "clients") {
        navigate(`/${serviceType}/client-view/${data.id}`);
      } else {
        navigate(rowRedirection(data));
      }
    } else if (rowRedirection && typeof rowRedirection === "string") {
      if (type == "eproceeding") {
        navigate(
          `${rowRedirection}?proceedingID=${data?.id}&formType=eproceedings`
        );
      } else if (type == "responseoutstandings") {
        navigate(
          `${rowRedirection}?responseID=${data?.id}&formType=responseOutstandings`
        );
      } else if (type == "notices" && serviceType == "gstin") {
        navigate(`${rowRedirection}?noticeID=${data?.id}&formType=notices`);
      } else if (type == "notices" && serviceType == "tds") {
        navigate(
          `${rowRedirection}?tdsNoticeID=${data?.id}&formType=tdsNotices`
        );
      } else if (type == "additional-notices") {
        navigate(
          `${rowRedirection}?additionalNoticeID=${data?.id}&formType=additionalNotices`
        );
      } else {
        navigate(rowRedirection);
      }
    }
  };

  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            {columns.map((col, index) => (
              <th align="center" key={index} className="p-3 border-b">
                {col.label}
              </th>
            ))}
            {/* <th className="p-3 border-b">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 && !isLoading ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-100">
                {columns.map((col, colIndex) => {
                  if (col.render) {
                    return (
                      <td
                        key={colIndex}
                        align="center"
                        className="p-3 cursor-pointer"
                      >
                        <>{col.render(row)}</>
                      </td>
                    );
                  }
                  return (
                    <td
                      align="center"
                      key={colIndex}
                      className="p-3 cursor-pointer"
                      onClick={() => {
                        handleRowClick(row);
                      }}
                    >
                      {row[col.key]}
                    </td>
                  );
                })}
                {/* <td className="p-3 flex gap-2">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer">Edit</button>
                  <button className="px-2 py-1 bg-red-400 text-white rounded cursor-pointer">Delete</button>
                  <button className="px-2 py-1 bg-green-500 text-white rounded cursor-pointer">View</button>
                  <button className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer">Sync</button>
                </td> */}
              </tr>
            ))
          ) : (
            <>
              {!isLoading && paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="pt-4 pb-4 text-center text-gray-500  w-full"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileExclamationOutlined style={{ fontSize: "30px" }} />
                      No Data Available
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="p-3 text-center text-gray-500"
                  >
                    <Spin tip="Loading" size="large">
                      {content}
                    </Spin>
                  </td>
                </tr>
              )}
            </>
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
