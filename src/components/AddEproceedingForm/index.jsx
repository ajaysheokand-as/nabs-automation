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
import FileUploadModal from "../FileUploadModal";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { postData } from "../../api/apiService";
import { useAxiosPost } from "../../hooks/useAxios";

const { Option } = Select;

const AddEproceedingForm = ({ serviceType }) => {
  const [form] = Form.useForm();
  const [replyData, setReplyData] = useState([]);
  const { clientId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUploadType, setSelectedUploadType] = useState(null);
  const [noticeLetter, setNoticeLetter] = useState(null);
  const [responseAcknowledgement, setResponseAcknowledgement] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);

  const navigate = useNavigate();

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
      response_due_date: values.response_due_date
        ? moment(values.response_due_date).format("YYYY-MM-DD")
        : null,
      notice_sent_date: values.notice_sent_date
        ? moment(values.notice_sent_date).format("YYYY-MM-DD")
        : null,
      replies: replyData.map((reply) => ({
        file_name: reply.file_name,
        fileUrl: reply.file,
        key: reply.key,
      })),
      client: clientDetails.id,
    };

    try {
      setLoading(true);

      const data = await postData("fin_buddy.api.save_document", {
        doctype: "E Proceeding",
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
        if (selectedUploadType == "notice_letter") {
          form.setFieldsValue({ notice_letter: fileURL });
          setNoticeLetter(fileURL);
        } else if (selectedUploadType == "response_acknowledgement") {
          form.setFieldsValue({ response_acknowledgement: fileURL });
          setResponseAcknowledgement(fileURL);
        } else if (selectedUploadType?.startsWith("reply")) {
          const index = parseInt(selectedUploadType.split("-")[1], 10);
          const updatedReplyData = [...replyData];
          updatedReplyData[index].file = fileURL;
          setReplyData(updatedReplyData);
        }
      }

      const allValues = form.getFieldsValue();
      console.log("AFTER UPLOADEDDDD", allValues, "REPLYYY DAAT", replyData);

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

  const handleAddRow = () => {
    const newRow = { key: replyData.length + 1, file_name: "", file: null };
    setReplyData([...replyData, newRow]);
  };

  const handleEditRow = (index, field, value) => {
    const newData = [...replyData];
    newData[index][field] = value;
    setReplyData(newData);
  };

  const columns = [
    { title: "No.", dataIndex: "key", key: "key" },
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
                const updatedReplies = [...replyData];
                updatedReplies[index].file = null;
                setReplyData(updatedReplies);
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
      <PageTitle title="New E Proceeding" />
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
                    label="Proceeding Name"
                    name="proceeding_name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter proceeding name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Financial Year" name="financial_year">
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Notice/ Communication Reference ID"
                    name="notice_din"
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
                  <Form.Item
                    label="Document Reference ID"
                    name="document_reference_id"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Proceeding Status" name="proceeding_status">
                    <Select style={{ height: "42px" }}>
                      <Option value="Open">Open</Option>
                      <Option value="Close">Closed</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Notice Section" name="notice_section">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Client" name="client">
                    <Input disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Response Due Date" name="response_due_date">
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Notice Sent Date" name="notice_sent_date">
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card
              title="Documents"
              bordered={false}
              headStyle={{ borderBottom: "3px solid #f5f5f5" }}
              style={{ border: "4px solid #f5f5f5", marginBottom: "16px" }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Response Acknowledgement"
                    name="response_acknowledgement"
                  >
                    {responseAcknowledgement ? (
                      <div className="flex items-center space-x-2">
                        <a
                          href={responseAcknowledgement}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button icon={<LinkOutlined />}>
                            {" "}
                            <span>
                              {responseAcknowledgement?.split("/")?.pop()}
                            </span>
                          </Button>
                        </a>

                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            setResponseAcknowledgement(null);
                            form.setFieldsValue({
                              response_acknowledgement: "",
                            });
                          }}
                        />
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setSelectedUploadType("response_acknowledgement");
                          setIsModalVisible(true);
                        }}
                        icon={<UploadOutlined />}
                      >
                        Attach
                      </Button>
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Notice Letter" name="notice_letter">
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
                          setSelectedUploadType("notice_letter");
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

            <Card
              title="Replies"
              bordered={false}
              headStyle={{ borderBottom: "3px solid #f5f5f5" }}
              style={{ border: "4px solid #f5f5f5", marginBottom: "16px" }}
            >
              <Table
                columns={columns}
                dataSource={replyData}
                pagination={false}
                bordered
              />
              <Button
                onClick={handleAddRow}
                icon={<PlusOutlined />}
                className="mt-4"
              >
                Add Row
              </Button>
            </Card>

            <div className="flex justify-end mt-4">
              <Button disabled={loading} type="primary" htmlType="submit">
                {loading ? "Creating.." : "Create Notice"}
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

export default AddEproceedingForm;
