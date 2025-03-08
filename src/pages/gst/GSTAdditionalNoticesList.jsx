import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useAxiosPost } from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

import { ServiceType } from "../../utils/enums";
import { Table } from "../../components/Table";

export const GSTAdditionalNoticesList = ({ serviceType }) => {
  const { clientId } = useParams();
  const [notices, setNotices] = useState([]);

  const columns = [
    { label: "Notice ID", key: "id" },
    { label: "Client", key: "client" },
    { label: "Ref ID", key: "ref_id" },
    { label: "Type", key: "type_of_notice" },
    { label: "Issued Date", key: "date_of_issuance" },
  ];

  const [fetchGSTAdditionalNoticeList, { loading: loadingNotice }] =
    useAxiosPost("fin_buddy.api.gst_additional_notice_list");

  useEffect(() => {
    fetchGSTAdditionalNoticeList({
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
      <PageTitle title="GST Additional Notice List" />
      <Table
        columns={columns}
        data={notices}
        itemsPerPage={10}
        type="additional-notices"
        serviceType={serviceType}
        rowRedirection={`/${ServiceType.GSTIN}/notice-details`}
      />
    </>
  );
};
