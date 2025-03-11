import React, { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { useAxiosPost } from "../hooks/useAxios";
import { ServiceType } from "../utils/enums";
import AddClientModal from "../components/AddClientModal";
import { toast } from "react-toastify";
import { Breadcrumb, Button, Tag } from "antd";
import { FaFileImport, FaPlus } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import moment from "moment";
import { SyncOutlined } from "@ant-design/icons";

const columns = [
  {
    label: "Name Of Assessee",
    key: "client_name",
  },
  {
    label: "Status",
    key: "disabled",
    render: (row) => {
      return (
        <div className="flex items-center h-14 justify-center">
          {row?.disabled == "0" ? (
            <Tag color="success">Enabled</Tag>
          ) : (
            <Tag color="red">Disabled</Tag>
          )}
        </div>
      );
    },
  },
  { label: "PAN/TAN", key: "username" },
  // { label: "Password", key: "password" },
  // { label: "ID", key: "id" },
  {
    label: "Last Synced",
    key: "last_income_tax_sync",
    render: (row) => {
      const formattedDate = moment(row?.last_income_tax_sync).format(
        "MMMM Do YYYY, h:mm:ss a"
      );

      return row?.last_income_tax_sync != "" ? (
        <div className="flex items-center h-14 justify-center">
          <Tag
            icon={<SyncOutlined spin />}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "200px",
              padding: "5px",
            }}
            color="volcano"
          >
            {formattedDate}
          </Tag>
        </div>
      ) : (
        <>
          <p>-</p>
        </>
      );
    },
  },
  {
    label: "Sync Notices",
    key: "action",
    render: (row) => {
      return (
        <div className="flex items-center justify-center">
          <Button onClick={() => {}}>
            <FaArrowsRotate />
          </Button>
        </div>
      );
    },
  },
];

const urlMapping = {
  fetchClients: {
    [ServiceType.GSTIN]: "fin_buddy.api.gst_client_list",
    [ServiceType.INCOME_TAX]: "fin_buddy.api.income_tax_client_list",
    [ServiceType.TDS]: "fin_buddy.api.tds_client_list",
  },
  addClients: {
    [ServiceType.GSTIN]: "fin_buddy.api.create_gst_client",
    [ServiceType.INCOME_TAX]: "fin_buddy.api.create_income_tax_client",
    [ServiceType.TDS]: "fin_buddy.api.create_tds_client",
  },
};

export const Clients = ({ serviceType }) => {
  const navigate = useNavigate();
  const [clientsData, setClientsData] = useState([]);
  const [fetchClientsData] = useAxiosPost(urlMapping.fetchClients[serviceType]);
  const [addNewClient] = useAxiosPost(urlMapping.addClients[serviceType]);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [clientLoading, setClientLoading] = useState(true);

  const getClientsData = () => {
    setClientLoading(true);
    fetchClientsData({
      payload: {
        start: 0,
        page_length: 20,
        search_query: "",
      },
      cb: (data) => {
        setClientsData(data?.result?.records || []);
        setTimeout(() => {
          setClientLoading(false);
        }, [1000]);
      },
    });
  };

  const handleAddClient = async (payload) => {
    addNewClient({
      payload,
      cb: (data) => {
        setOpenClientModal(false);
        toast.info("Added Client Successfully", {
          position: "top-right",
          autoClose: 5000,
        });

        getClientsData();
      },
    });
  };

  useEffect(() => {
    getClientsData();
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
      <Breadcrumb
        items={[
          {
            title: (
              <Link
                to={{
                  pathname: "/",
                }}
              >
                Home
              </Link>
            ),
          },
          {
            title: (
              <Link
                to={{
                  pathname:
                    serviceType == "gstin"
                      ? "/gstin"
                      : serviceType == "tds"
                      ? "/tds"
                      : "/income-tax",
                }}
              >
                {serviceType == "gstin"
                  ? "GST Registration"
                  : serviceType == "tds"
                  ? "TDS Filing"
                  : "Income Tax E-Filing"}
              </Link>
            ),
          },
          {
            title: "Clients",
          },
        ]}
        style={{
          marginBottom: "10px",
          color: "#151c40",
        }}
      />
      <PageTitle title="All Clients" navigate={() => navigate(-1)} />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 items-center pl-4 pr-4 justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => {
              setOpenClientModal(true);
            }}
            variant="outlined"
            icon={<FaPlus />}
            type="primary"
          >
            Add{" "}
            {serviceType == "gstin"
              ? "GST"
              : serviceType == "tds"
              ? "TDS"
              : "Income Tax"}{" "}
            Client
          </Button>
          <Button type="primary" icon={<FaFileImport />}>
            Import Client
          </Button>
        </div>

        <div>
          <Button
            type="primary"
            icon={<FaArrowsRotate />}
            onClick={() => {
              getClientsData();
            }}
          >
            Reload List
          </Button>
        </div>

        {/* <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
          Download Template
        </button> */}
        {/* <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
          Sync All
        </button> */}
      </div>

      <Table
        columns={columns}
        data={clientsData}
        isLoading={clientLoading}
        type="clients"
        serviceType={serviceType}
        itemsPerPage={10}
        rowRedirection={handleRowRedirection}
      />

      <AddClientModal
        open={openClientModal}
        handleClose={() => setOpenClientModal(false)}
        handleSubmit={handleAddClient}
        type={
          serviceType == "income-tax"
            ? "income-tax"
            : serviceType == "tds"
            ? "TDS"
            : "GST"
        }
        title={
          serviceType == "income-tax"
            ? "Income Tax"
            : serviceType == "tds"
            ? "TDS"
            : "GST"
        }
      />
    </>
  );
};
