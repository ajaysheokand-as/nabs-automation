import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useAxiosPost } from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

import { ServiceType } from "../../utils/enums";
import { Table } from "../../components/Table";
import { formatAmount } from "../../utils/helpers";

export const GSTNoticeList = ({ serviceType }) => {
  const { clientId } = useParams();
  const [notices, setNotices] = useState([]);

  const columns = [
    { label: "Notice ID", key: "notice_id" },
    { label: "Issued By", key: "issued_by" },
    { label: "Type", key: "type" },
    { label: "Issue Date", key: "issue_date" },
    { label: "Due Date", key: "due_date" },
    {
      label: "Amount",
      key: "amount",
      render: (row) => <>{formatAmount(row.amount)}</>,
    },
    { label: "File", key: "file" },
  ];

  const [fetchGSTNoticeList, { loading: loadingNotice }] = useAxiosPost(
    "fin_buddy.api.gst_notice_list"
  );

  useEffect(() => {
    fetchGSTNoticeList({
      payload: {
        start: 0,
        page_length: 20,
        search_query: ` ${clientId ? clientId : ""}`,
      },
      cb: (data) => {
        setNotices(data?.result?.records || []);
      },
    });
  }, []);

  return (
    <>
      <PageTitle title="GST Notice List" />
      <Table
        columns={columns}
        data={notices}
        itemsPerPage={10}
        type="notices"
        serviceType={serviceType}
        rowRedirection={`/${ServiceType.GSTIN}/notice-details`}
      />
    </>
  );
};
