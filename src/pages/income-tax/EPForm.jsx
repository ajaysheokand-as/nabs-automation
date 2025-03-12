import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AppContext from "../../context/AppContext";
import { postData } from "../../api/apiService";
import {
  Button,
  Checkbox,
  Divider,
  Input,
  Modal,
  Table,
  Tag,
  Typography,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";
import {
  DeleteOutlined,
  LinkOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import WarningImage from "../../assets/images/Warning.png";
import SubmitGif from "../../assets/images/SubmitGif.gif";
import { useFormParams } from "../../hooks/useFormParams";
import axios from "axios";
import FileUploadModal from "../../components/FileUploadModal";

export const EPForm = ({ serviceType }) => {
  const { selectedEproceeding, setSelectedEproceeding } =
    useContext(AppContext);

  const [sendResponse, setSendResponse] = useState(false);
  const [maskedFields, setMaskedFields] = useState([
    "pan",
    "aadhaar_card",
    "dates",
    "email",
    "phone_number",
  ]);
  const [showMaskedData, setShowMaskedData] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [confirmSubmitModalOpen, setConfirmSubmitModalOpen] = useState(false);

  const [viewResponseLoading, setViewResponseLoading] = useState(false);
  const [viewResponse, setViewResponse] = useState(null);

  const [actualResponseLoading, setActualResponseLoading] = useState(false);
  const [unmaskedDataLoading, setUnmaskedDataLoading] = useState(false);
  const [unmaskedResponse, setUnmaskedResponse] = useState(null);
  const [openTandCModal, setOpenTandCModal] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const [originalData, setOriginalData] = useState({});
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [changedFields, setChangedFields] = useState({});
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const formType = queryParams.get("formType");
  const clientId = queryParams.get("clientId");

  const {
    decodedID,
    formParams,
    fetchData,
    saveData,
    decodedKey,
    FormTitle,
    FormEndpoint,
    initialFormData,
    FormBlueprint,
    FormType,
  } = useFormParams(serviceType, formType);

  const decodedDynamicFormID = decodedID ? decodeURIComponent(decodedID) : null;

  const [file, setFile] = useState(null);
  const [fileFormData, setFileFormData] = useState({
    is_private: "1",
    doctype: FormType,
    docname: decodedDynamicFormID,
  });

  const { Text } = Typography;

  const fields = ["PAN", "Email", "Phone Number", "Aadhaar Card", "Dates"];
  const [formData, setFormData] = useState(initialFormData);
  const [selectedUploadType, setSelectedUploadType] = useState(null);

  const [responseAcknowledgement, setResponseAcknowledgement] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked, name } = event.target;

    handleChange({
      target: {
        name: name,
        value: checked ? 1 : 0,
      },
    });
  };

  const onSendResponseChange = (e) => {
    setSendResponse(e.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "response_message") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    setChangedFields((prev) => {
      if (originalData[name] !== value) {
        return { ...prev, [name]: value };
      } else {
        const updatedFields = { ...prev };
        delete updatedFields[name];
        return updatedFields;
      }
    });

    setIsFormChanged(Object.keys(changedFields)?.length > 0);
  };

  console.log("FORM DATTAT", formData);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddRow = () => {
    const newRow = {
      key: formData?.replies.length + 1,
      file_name: "",
      file: null,
    };
    handleChange({
      target: { name: "replies", value: [...formData.replies, newRow] },
    });
  };

  const handleEditRow = (index, field, value) => {
    const newData = [...formData.replies];
    newData[index][field] = value;
    handleChange({
      target: { name: "replies", value: newData },
    });
  };

  const columns = [
    {
      title: "File Name",
      dataIndex: "file_name",
      key: "file_name",
      render: (text, record, index) => (
        <Input
          value={text}
          placeholder="File Name"
          onChange={(e) => handleEditRow(index, "file_name", e.target.value)}
        />
      ),
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (text, record, index) =>
        record.file ? (
          <div className="flex items-center space-x-2">
            <a href={record.file} target="_blank" rel="noopener noreferrer">
              <Button icon={<LinkOutlined />}>View</Button>
            </a>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                const updatedReplies = [...formData?.replies];
                updatedReplies[index].file = null;
                handleChange({
                  target: { name: "replies", value: updatedReplies },
                });
              }}
            />
          </div>
        ) : (
          <Button
            icon={<UploadOutlined />}
            onClick={() => {
              setSelectedUploadType(`reply-${index}`);
              setIsModalVisible(true);
            }}
          >
            Attach
          </Button>
        ),
    },
  ];

  const tdsColumns = [
    { title: "Notice ID", dataIndex: "id", key: "id" },
    {
      title: "Financial Year",
      dataIndex: "manual_demand",
      key: "manual_demand",
    },
    {
      title: "Manual Demand",
      dataIndex: "financial_year",
      key: "financial_year",
    },
    {
      title: "Processed Demand",
      dataIndex: "processed_demand",
      key: "processed_demand",
    },
    {
      title: "TDS Summary Details",
      dataIndex: "tds_summary_details",
      key: "tds_summary_details",
    },
  ];

  const getFormDetails = async (selectedID) => {
    const data = await postData(`${FormEndpoint}`, {
      id: selectedID,
    });
    setFormData(data?.result);
    setOriginalData(data?.result || {});
    console.log("data=>", data);
  };

  const getViewResponseData = async (selectedProceeding) => {
    try {
      setViewResponseLoading(true);
      const data = await postData(
        "fin_buddy.events.incometax_gov.fetch_response_from_gpt",
        {
          doctype: FormType,
          docname: selectedProceeding,
          is_view_data_before_response_generation: "true",
        }
      );
      if (data?.message) {
        setViewResponse(data?.message?.data);
        setSendResponse(true);
        console.log("DATA", data);
      }
    } catch (err) {
      console.log("Error", err);
    } finally {
      setTimeout(() => {
        setViewResponseLoading(false);
      }, 1000);
    }
  };

  const genrateActualResponse = async (selectedProceeding) => {
    try {
      setActualResponseLoading(true);
      const data = await postData(
        "fin_buddy.events.incometax_gov.fetch_response_from_gpt",
        {
          doctype: FormType,
          docname: selectedProceeding,
        }
      );
      if (data?.message) {
        handleChange({
          target: {
            name: "response_message",
            value: data?.message,
          },
        });
        toast.info("Genrated Response Successfully", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (err) {
      console.log("Error", err);
      toast.error("Error in Genrating Response", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setTimeout(() => {
        setActualResponseLoading(false);
        setOpenTandCModal(false);
      }, 1000);
    }
  };

  const saveChanges = async (decodedDynamicFormID) => {
    try {
      setLoading(true);

      const data = await postData("fin_buddy.api.save_document", {
        doctype: FormType,
        docname: decodedDynamicFormID,
        document_data: changedFields,
      });

      toast.info("Saved Changes Successfully", {
        position: "top-right",
        autoClose: 5000,
      });

      setChangedFields({});
      setOriginalData({ ...formData });
      setIsFormChanged(false);
    } catch (err) {
      toast.error("Error in Saving Changes ", {
        position: "top-right",
        autoClose: 5000,
      });
      console.log("Error", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleUpload = async (file) => {
    try {
      setUploadLoading(true);

      const payload = new FormData();
      payload.append("is_private", "1");
      payload.append("doctype", FormType);
      payload.append("docname", decodedDynamicFormID);
      payload.append("file", file, file.name);

      const token =
        localStorage.getItem("authToken") || "9fbc6df30ef1431:6d4f68e133966b7";
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${token}`,
        },
      };

      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "fin_buddy.api.upload_file",
        payload,
        config
      );

      const fileURL = response?.data?.file_url;

      if (fileURL) {
        if (selectedUploadType == "notice_letter") {
          handleChange({ target: { value: fileURL, name: "notice_letter" } });
        } else if (selectedUploadType == "response_acknowledgement") {
          handleChange("response_acknowledgement", {
            target: { value: fileURL, name: "notice_letter" },
          });

          setResponseAcknowledgement(fileURL);
        } else if (selectedUploadType?.startsWith("otherDocuments")) {
          const index = parseInt(selectedUploadType.split("-")[1], 10);
          const upadtedOtherDocuments = [...formData?.other_documents];
          upadtedOtherDocuments[index].file = fileURL;
          handleChange({
            target: { value: upadtedOtherDocuments, name: "other_documents" },
          });
        } else if (selectedUploadType?.startsWith("reply")) {
          const index = parseInt(selectedUploadType.split("-")[1], 10);
          const updatedReplyData = [...formData.replies];
          updatedReplyData[index].file = fileURL;
          handleChange({
            target: { value: updatedReplyData, name: "replies" },
          });
        }
      }

      toast.info("File uploaded successfully", {
        position: "top-right",
        autoClose: 5000,
      });

      handleModalClose();
    } catch (error) {
      toast.error("Error uploading file", {
        position: "top-right",
        autoClose: 5000,
      });
      console.error("Error:", error);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUploadType(null);
  };

  const handleSubmitResponse = async () => {
    try {
      setLoading(true);

      const data = await postData(
        "fin_buddy.events.incometax_gov.submit_response",
        {
          doctype: FormType,
          docname: decodedDynamicFormID,
          client_name: clientId,
        }
      );

      setConfirmSubmitModalOpen(true);
      setTimeout(() => {
        setConfirmSubmitModalOpen(false);
      }, 10000);
    } catch (err) {
      toast.error("Error in Submitting Response ", {
        position: "top-right",
        autoClose: 5000,
      });
      console.log("Error", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const showModal = () => {
    setIsSubmitModalOpen(true);
  };

  const handleOk = () => {
    setIsSubmitModalOpen(false);
    handleSubmitResponse();
  };

  const handleCancel = () => {
    setIsSubmitModalOpen(false);
  };

  const handleDocumentsAddRow = () => {
    const newRow = {
      key: formData?.other_documents.length + 1,
      file: "",
    };
    handleChange({
      target: {
        name: "other_documents",
        value: [...formData?.other_documents, newRow],
      },
    });
  };

  const attachedDocumentsColumns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (text, record, index) =>
        record.file ? (
          <div className="flex items-center space-x-2">
            <a href={record.file} target="_blank" rel="noopener noreferrer">
              <Button icon={<LinkOutlined />}>View</Button>
            </a>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                const updateddocuments = [...formData?.other_documents];
                updateddocuments[index].file = null;
                handleChange({
                  target: { name: "other_documents", value: updateddocuments },
                });
              }}
            />
          </div>
        ) : (
          <Button
            icon={<UploadOutlined />}
            onClick={() => {
              setSelectedUploadType(`otherDocuments-${index}`);
              setIsModalVisible(true);
            }}
          >
            Attach
          </Button>
        ),
    },
  ];

  useEffect(() => {
    if (decodedDynamicFormID) {
      getFormDetails(decodedDynamicFormID);
    }
    return () => {
      setSelectedEproceeding(null);
    };
  }, [decodedDynamicFormID]);

  useEffect(() => {
    if (isFormChanged) {
      setTimeout(() => {
        saveChanges(decodedDynamicFormID);
      }, 2000);
    }
  }, [isFormChanged]);

  console.log("FORM BLUE PRINT", FormBlueprint);

  return (
    <>
      <PageTitle title="Details" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-6">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
          <div className="flex justify-between w-full">
            <div className="flex gap-4 ">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
                {FormTitle}
              </h2>
              {isFormChanged && (
                <Tag color="red" style={{ height: "20px", marginTop: "5px" }}>
                  Not Saved
                </Tag>
              )}
            </div>

            {/* <Button
              disabled={!isFormChanged || loading}
              type="primary"
              className="min-w-[100px]"
              onClick={() => saveChanges(decodedDynamicFormID)}
            >
              {loading ? <LoadingOutlined spin /> : "Save"}
            </Button> */}
          </div>

          <Divider style={{ margin: 0, borderWidth: "0.8px" }} />

          {/* Group 1 - Client Details */}

          {FormBlueprint != null && FormBlueprint?.section1?.length > 0 && (
            <div className="mb-6 border-b border-gray-300 pb-6 mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Client Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {FormBlueprint?.section1?.map((item) => (
                  <div>
                    <label className="block text-gray-700 font-medium">
                      {item?.label}
                    </label>
                    <input
                      type="text"
                      name={item?.name}
                      readOnly={true}
                      value={formData[item?.name]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Group 2 - Taxpayer Information */}

          {FormBlueprint != null && FormBlueprint?.section2?.length > 0 && (
            <div className="mb-6 border-b border-gray-300 pb-6">
              {" "}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Notice Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {FormBlueprint?.section2?.map((item) => (
                  <div>
                    <label className="block text-gray-700 font-medium">
                      {item?.label}
                    </label>
                    <input
                      type="text"
                      name={item?.name}
                      readOnly={true}
                      value={formData[item?.name]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Group 3 */}
          {FormBlueprint != null && FormBlueprint?.section3?.length > 0 && (
            <div className="mb-6 border-b border-gray-300 pb-6">
              <div className="grid grid-cols-2 gap-4">
                {FormBlueprint?.section3?.map((item) => (
                  <div>
                    <label className="block text-gray-700 font-medium">
                      {item?.label}
                    </label>
                    <input
                      type="text"
                      name={item?.name}
                      readOnly={true}
                      value={formData[item?.name]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Group 4 - Document Information */}
          <div className="mb-6 border-b border-gray-300 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Documents{" "}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {FormBlueprint != null &&
                FormBlueprint?.section4?.length > 0 &&
                FormBlueprint?.section4?.map((item) => (
                  <div>
                    <div className="flex justify-between items-center">
                      <label className="block text-gray-700 font-medium">
                        {item?.label}
                      </label>
                    </div>
                    <input
                      type="text"
                      name={item?.name}
                      readOnly={true}
                      value={formData[item?.name]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              <div>
                {" "}
                <div className="flex justify-between items-center">
                  <label className="block text-gray-700 font-medium ">
                    Notice Letter
                  </label>
                </div>
                {formData?.notice_letter ? (
                  <div className="flex items-center space-x-2 ">
                    <a
                      href={formData?.notice_letter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        icon={<LinkOutlined />}
                        style={{
                          padding: "20px",
                          border: "1px solid #333",
                          width: "400px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {" "}
                        <span
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            display: "block",
                          }}
                        >
                          {formData?.notice_letter?.split("/")?.pop()}
                        </span>
                      </Button>
                    </a>

                    <Button
                      icon={<DeleteOutlined />}
                      style={{
                        padding: "20px",
                        border: "1px solid #333",
                      }}
                      onClick={() => {
                        handleChange({
                          target: { value: "", name: "notice_letter" },
                        });
                      }}
                    />
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setSelectedUploadType("notice_letter");
                      setIsModalVisible(true);
                    }}
                    style={{
                      padding: "20px",
                      border: "1px solid #333",
                      width: "450px",
                    }}
                    icon={<UploadOutlined />}
                  >
                    Attach Notice
                  </Button>
                )}
              </div>
            </div>
          </div>

          {FormBlueprint != null && FormBlueprint?.section5?.length > 0 && (
            <div className="mb-6 border-b border-gray-300 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {FormBlueprint?.section5?.[0]?.sectionHeader}
              </h3>
              <Table
                pagination={false}
                columns={decodedKey == "tdsNoticeID" ? tdsColumns : columns}
                dataSource={
                  decodedKey == "tdsNoticeID"
                    ? formData?.notices || []
                    : formData?.replies || []
                }
                bordered
              />

              {decodedKey !== "tdsNoticeID" && (
                <Button
                  onClick={handleAddRow}
                  icon={<PlusOutlined />}
                  className="mt-4"
                >
                  Add Row
                </Button>
              )}
            </div>
          )}

          <div className="mb-6 border-b border-gray-300 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              User input for response generation
            </h3>
            <div>
              {/* <label className="block text-gray-700 font-medium">User Input</label> */}
              <textarea
                name="userInput"
                value={formData.userInput}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                rows={4} // Adjust rows as needed
              />
            </div>

            <div>
              <label className="block  text-lg font-semibold mt-4 text-gray-700 font-medium">
                Attachments for response generation
              </label>

              <Table
                columns={attachedDocumentsColumns}
                dataSource={formData?.other_documents}
                pagination={false}
                bordered
              />
              <Button
                onClick={handleDocumentsAddRow}
                icon={<PlusOutlined />}
                className="mt-4"
              >
                Add Row
              </Button>

              {formData.file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected File: {formData.file.name}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mask This Data
            </label>
            <div className="mt-4 mb-4">
              <TextArea
                variant="filled"
                name="mask_this_data"
                value={formData.mask_this_data}
                onChange={handleChange}
                placeholder="Enter the names you want to mask in comma separated format here. (Example : name1, name2, name3)"
                autoSize={{
                  minRows: 6,
                  maxRows: 8,
                }}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Checkbox
                key={"checks_pan"}
                name="checks_pan"
                value={1}
                className="rounded"
                checked={formData?.checks_pan}
                onChange={handleCheckboxChange}
              >
                PAN
              </Checkbox>
              <Checkbox
                key={"checks_email"}
                name="checks_email"
                value={1}
                className="rounded"
                checked={formData?.checks_email}
                onChange={handleCheckboxChange}
              >
                Email
              </Checkbox>
              <Checkbox
                key={"checks_phone_number"}
                name="checks_phone_number"
                value={1}
                className="rounded"
                checked={formData?.checks_phone_number}
                onChange={handleCheckboxChange}
              >
                Phone Number
              </Checkbox>
              <Checkbox
                key={"checks_aadhar_card"}
                name="checks_aadhar_card"
                value={1}
                className="rounded"
                checked={formData?.checks_aadhar_card}
                onChange={handleCheckboxChange}
              >
                Aadhar Card
              </Checkbox>
              <Checkbox
                key={"checks_dates"}
                name="checks_dates"
                value={1}
                className="rounded"
                checked={formData?.checks_dates}
                onChange={handleCheckboxChange}
              >
                Dates
              </Checkbox>
            </div>

            <div className="flex items-center gap-8 ">
              <Button
                type="primary"
                className="mt-4 mb-4"
                onClick={() => {
                  getViewResponseData(decodedDynamicFormID);
                  setShowMaskedData(true);
                }}
              >
                View Data Before Response Generation
              </Button>
            </div>

            {showMaskedData && (
              <>
                {/* <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Masked Data
                </h3> */}
                <div className="max-h-[50vh] overflow-auto  bg-gray-200 rounded-lg p-4 w-full mt-2">
                  <pre>
                    {viewResponseLoading ? (
                      <div className="w-full flex justify-center items-center h-[40vh]">
                        <LoadingOutlined spin style={{ fontSize: "30px" }} />
                      </div>
                    ) : (
                      viewResponse
                    )}
                  </pre>
                </div>
              </>
            )}

            <p style={{ margin: "5px 0px" }}>
              <Checkbox
                checked={sendResponse}
                // disabled={disabled}
                onChange={onSendResponseChange}
              >
                Send your data to AI Model for response generation?
                <br />
                <span className="text-sm">
                  (Please <strong>View Data</strong> before generating
                  response.)
                </span>
              </Checkbox>
            </p>

            <Button
              variant="filled"
              type="primary"
              disabled={!sendResponse}
              className="my-4 min-w-[200px]"
              onClick={() => setOpenTandCModal(true)}
            >
              Generate Response
            </Button>
          </div>
          {formData.response_message && (
            <div className="mb-6  pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Response Message
              </h3>
              <div>
                <ReactQuill
                  theme="snow"
                  value={formData.response_message}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: "response_message",
                        value: value,
                      },
                    })
                  }
                  className="bg-white w-full p-2 border rounded-md"
                />
              </div>
            </div>
          )}

          {/* {viewResponse && (
            <Button
              variant="filled"
              type="primary"
              disabled={unmaskedDataLoading}
              className="mb-4 min-w-[200px]"
              onClick={() => {
                insertUnmaskedData();
              }}
            >
              {unmaskedDataLoading ? (
                <LoadingOutlined spin />
              ) : (
                "View Unmasked Data"
              )}
            </Button>
          )} */}

          {/* {unmaskedResponse && (
            <div className="border-b border-gray-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Unmasked Data
              </h3>
              <ReactQuill
                theme="snow"
                value={unmaskedResponse}
                onChange={(value) => setUnmaskedResponse(value)}
                className="bg-white w-full p-2 border rounded-md"
              />
            </div>
          )} */}

          <Divider style={{ borderWidth: "0.8" }} />
          <div className="w-full flex justify-end">
            <Button
              variant="filled"
              type="primary"
              disabled={
                formData.response_message == null ||
                formData.response_message == ""
              }
              className="mb-4 min-w-[200px]"
              onClick={() => {
                showModal();
              }}
            >
              Submit Response
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title=""
        open={isSubmitModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        style={{ top: -50 }}
      >
        <div className="flex items-center justify-center flex-col">
          <img src={WarningImage} width={250} height={250} />
          <p>Are you sure you want to submit response?</p>
        </div>
      </Modal>
      <Modal
        title="Message"
        open={confirmSubmitModalOpen}
        footer={null}
        onClose={() => {
          setConfirmSubmitModalOpen(false);
        }}
        centered
        style={{ top: -50 }}
      >
        <div className="flex items-center justify-center flex-col">
          <img src={SubmitGif} width={250} height={250} />
          <p className="text-sm text-gray-500 text-center">
            Please wait, we will take you to the window where you can submit
            your response.
          </p>
        </div>
      </Modal>

      <Modal
        title="Terms and Conditions"
        open={openTandCModal}
        onCancel={() => setOpenTandCModal(false)}
        footer={null}
        centered
        style={{ minHeight: "500px" }}
      >
        <div style={{ maxHeight: "400px", overflowY: "auto", padding: "10px" }}>
          <h3>Sample Terms and Conditions</h3>
          <p>
            <strong>1. Acceptance of Terms:</strong> By using this service, you
            acknowledge and agree to comply with all applicable laws and
            regulations. Failure to adhere may result in suspension or
            termination of access.
          </p>
          <p>
            <em>2. Modification of Terms:</em> We reserve the right to modify
            these terms at any time without prior notice. Changes will be
            effective immediately upon posting on our platform.
          </p>
          <p>
            <strong>3. User Responsibilities:</strong> You must ensure that your
            use of the platform aligns with ethical standards and does not
            violate any policies.
          </p>
          <p>
            4. <em>Privacy and Data Collection:</em> We may collect and process
            personal data as per our privacy policy. It is your responsibility
            to review the policy and understand how your data is handled.
          </p>
          <p>
            <strong>5. Service Availability:</strong> While we strive to provide
            uninterrupted access, we do not guarantee that the service will
            always be available, secure, or error-free.
          </p>
          <p>
            <em>6. Intellectual Property:</em> All content, trademarks, and data
            available on this platform remain the property of the respective
            owners and should not be used without permission.
          </p>
          <p>
            7. <strong>Limitation of Liability:</strong> We shall not be liable
            for any direct, indirect, incidental, or consequential damages
            arising from the use of our services.
          </p>
        </div>
        <div className="mt-6">
          <Checkbox onChange={(e) => setAccepted(e.target.checked)}>
            I accept the Terms and Conditions
          </Checkbox>
        </div>

        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <Button
            type="primary"
            disabled={!accepted || actualResponseLoading}
            onClick={() => genrateActualResponse(decodedDynamicFormID)}
            className="min-w-[100px]"
          >
            {actualResponseLoading ? <LoadingOutlined spin /> : "Generate "}
          </Button>
        </div>
      </Modal>

      <FileUploadModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onUpload={handleUpload}
        disabled={uploadLoading}
      />
    </>
  );
};
