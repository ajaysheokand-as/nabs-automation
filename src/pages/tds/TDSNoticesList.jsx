import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useAxiosPost } from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

import { ServiceType } from "../../utils/enums";
import { Table } from "../../components/Table";

export const TDSNoticeList = ({ serviceType }) => {
  const { clientId } = useParams();
  const [notices, setNotices] = useState([]);

  const columns = [
    { label: "Notice ID", key: "id" },
    { label: "Client", key: "client" },
    { label: "Owner", key: "owner" },
  ];

  const [fetchTDSNoticeDetails, { loading: loadingNotice }] = useAxiosPost(
    "fin_buddy.api.tds_notice_list"
  );

  useEffect(() => {
    fetchTDSNoticeDetails({
      payload: {
        start: 0,
        page_length: 20,
        search_query: `${clientId ? clientId : ""}`,
      },
      cb: (data) => {
        setNotices(data?.result?.records || []);
      },
    });
  }, []);

  return (
    <>
      <PageTitle title="TDS Notice Details" />
      <Table
        columns={columns}
        data={notices}
        itemsPerPage={10}
        type="notices"
        serviceType={serviceType}
        rowRedirection={`/${ServiceType.TDS}/notice-details`}
      />
    </>
  );
};
