import React, { useEffect, useState } from 'react'
import { Table } from "../components/Table";
import { postData } from "../api/apiService";
import PageTitle from "../components/PageTitle";

export const Notice = () => {
  const [notices, setNotices] = useState([]);
  const getNotices = async () => {
    const data = await postData("fin_buddy.api.e_proceeding_list", {
      start: 0,
      page_length: 20,
      search_query: "", //search_query can handle global seach, you can search with proceeding_name, client, notice_din and id. also there is search support for creation date use this format for date search : 'YYYY-MM-DD to YYYY-MM-DD'.
    });
    setNotices(data?.result?.records);
    console.log("data=>", data);
  };

  useEffect(() => {
    getNotices();
  }, []);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "proceeding_name" },
    { label: "Assessment Year", key: "assessment_year" },
    { label: "Notice Sent Date", key: "notice_sent_date" },
    { label: "Staus", key: "proceeding_status" },
    { label: "Due Date", key: "response_due_date" },
  ];

  return (
    <>
      <PageTitle title="Notices" />
      <Table
        columns={columns}
        data={notices}
        itemsPerPage={10}
        rowRedirection={"/eproceeding-details"}
      />
    </>
  );
};
