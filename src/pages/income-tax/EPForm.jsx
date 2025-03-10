import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { Table } from "../../components/Table";
import AppContext from "../../context/AppContext";
import { postData } from "../../api/apiService";
import { Button, Checkbox, Divider, Modal, Tag, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import WarningImage from "../../assets/images/Warning.png";
import { useFormParams } from "../../hooks/useFormParams";
import axios from "axios";

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

    setIsFormChanged(Object.keys(changedFields)?.length > 0);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const columns = [
    { label: "File Name", key: "file_name" },
    { label: "File", key: "file" },
  ];

  const tdsColumns = [
    { label: "Notice ID", key: "id" },
    { label: "Financial Year", key: "manual_demand" },
    { label: "Manual Demand", key: "financial_year" },
    { label: "Processed Demand", key: "processed_demand" },
    { label: "TDS Summary Details", key: "tds_summary_details" },
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

  const uploadFile = async () => {
    try {
      setLoading(true);

      console.log("FILEEL", file);

      const payload = new FormData();
      payload.append("is_private", fileFormData.is_private);
      payload.append("doctype", fileFormData.doctype);
      payload.append("docname", fileFormData.docname);
      payload.append("attached_to_field", file, file.name);

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

      toast.info("File uploaded successfully", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (error) {
      toast.error("Error uploading file", {
        position: "top-right",
        autoClose: 5000,
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsSubmitModalOpen(true);
  };

  const handleOk = () => {
    setIsSubmitModalOpen(false);
  };

  const handleCancel = () => {
    setIsSubmitModalOpen(false);
  };

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
          <div className="mb-6 border-b border-gray-300 pb-6 mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Client Details
            </h3>

            {FormBlueprint != null && FormBlueprint?.section1?.length > 0 && (
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
            )}
          </div>

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
                    Upload Document
                  </label>
                  {file && (
                    <p
                      type="text"
                      className="text-blue-600 hover:underline text-md cursor-pointer "
                      onClick={uploadFile}
                    >
                      Upload File
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className=" p-2 border rounded-md cursor-pointer w-full"
                />
              </div>
            </div>
          </div>

          {FormBlueprint != null && FormBlueprint?.section5?.length > 0 && (
            <div className="mb-6 border-b border-gray-300 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {FormBlueprint?.section5?.[0]?.sectionHeader}
              </h3>
              <Table
                columns={decodedKey == "tdsNoticeID" ? tdsColumns : columns}
                data={
                  decodedKey == "tdsNoticeID"
                    ? formData?.notices || []
                    : formData?.replies || []
                }
                type={decodedKey == "tdsNoticeID" ? "notices" : "replies"}
                itemsPerPage={10}
                isPagination={0}
              />
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
                columns={columns}
                data={formData?.other_documents || []}
                type="documents"
                itemsPerPage={10}
                isPagination={0}
              />

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
    </>
  );
};
