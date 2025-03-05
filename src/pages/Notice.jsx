import React, { useEffect, useState } from 'react'
import { Table } from "../components/Table";
import { postData } from "../api/apiService";
import PageTitle from "../components/PageTitle";
import { ServiceType } from "../utils/enums";
import { useAxiosPost } from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const urlMapping = {
  fetchClients: {
    [ServiceType.GSTIN]: "fin_buddy.api.gst_notice_list",
    [ServiceType.TDS]: "fin_buddy.api.tds_notice_list",
  },
};

export const Notice = ({ serviceType }) => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [fetchNotices, { loading }] = useAxiosPost(
    urlMapping.fetchClients[serviceType]
  );

  useEffect(() => {
    fetchNotices({
      payload: {
        start: 0,
        page_length: 20,
        search_query: "",
      },
      cb: (data) => {
        setNotices(data?.result?.records || []);
      },
    });
  }, []);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "client" },
    { label: "Assessment Year", key: "assessment_year" },
    { label: "Notice Sent Date", key: "notice_sent_date" },
    { label: "Staus", key: "proceeding_status" },
    { label: "Due Date", key: "response_due_date" },
    // {
    //   label: "Action",
    //   key: "",
    //   render: (data) => {
    //     console.log("data", data);
    //     return (
    //       <button
    //         onClick={() => {
    //           navigate(`${data?.id || "GST-00061"}`);
    //         }}
    //       >
    //         View Details
    //       </button>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <PageTitle title="Notices" />
      <Table
        isLoading={loading}
        columns={columns}
        data={notices}
        itemsPerPage={10}
        rowRedirection={(row) => `${row?.noticeId || "GST-00061"}`}
      />
    </>
  );
};
