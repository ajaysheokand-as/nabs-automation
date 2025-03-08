import React, { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { useAxiosPost } from "../hooks/useAxios";
import { ServiceType } from "../utils/enums";

const columns = [
  { label: "Client", key: "client_name" },
  // { label: "Disabled", key: "disabled" },
  { label: "Username", key: "username" },
  // { label: "Password", key: "password" },
  { label: "ID", key: "id" },
  { label: "Last Sync", key: "last_income_tax_sync" },
  // { label: "Action", key: "action" },
];

const urlMapping = {
  fetchClients: {
    [ServiceType.GSTIN]: "fin_buddy.api.gst_client_list",
    [ServiceType.INCOME_TAX]: "fin_buddy.api.income_tax_client_list",
    [ServiceType.TDS]: "fin_buddy.api.tds_client_list",
  },
};

export const Clients = ({ serviceType }) => {
  const navigate = useNavigate();
  const [clientsData, setClientsData] = useState([]);
  const [fetchClientsData] = useAxiosPost(urlMapping.fetchClients[serviceType]);

  // const fetchClientsData = async () => {
  //   const data = await postData("fin_buddy.api.income_tax_client_list", {
  //     start: 0,
  //     page_length: 20,
  //     search_query: "",
  //   });
  //   setClientsData(data?.result?.records);
  //   console.log("data=>", data);
  // };

  useEffect(() => {
    fetchClientsData({
      // customURL: "fin_buddy.api.income_tax_client_list",
      payload: {
        start: 0,
        page_length: 20,
        search_query: "",
      },
      cb: (data) => {
        setClientsData(data?.result?.records || []);
      },
    });
  }, []);

  const handleRowRedirection = (row) => {
    switch (serviceType) {
      case ServiceType.GSTIN:
        return `${row?.id}`;

      case ServiceType.TDS:
        return `${row?.id}`;

      default:
        return "/404";
    }
  };

  return (
    <>
      <PageTitle title="All Clients" navigate={() => navigate(-1)} />
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
          Add Client
        </button>
        <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
          Import Client
        </button>
        {/* <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
          Download Template
        </button> */}
        <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
          Sync All
        </button>
      </div>
      <Table
        columns={columns}
        data={clientsData}
        type="clients"
        serviceType={serviceType}
        itemsPerPage={10}
        rowRedirection={handleRowRedirection}
      />
    </>
  );
};
