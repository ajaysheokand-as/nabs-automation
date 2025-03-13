import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAxiosPost } from "../hooks/useAxios";
import { ServiceType } from "../utils/enums";
import { Badge, Breadcrumb, Button, Input, Modal, Popover } from "antd";
import {
  FaArrowUpRightFromSquare,
  FaArrowsRotate,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import {
  FaAngleDoubleDown,
  FaAngleDown,
  FaAngleUp,
  FaPlus,
} from "react-icons/fa";
import UniversalLoader from "../components/UniversalLoader";
import FetchNoticesImg from "../assets/images/FETCHNOTICES.jpg";
import { toast } from "react-toastify";
import WarningImage from "../assets/images/Warning.png";

const urlMapping = {
  fetchClients: {
    [ServiceType.GSTIN]: "fin_buddy.api.gst_client_details",
    [ServiceType.INCOME_TAX]: "fin_buddy.api.income_tax_client_details",
    [ServiceType.TDS]: "fin_buddy.api.tds_client_details",
  },
  syncNotices: {
    [ServiceType.GSTIN]: "fin_buddy.events.gst_gov.process_selected_clients",
    [ServiceType.INCOME_TAX]:
      "fin_buddy.events.incometax_gov.process_selected_clients",
    [ServiceType.TDS]: "fin_buddy.events.tds_gov.process_selected_clients",
  },
  clientLogin: {
    [ServiceType.GSTIN]: "fin_buddy.events.gst_gov.login_into_portal",
    [ServiceType.INCOME_TAX]:
      "fin_buddy.events.incometax_gov.login_into_portal",
    [ServiceType.TDS]: "fin_buddy.events.tds_gov.login_into_portal",
  },
};

export const ClientView = ({ serviceType }) => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  const [loaderText, setLoaderText] = useState("Fetching Notices");
  const [formData, setFormData] = useState({});
  const [responseOutstandingsCount, setResponseOutstandingsCount] = useState(0);
  const [eproceedingsCount, setEproceedingsCount] = useState(0);
  const [syncClientNoticesData] = useAxiosPost(
    urlMapping.syncNotices[serviceType]
  );

  const [syncClientLoginData] = useAxiosPost(
    urlMapping.clientLogin[serviceType]
  );
  const [syncNoticeLoading, setSyncNoticesLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [fetchNoticeModal, setFetchNoticeModal] = useState(false);
  const [initiateLoginModal, setInitiateLoginModal] = useState(false);

  const [fetchNoticeCounts] = useAxiosPost("frappe.desk.reportview.get_count");

  const [fetchClientDetails] = useAxiosPost(
    urlMapping.fetchClients[serviceType]
  );

  const getNoticesCount = (docType) => {
    fetchNoticeCounts({
      payload: {
        doctype: docType,
        filters: [["client", "=", clientId]],
      },
      cb: (data) => {
        if (docType == "Response to Outstanding Demand") {
          setResponseOutstandingsCount(data?.message);
        } else if ("E Proceeding") {
          setEproceedingsCount(data?.message);
        }
      },
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const syncClientNotices = (data) => {
    setSyncNoticesLoading(true);
    syncClientNoticesData({
      payload: {
        client_names: data,
      },
      cb: (data) => {
        setTimeout(() => {
          setSyncNoticesLoading(false);
          toast.info("Process of fetching notices is started");
          setSelectedClient(null);
        }, [1000]);
      },
    });
  };

  const initiateClientLogin = () => {
    setSyncNoticesLoading(true);
    syncClientLoginData({
      payload: {
        client_name: clientId,
      },
      cb: (data) => {
        setTimeout(() => {
          setSyncNoticesLoading(false);
          toast.info("Processing started");
        }, [1000]);
      },
    });
  };

  const handleOk = () => {
    setLoaderText("Fetch Notices");
    setFetchNoticeModal(false);
    syncClientNotices([clientId]);
  };

  const handleCancel = () => {
    setFetchNoticeModal(false);
  };

  const handlLogineOk = () => {
    setLoaderText("Queueing Selected Clients for Processing");
    setInitiateLoginModal(false);
    initiateClientLogin();
  };

  const handleLoginCancel = () => {
    setInitiateLoginModal(false);
  };

  useEffect(() => {
    if (clientId) {
      fetchClientDetails({
        payload: {
          id: clientId,
        },
        cb: (data) => {
          setFormData(data?.result || {});
        },
      });
    }
  }, [clientId]);

  useEffect(() => {
    if (serviceType == "income-tax") {
      getNoticesCount("Response to Outstanding Demand");
      getNoticesCount("E Proceeding");
    }
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
        {serviceType === ServiceType.INCOME_TAX && (
          <>
            <div className="flex justify-end mb-6 gap-4">
              <div className="flex items-center gap-4">
                <Popover
                  placement="bottom"
                  content={
                    <div className="flex flex-col p-0">
                      <p
                        onClick={() => {
                          setInitiateLoginModal(true);
                        }}
                        className="flex gap-2  items-center border-solid border-b-[2px] p-2 border-gray-300 text-gray-500 font-normal hover:font-semibold cursor-pointer"
                      >
                        <FaArrowRightFromBracket /> Login
                      </p>
                      <p
                        onClick={() => setFetchNoticeModal(true)}
                        className="p-2 flex gap-2  items-center text-gray-500 font-normal hover:font-semibold cursor-pointer"
                      >
                        <FaArrowsRotate /> Fetch Notices
                      </p>
                    </div>
                  }
                >
                  <Button type="primary">
                    Actions <FaAngleDoubleDown />
                  </Button>
                </Popover>
              </div>
              <div className="flex items-center gap-4">
                <Popover
                  placement="bottom"
                  content={
                    <div className="flex flex-col p-0">
                      <p
                        onClick={() =>
                          navigate(`/${serviceType}/eproceedings/${clientId}`)
                        }
                        className="flex gap-2  items-center border-solid border-b-[2px] p-2 border-gray-300 text-gray-500 font-normal hover:font-semibold cursor-pointer"
                      >
                        <FaArrowUpRightFromSquare /> E Proceeding
                      </p>
                      <p
                        onClick={() =>
                          navigate(
                            `/${serviceType}/responseoutstandings/${clientId}`
                          )
                        }
                        className="p-2 flex gap-2  items-center text-gray-500 font-normal hover:font-semibold cursor-pointer"
                      >
                        <FaArrowUpRightFromSquare /> Response To Outstanding
                        Demand
                      </p>
                    </div>
                  }
                >
                  <Button type="primary">
                    View Notices <FaAngleDoubleDown />
                  </Button>
                </Popover>
              </div>
            </div>
          </>
        )}

        {/* Buttons */}
        {serviceType === ServiceType.INCOME_TAX && (
          <>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Connections
            </h2>
            <div className="flex justify-between mb-6">
              <div className="flex items-center gap-4">
                <Badge
                  count={responseOutstandingsCount}
                  style={{ zIndex: "10" }}
                >
                  <Button
                    type="primary"
                    onClick={() =>
                      navigate(
                        `/${serviceType}/responseoutstandings/${clientId}`
                      )
                    }
                  >
                    Response to Outstanding Demand
                  </Button>
                </Badge>
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
              <div className="flex items-center gap-4">
                <Badge count={eproceedingsCount} style={{ zIndex: "10" }}>
                  <Button
                    type="primary"
                    onClick={() =>
                      navigate(`/${serviceType}/eproceedings/${clientId}`)
                    }
                  >
                    E Proceeding{" "}
                  </Button>
                </Badge>

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
          </>
        )}

        {serviceType === ServiceType.GSTIN && (
          <div className="flex justify-between mb-6">
            <div className="flex items-center gap-4">
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

      <Modal
        title="Confirmation"
        open={fetchNoticeModal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        style={{ top: -50 }}
        zIndex={99999}
      >
        <div className="flex items-center justify-center flex-col text-center">
          <img
            src={FetchNoticesImg}
            width={250}
            height={250}
            className="rounded-lg"
          />
          <p className="text-lg mt-4">
            Are you sure you want to fetch{" "}
            <strong>
              {serviceType == "income-tax"
                ? "Income Tax"
                : serviceType == "tds"
                ? "TDS"
                : "GST"}{" "}
            </strong>
            notices for <strong>{selectedClient?.client_name}</strong> ?
          </p>
        </div>
      </Modal>

      <Modal
        title="Confirmation"
        open={initiateLoginModal}
        onOk={handlLogineOk}
        onCancel={handleLoginCancel}
        centered
        style={{ top: -50 }}
        zIndex={99999}
      >
        <div className="flex items-center justify-center flex-col text-center">
          <img
            src={WarningImage}
            width={250}
            height={250}
            className="rounded-lg"
          />
          <p className="text-lg mt-4">Are you sure you want to Login ? </p>
        </div>
      </Modal>

      <UniversalLoader show={syncNoticeLoading} text={loaderText} />
    </>
  );
};
