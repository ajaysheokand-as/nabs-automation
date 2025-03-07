import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useAxiosPost } from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

import { ServiceType } from "../../utils/enums";
import { Table } from "../../components/Table";

export const GSTNoticeList = () => {
  const { noticeId } = useParams();
  const [notices, setNotices] = useState([]);

  const columns = [
    { label: "Notice ID", key: "notice_id" },
    { label: "Issued By", key: "issued_by" },
    { label: "Type", key: "type" },
    { label: "Issue Date", key: "issue_date" },
    { label: "Due Date", key: "due_date" },
    { label: "Amount", key: "amount" },
    // { label: "Description", key: "description" },
    { label: "File", key: "file" },
  ];

  const [fetchGSTNoticeDetails, { loading: loadingNotice }] = useAxiosPost(
    "fin_buddy.api.gst_notice_list"
  );

  useEffect(() => {
    fetchGSTNoticeDetails({
      payload: {
        id: noticeId,
      },
      cb: (data) => {
        setNotices(data?.result?.records || []);
      },
    });
  }, []);

  return (
    <>
      <PageTitle title="GST Notice Details" />
      <Table
        columns={columns}
        data={notices}
        itemsPerPage={10}
        type="notices"
        rowRedirection={`/${ServiceType.GSTIN}/notice-details`}
      />
    </>
  );
};
