import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { Table } from "../../components/Table";
import AppContext from "../../context/AppContext";
import { postData } from "../../api/apiService";
import { Button, Checkbox, Divider, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

export const EPForm = () => {
  const { selectedEproceeding, setSelectedEproceeding } =
    useContext(AppContext);
  const [sendResponse, setSendResponse] = useState(false);
  const [maskedFields, setMaskedFields] = useState([]);
  const [openResponseModal, setOpenResponseModal] = useState(false);

  const [viewResponseLoading, setViewResponseLoading] = useState(false);
  const [viewResponse, setViewResponse] = useState(null);

  const [actualResponseLoading, setActualResponseLoading] = useState(false);

  const [originalData, setOriginalData] = useState({});
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [changedFields, setChangedFields] = useState({});
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const proceedingID = queryParams.get("proccedingID");

  const decodedProceedingID = proceedingID
    ? decodeURIComponent(proceedingID)
    : null;

  console.log("CHANGEDD FIELDS", changedFields);
  const fields = [
    "Name",
    "Email",
    "Phone",
    "Address",
    "Date of Birth",
    "PAN",
    "Aadhaar",
  ];
  const [formData, setFormData] = useState({
    id: "Adjustment u/s 143(1)(a)-00030",
    client: "IN-TAX-CLT-00029",
    proceeding_name: "Adjustment u/s 143(1)(a)",
    assessment_year: "2019-20",
    financial_year: "",
    proceeding_status: "Active",
    notice_din: "CPC/1920/G22/1967353344",
    response_due_date: "2020-02-13",
    notice_sent_date: "2020-01-14",
    notice_section: "",
    document_reference_id: "",
    response_acknowledgement: "",
    notice_letter:
      "http://34.132.54.218/private/files/19205016735-AADxxxxx9K-G22.pdf",
    user_input: "",
    mask_this_data: "",
    response_message: "",
    is_terms_and_conditions_checked: 0,
    owner: "Administrator",
    modified_by: "Administrator",
    creation: "2025-03-03 17:06:03.290923",
    modified: "2025-03-03 17:06:03.483517",
    replies: [],
    other_documents: [],
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setMaskedFields((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
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

    setIsFormChanged(Object.keys(changedFields).length > 0);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const data = [
    { file_name: "file_name 1", file: "file", id: "ID" },
    { file_name: "file_name 2", file: "file", id: "ID" },
    { file_name: "file_name 3", file: "file", id: "ID" },
  ];

  const columns = [
    { label: "File Name", key: "file_name" },
    { label: "File", key: "file" },
  ];

  const getEproceedingDetails = async (selectedProceeding) => {
    const data = await postData("fin_buddy.api.e_proceeding_details", {
      id: selectedProceeding,
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
          doctype: "E Proceeding",
          docname: selectedProceeding,
          is_view_data_before_response_generation: "true",
        }
      );
      if (data?.message) {
        setViewResponse(data?.message?.data);
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
          doctype: "E Proceeding",
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
        console.log("DATA", data);
      }
    } catch (err) {
      console.log("Error", err);
    } finally {
      setTimeout(() => {
        setActualResponseLoading(false);
      }, 1000);
    }
  };

  const saveChanges = async (decodedProceedingID) => {
    try {
      setLoading(true);
      setActualResponseLoading(true);
      const data = await postData("fin_buddy.api.save_document", {
        doctype: "E Proceeding",
        docname: decodedProceedingID,
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
  useEffect(() => {
    if (decodedProceedingID) {
      getEproceedingDetails(decodedProceedingID);
    }
    return () => {
      setSelectedEproceeding(null);
    };
  }, [decodedProceedingID]);

  return (
    <>
      <PageTitle title="Details" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-6">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
          <div className="flex justify-between w-full">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              Tax Notice Form
            </h2>
            <Button
              disabled={!isFormChanged || loading}
              type="primary"
              className="min-w-[100px]"
              onClick={() => saveChanges(decodedProceedingID)}
            >
              {loading ? <LoadingOutlined spin /> : "Save"}
            </Button>
          </div>

          <Divider style={{ margin: 0, borderWidth: "0.8px" }} />

          {/* Group 1 - Notice Details */}
          <div className="mb-6 border-b border-gray-300 pb-6 mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Notice Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Proceeding Name
                </label>
                <input
                  type="text"
                  name="proceeding_name"
                  // readOnly={true}
                  value={formData.proceeding_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Assessment Year
                </label>
                <input
                  type="text"
                  name="financial_year"
                  // readOnly={true}
                  value={formData.financial_year}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Financial Year
                </label>
                <input
                  type="text"
                  readOnly
                  name="documentReference"
                  value={formData.documentReference}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Client
                </label>
                <input
                  name="client"
                  readOnly={true}
                  value={formData.client}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Proceeding Status
                </label>
                <input
                  name="proceeding_status"
                  value={formData.proceeding_status}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Group 2 - Taxpayer Information */}
          <div className="mb-6 border-b border-gray-300 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Notice Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Notice/ Communication Reference ID
                </label>
                <input
                  type="text"
                  name="notice_din"
                  readOnly={true}
                  value={formData.notice_din}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Notice Section
                </label>
                <input
                  type="text"
                  name="notice_section"
                  readOnly={true}
                  value={formData.notice_section}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Document reference ID
                </label>
                <input
                  type="text"
                  readOnly
                  name="document_reference_id"
                  value={formData.document_reference_id}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-6 border-b border-gray-300 pb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Response Due Date
                </label>
                <input
                  // type="date"
                  readOnly
                  name="response_due_date"
                  value={formData.response_due_date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Notice Sent Date
                </label>
                <input
                  readOnly
                  // type="date"
                  name="notice_sent_date"
                  value={formData.notice_sent_date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>
          {/* Group 3 - Document Information */}
          <div className="mb-6 border-b border-gray-300 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Documents{" "}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-gray-700 font-medium">
                    Notice/ Communication Reference ID
                  </label>
                  <a
                    href={formData.notice_letter || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-md"
                  >
                    View
                  </a>
                </div>
                <input
                  type="text"
                  name="notice_din"
                  value={formData.notice_din}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Upload Document
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-md cursor-pointer"
                />
                {formData.file && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected File: {formData.file.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mb-6 border-b border-gray-300 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Previous Replies{" "}
            </h3>
            <Table
              columns={columns}
              data={formData?.replies}
              type="replies"
              itemsPerPage={10}
              isPagination={0}
            />
          </div>
          <div className="mb-6 border-b border-gray-300 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              User Input{" "}
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
              <label className="block text-gray-700 font-medium">
                Other Document
              </label>
              <Table
                columns={columns}
                data={formData?.other_documents}
                type="documents"
                itemsPerPage={10}
                isPagination={0}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mask Data
            </label>
            <div className="flex flex-wrap gap-4">
              {fields.map((item, index) => {
                const value = item.toLowerCase().replace(/\s/g, "_");
                return (
                  <Checkbox
                    key={index}
                    name="maskData"
                    value={value}
                    className="rounded"
                    checked={maskedFields.includes(value)}
                    onChange={handleCheckboxChange}
                  >
                    {item}
                  </Checkbox>
                );
              })}
            </div>
            {maskedFields.includes("name") && (
              <div className="mt-4">
                <TextArea
                  variant="filled"
                  placeholder="Enter the names you want to mash in comma separated format here. (Example : name1, name2, name3)"
                  autoSize={{
                    minRows: 4,
                    maxRows: 6,
                  }}
                />
              </div>
            )}

            <div className="flex items-center gap-8 ">
              <Button
                type="primary"
                className="mt-4 mb-4"
                onClick={() => {
                  getViewResponseData(decodedProceedingID);
                  setOpenResponseModal(true);
                }}
              >
                View Data Before Response Generation
              </Button>

              {sendResponse && (
                <Button
                  variant="filled"
                  type="primary"
                  className="mt-4 mb-4"
                  onClick={() => genrateActualResponse(decodedProceedingID)}
                >
                  Generate Response
                </Button>
              )}
            </div>

            <p style={{ marginBottom: "20px" }}>
              <Checkbox
                checked={sendResponse}
                // disabled={disabled}
                onChange={onSendResponseChange}
              >
                Send your data to AI Model for response generation?
              </Checkbox>
            </p>
          </div>
          <div className="mb-6 border-b border-gray-300 pb-6">
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
        </div>
      </div>

      <Modal
        title={"Data"}
        width={900}
        footer={
          <Button
            type="primary"
            onClick={() => {
              setOpenResponseModal(false);
            }}
          >
            Close
          </Button>
        }
        loading={viewResponseLoading}
        open={openResponseModal}
        onCancel={() => {
          setOpenResponseModal(false);
          setViewResponse(null);
        }}
      >
        <div className="max-h-[50vh] overflow-auto  bg-gray-200 rounded-lg p-4">
          <pre>{viewResponse}</pre>
        </div>
      </Modal>
    </>
  );
};
