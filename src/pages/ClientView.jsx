import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAxiosPost } from "../hooks/useAxios";
import { ServiceType } from "../utils/enums";
import { Breadcrumb, Button, Input } from "antd";
import { FaPlus } from "react-icons/fa";

const urlMapping = {
  fetchClients: {
    [ServiceType.GSTIN]: "fin_buddy.api.gst_client_details",
    [ServiceType.INCOME_TAX]: "fin_buddy.api.income_tax_client_details",
    [ServiceType.TDS]: "fin_buddy.api.tds_client_details",
  },
};

export const ClientView = ({ serviceType }) => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  const [formData, setFormData] = useState({});

  const [fetchClientDetails] = useAxiosPost(
    urlMapping.fetchClients[serviceType]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    fetchClientDetails({
      payload: {
        id: clientId,
      },
      cb: (data) => {
        console.log(data);
        setFormData(data?.result || {});
      },
    });
  }, []);

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
            title: (
              <Link
                to={{
                  pathname:
                    serviceType == "gstin"
                      ? "/gstin/clients"
                      : serviceType == "tds"
                      ? "/tds/clients"
                      : "/income-tax/clients",
                }}
              >
                Clients{" "}
              </Link>
            ),
          },
          { title: `${clientId}` },
        ]}
        style={{
          marginBottom: "10px",
          color: "#151c40",
        }}
      />

      <PageTitle title="Client Details" />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        {/* Buttons */}
        {serviceType === ServiceType.INCOME_TAX && (
          <div className="flex justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                onClick={() =>
                  navigate(`/${serviceType}/responseoutstandings/${clientId}`)
                }
              >
                Response to Outstanding Demand
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  navigate(
                    `/${serviceType}/add-responseoutstandings/${clientId}`
                  )
                }
              >
                <FaPlus />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                onClick={() =>
                  navigate(`/${serviceType}/eproceedings/${clientId}`)
                }
              >
                E Proceeding{" "}
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  navigate(`/${serviceType}/add-eproceedings/${clientId}`)
                }
              >
                <FaPlus />
              </Button>
            </div>
          </div>
        )}

        {serviceType === ServiceType.GSTIN && (
          <div className="flex justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                onClick={() =>
                  navigate(`/${serviceType}/additional-notices/${clientId}`)
                }
              >
                GST Additional Notice And Order
              </Button>
              {/* <Button
                type="primary"
                onClick={() =>
                  navigate(`/${serviceType}/add-additional-notices/${clientId}`)
                }
              >
                <FaPlus />
              </Button> */}
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                onClick={() => navigate(`/${serviceType}/notices/${clientId}`)}
              >
                GST Notice And Order
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  navigate(`/${serviceType}/add-notices/${clientId}`)
                }
              >
                <FaPlus />
              </Button>
            </div>
          </div>
        )}

        {serviceType === ServiceType.TDS && (
          <div className="flex justify-between mb-6">
            <Button
              type="primary"
              onClick={() => navigate(`/${serviceType}/notices/${clientId}`)}
            >
              TDS Notice
            </Button>
          </div>
        )}

        {/* Client Details */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Client Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 text-sm">
                Client Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="clientName"
                value={formData.client_name}
                className="w-full p-2 border rounded bg-gray-100 text-gray-800 font-semibold"
              />
            </div>
            {serviceType != ServiceType.GSTIN && (
              <div>
                <label className="text-gray-600 text-sm">DOB</label>
                <Input
                  type="text"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="DD/MM/YYYY"
                  className="w-full p-2 border rounded bg-gray-100 text-gray-800"
                />
              </div>
            )}
          </div>
        </div>

        {/* Income Tax Login Credentials */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Login Credentials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 text-sm">
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="username"
                value={
                  serviceType === ServiceType.GSTIN
                    ? formData.gst_username
                    : formData?.username
                }
                className="w-full p-2 border rounded bg-gray-100 font-semibold text-gray-800"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm">
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                name="password"
                value={
                  serviceType === ServiceType.GSTIN
                    ? formData.gst_password
                    : formData?.password
                }
                className="w-full p-2 border rounded bg-gray-100 text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Sync Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Sync Details
          </h2>
          <div>
            <label className="text-gray-600 text-sm">Last Sync</label>
            <Input
              type="text"
              name="lastSync"
              value={
                serviceType === ServiceType.GSTIN
                  ? formData.last_gst_sync
                  : formData?.last_income_tax_sync
              }
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-gray-800"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">{formData.timezone}</p>
        </div>
        <div className="flex items-center  justify-end space-x-2 mt-4">
          <input
            type="checkbox"
            name="disabled"
            checked={formData.disabled}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <label className="text-gray-600 text-sm">Disabled</label>
        </div>
      </div>
    </>
  );
};
