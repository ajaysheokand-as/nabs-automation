import React, { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import PageTitle from "../../components/PageTitle";
import { columns, data } from "../../utils/constants";
import { postData } from "../../api/apiService";
import { ServiceType } from "../../utils/enums";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";

export const ResponseOutstandings = ({ serviceType }) => {
  const [responseOutstandingList, setResponseOutstandingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { clientId } = useParams();
  const navigate = useNavigate();

  const getResponseOutstandingList = async () => {
    setLoading(true);
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

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getResponseOutstandingList();
  }, []);

  const columns = [
    { label: "Demand Reference No", key: "demand_reference_no" },
    { label: "Section Code", key: "section_code" },
    { label: "Assessment Year", key: "assessment_year" },
    { label: "Rectification Rights", key: "rectification_rights" },
    { label: "Response Type", key: "response_type" },
  ];

  return (
    <>
      <PageTitle title="Response to Outstanding Demand" />

      <div className="flex flex-wrap items-center w-full justify-end gap-2 pr-4 mt-4">
        <Button
          onClick={() => {
            navigate(`/${serviceType}/add-responseoutstandings/${clientId}`);
          }}
          variant="outlined"
          icon={<FaPlus />}
          type="primary"
        >
          Add Response To Outstanding Demand
        </Button>
        <div>
          <Button
            type="primary"
            icon={<FaArrowsRotate />}
            onClick={() => {
              getResponseOutstandingList();
            }}
          >
            Reload List
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        data={responseOutstandingList}
        itemsPerPage={10}
        isLoading={loading}
        type="responseoutstandings"
        rowRedirection={`/${ServiceType.INCOME_TAX}/responseoutstandings-details`}
      />
    </>
  );
};
