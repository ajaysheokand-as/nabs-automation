import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Upload,
  Card,
  Row,
  Col,
  Table,
} from "antd";
import {
  DeleteOutlined,
  LinkOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import PageTitle from "../PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useAxiosPost } from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { postData } from "../../api/apiService";
import axios from "axios";
import FileUploadModal from "../FileUploadModal";

const { Option } = Select;

const AddResponseOutstandingsForm = ({ serviceType }) => {
  const [form] = Form.useForm();
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [noticeLetter, setNoticeLetter] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const [fetchClientDetails] = useAxiosPost(
    "fin_buddy.api.income_tax_client_details"
  );

  const onFinish = async (values) => {
    console.log("Form Values:", values);

    const serviceEndpoint =
      serviceType == "gstin"
        ? "gstin"
        : serviceType == "tds"
        ? "tds"
        : "income-tax";

    const payload = {
      ...values,
      client: clientDetails.id,
    };

    try {
      setLoading(true);

      const data = await postData("fin_buddy.api.save_document", {
        doctype: "Response to Outstanding Demand",
        document_data: payload,
      });

      toast.info("Created Notice Successfully", {
        position: "top-right",
        autoClose: 5000,
      });

      setTimeout(() => {
        navigate(`/${serviceEndpoint}/client-view/${clientId}`);
      }, 500);
    } catch (err) {
      toast.error("Error in Creating notice ", {
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
      payload.append("doctype", "E Proceeding");
      payload.append("docname", clientId);
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
        form.setFieldsValue({ notice_letter: fileURL });
        setNoticeLetter(fileURL);
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
  };

  useEffect(() => {
    fetchClientDetails({
      payload: {
        id: clientId,
      },
      cb: (data) => {
        console.log(data);
        setClientDetails(data?.result || {});
      },
    });
  }, []);

  useEffect(() => {
    if (clientDetails) {
      form.setFieldValue("client", clientDetails?.client_name);
    }
  }, [clientDetails]);

  return (
    <div>
      <PageTitle title="New Response To Outstanding Demand" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="w-full"
          >
            <Card
              title="Notice Details"
              bordered={false}
              style={{ border: "4px solid #f5f5f5", marginBottom: "16px" }}
              headStyle={{ borderBottom: "3px solid #f5f5f5" }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Demand Reference No"
                    name="demand_reference_no"
                    rules={[
                      {
                        required: true,
                        message: "Please enter demand reference number",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Assessment Year" name="assessment_year">
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Section Code" name="section_code">
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Client" name="client">
                    <Input disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Rectification Rights"
                    name="rectification_rights"
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Mode of Service" name="mode_of_service">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Response Type" name="response_type">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Outstanding Demand Amount"
                    name="outstanding_demand_amount"
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Notice" name="notice_letter">
                    {noticeLetter ? (
                      <div className="flex items-center space-x-2">
                        <a
                          href={noticeLetter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button icon={<LinkOutlined />}>
                            {" "}
                            <span>{noticeLetter?.split("/")?.pop()}</span>
                          </Button>
                        </a>

                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            setNoticeLetter(null);
                            form.setFieldsValue({ notice_letter: "" });
                          }}
                        />
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setIsModalVisible(true);
                        }}
                        icon={<UploadOutlined />}
                      >
                        Attach
                      </Button>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <div className="flex justify-end mt-4">
              <Button type="primary" htmlType="submit">
                Create Notice
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <FileUploadModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onUpload={handleUpload}
        disabled={uploadLoading}
      />
    </div>
  );
};

export default AddResponseOutstandingsForm;
