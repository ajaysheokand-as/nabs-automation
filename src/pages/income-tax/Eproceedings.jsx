import React, { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import PageTitle from "../../components/PageTitle";
import { columns, data } from "../../utils/constants";
import { postData } from "../../api/apiService";
import { ServiceType } from "../../utils/enums";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Tag } from "antd";
import { FaPlus } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
export const Eproceedings = ({ serviceType }) => {
  const [ePdataList, setEPDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { clientId } = useParams();
  const eProceedingsList = async () => {
    setLoading(true);
    const data = await postData("fin_buddy.api.e_proceeding_list", {
      start: 0,
      page_length: 20,
      client: clientId ? clientId : undefined,
      search_query: "", //search_query can handle global seach, you can search with proceeding_name, client, notice_din and id. also there is search support for creation date use this format for date search : 'YYYY-MM-DD to YYYY-MM-DD'.
    });
    setEPDataList(data?.result?.records);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log("data=>", data);
  };

  useEffect(() => {
    eProceedingsList();
  }, []);

  const columns = [
    { label: "Notice/Communication Reference ID", key: "notice_din" },
    { label: "Name", key: "proceeding_name" },
    { label: "Financial Year", key: "financial_year" },
    { label: "Assessment Year", key: "assessment_year" },
    { label: "Notice Sent Date", key: "notice_sent_date" },
    {
      label: "Status",
      key: "proceeding_status",
      render: (row) => {
        return (
          <div className="flex items-center h-14 justify-center">
            {row?.proceeding_status == "Active" ? (
              <Tag color="blue">{row?.proceeding_status}</Tag>
            ) : row?.proceeding_status == "Open" ? (
              <Tag color="green">{row?.proceeding_status}</Tag>
            ) : (
              <Tag color="red">{row?.proceeding_status}</Tag>
            )}
          </div>
        );
      },
    },
    { label: "Due Date", key: "response_due_date" },
  ];

  return (
    <>
      <PageTitle title={clientId ? "E-Proceedings" : "Notices"} />

      {clientId && (
        <div className="flex flex-wrap items-center w-full justify-end gap-2 pr-4 mt-4">
          <Button
            onClick={() => {
              navigate(`/${serviceType}/add-eproceedings/${clientId}`);
            }}
            variant="outlined"
            icon={<FaPlus />}
            type="primary"
          >
            Add New E Proceeding
          </Button>
          <div>
            <Button
              type="primary"
              icon={<FaArrowsRotate />}
              onClick={() => {
                eProceedingsList();
              }}
            >
              Reload List
            </Button>
          </div>
        </div>
      )}

      <Table
        columns={columns}
        data={ePdataList}
        itemsPerPage={10}
        isLoading={loading}
        type="eproceeding"
        rowRedirection={`/${ServiceType.INCOME_TAX}/eproceeding-details`}
      />
    </>
  );
};
