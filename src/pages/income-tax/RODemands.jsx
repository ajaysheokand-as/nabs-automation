import React, { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import PageTitle from "../../components/PageTitle";
import { columns, data } from "../../utils/constants";
import { postData } from "../../api/apiService";
import { ServiceType } from "../../utils/enums";
import { useParams } from "react-router-dom";

export const ResponseOutstandings = ({ serviceType }) => {
  const [responseOutstandingList, setResponseOutstandingList] = useState([]);
  const { clientId } = useParams();
  const getResponseOutstandingList = async () => {
    const data = await postData(
      "fin_buddy.api.response_to_outstanding_demand_list",
      {
        start: 0,
        page_length: 20,
        client: clientId,
        search_query: "", //search_query can handle global seach, you can search with proceeding_name, client, notice_din and id. also there is search support for creation date use this format for date search : 'YYYY-MM-DD to YYYY-MM-DD'.
      }
    );
    setResponseOutstandingList(data?.result?.records);
  };

  useEffect(() => {
    getResponseOutstandingList();
  }, []);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Demand Reference No", key: "demand_reference_no" },
    { label: "Assessment Year", key: "assessment_year" },
    { label: "Outstanding Demand Amount", key: "outstanding_demand_amount" },
  ];

  return (
    <>
      <PageTitle title="Response to Outstanding Demand" />
      <Table
        columns={columns}
        data={responseOutstandingList}
        itemsPerPage={10}
        type="responseoutstandings"
        rowRedirection={`/${ServiceType.INCOME_TAX}/responseoutstandings-details`}
      />
    </>
  );
};
