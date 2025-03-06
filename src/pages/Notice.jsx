import React, { useEffect, useState } from "react";
import { Table } from "../components/Table";
import PageTitle from "../components/PageTitle";
import { ServiceType } from "../utils/enums";
import { useAxiosPost } from "../hooks/useAxios";

const urlMapping = {
  fetchClients: {
    [ServiceType.GSTIN]: "fin_buddy.api.gst_notice_list",
    [ServiceType.TDS]: "fin_buddy.api.tds_notice_list",
  },
};

export const Notice = ({ serviceType }) => {
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
        console.log("Notice Data=>", data.result.records);
      },
    });
  }, []);

  const columns =
    serviceType === "income-tax"
      ? [
          { label: "ID", key: "id" },
          { label: "Client", key: "client" },
          { label: "Assessment Year", key: "assessment_year" },
          { label: "Notice Sent Date", key: "notice_sent_date" },
          { label: "Status", key: "proceeding_status" },
          { label: "Due Date", key: "response_due_date" },
        ]
      : [
          { label: "Notice Id", key: "notice_id" },
          { label: "Client", key: "client" },
          { label: "Amount", key: "amount" },
          { label: "Issue Date", key: "issue_date" },
          { label: "Due Date", key: "due_date" },
        ];

  const handleRowRedirection = (row) => {
    switch (serviceType) {
      case ServiceType.GSTIN:
        return `${row?.noticeId || "GST-00061"}`;

      case ServiceType.INCOME_TAX:
        return `${row?.noticeId}`;

      case ServiceType.TDS:
        return `${row?.noticeId}`;

      default:
        return "/404";
    }
  };

  return (
    <>
      <PageTitle title="Notices" />
      <Table
        isLoading={loading}
        columns={columns}
        data={notices}
        type="notices"
        itemsPerPage={10}
        rowRedirection={handleRowRedirection}
      />
    </>
  );
};
