import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useAxiosPost } from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

export const GSTNoticeDetails = () => {
  const { noticeId } = useParams();
  const [notices, setNotices] = useState([]);
  const [additionalNotices, setAdditionalNotices] = useState([]);

  const [fetchGSTNoticeDetails, { loading: loadingNotice }] = useAxiosPost(
    "fin_buddy.api.gst_notice_list"
  );

  const [fetchGSTAdditionalNotices, { loading: loadingAdditionalNotice }] =
    useAxiosPost("fin_buddy.api.gst_additional_notice_list");

  useEffect(() => {
    fetchGSTNoticeDetails({
      payload: {
        id: noticeId,
      },
      cb: (data) => {
        setNotices(data?.result?.records || []);
      },
    });

    fetchGSTAdditionalNotices({
      payload: {
        id: noticeId,
      },
      cb: (data) => {
        setAdditionalNotices(data?.result?.records || []);
      },
    });
  }, []);

  return (
    <>
      <PageTitle title="GST Notice Details" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-6">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
            Notice Form
          </h2>
          {/* Notices */}
          <div className="mb-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Notices
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">#</th>
                  <th className="border p-2 text-left">Notice ID</th>
                  <th className="border p-2 text-left">Issued By</th>
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-left">Issue Date</th>
                  <th className="border p-2 text-left">Due Date</th>
                  <th className="border p-2 text-left">Amount</th>
                  <th className="border p-2 text-left">File</th>
                </tr>
              </thead>
              <tbody>
                {notices?.length > 0 ? (
                  <>
                    {notices.map((details, i) => (
                      <tr key={i}>
                        <td className="border p-2 text-left">{i + 1}</td>
                        <td className="border p-2 text-left">
                          {details?.notice_id}
                        </td>
                        <td className="border p-2 text-left">
                          {details?.issued_by}
                        </td>
                        <td className="border p-2 text-left">
                          {details?.type}
                        </td>
                        <td className="border p-2 text-left">
                          {details?.description}
                        </td>
                        <td className="border p-2 text-left">
                          {details?.issue_date}
                        </td>
                        <td className="border p-2 text-left">
                          {details?.due_date}
                        </td>
                        <td className="border p-2 text-left">
                          {details?.amount}
                        </td>
                        <td className="border p-2 text-left">
                          <a className="text-blue-500" href={details?.file}>
                            Download File
                          </a>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="border p-4 text-center text-gray-500"
                    >
                      {!loadingNotice ? "No Data Available" : "Loading..."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Group 2 - Additional Notices */}
          <div className="mb-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Additional Notices
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">#</th>
                  <th className="border p-2 text-left">Type of Notice</th>
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-left">Ref ID</th>
                  <th className="border p-2 text-left">Date of Issuance</th>
                  <th className="border p-2 text-left">Case Details</th>
                </tr>
              </thead>
              <tbody>
                {additionalNotices?.length > 0 ? (
                  <>
                    {additionalNotices.map((detail, i) => (
                      <tr key={i}>
                        <td className="border p-2 text-left">{i + 1}</td>
                        <td className="border p-2 text-left">
                          {detail?.type_of_notice}
                        </td>
                        <td className="border p-2 text-left">
                          {detail?.description}
                        </td>
                        <td className="border p-2 text-left">
                          {detail?.ref_id}
                        </td>
                        <td className="border p-2 text-left">
                          {detail?.date_of_issuance}
                        </td>
                        <td className="border p-2 text-left">
                          {detail?.case_details}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="border p-4 text-center text-gray-500"
                    >
                      {!loadingAdditionalNotice
                        ? "No Data Available"
                        : "Loading..."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Submit
            </button>
          </div>{" "}
          */}
        </div>
      </div>
    </>
  );
};
