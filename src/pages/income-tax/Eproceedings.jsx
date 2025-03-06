import React, { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import PageTitle from "../../components/PageTitle";
import { columns, data } from "../../utils/constants";
import { postData } from "../../api/apiService";
import { ServiceType } from "../../utils/enums";
import { useParams } from "react-router-dom";
export const Eproceedings = () => {
  const [ePdataList, setEPDataList] = useState([]);
  const { clientId } = useParams();
  const eProceedingsList = async () => {
    const data = await postData("fin_buddy.api.e_proceeding_list", {
      start: 0,
      page_length: 20,
      client: clientId,
      search_query: "", //search_query can handle global seach, you can search with proceeding_name, client, notice_din and id. also there is search support for creation date use this format for date search : 'YYYY-MM-DD to YYYY-MM-DD'.
    });
    setEPDataList(data?.result?.records);
    console.log("data=>", data);
  };

  useEffect(() => {
    eProceedingsList();
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
      <PageTitle title="E-Proceedings" />
      <Table
        columns={columns}
        data={ePdataList}
        itemsPerPage={10}
        type="eproceeding"
        rowRedirection={`/${ServiceType.INCOME_TAX}/eproceeding-details`}
      />
    </>
  );
};
