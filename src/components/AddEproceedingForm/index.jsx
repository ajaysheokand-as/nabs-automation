import React, { useState } from "react";
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
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import PageTitle from "../PageTitle";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const AddEproceedingForm = ({ serviceType }) => {
  const [form] = Form.useForm();
  const [replyData, setReplyData] = useState([]);
  const { clientId } = useParams();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Form Values:", values);
    console.log("Replies Data:", replyData);

    const serviceEndpoint =
      serviceType == "gstin"
        ? "gstin"
        : serviceType == "tds"
        ? "tds"
        : "income-tax";

    navigate(`/${serviceEndpoint}/client-view/${clientId}`);
  };

  const handleAddRow = () => {
    const newRow = { key: replyData.length + 1, fileName: "", file: null };
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
      dataIndex: "fileName",
      key: "fileName",
      render: (text, record, index) => (
        <Input
          value={text}
          placeholder="File Name"
          onChange={(e) => handleEditRow(index, "fileName", e.target.value)}
        />
      ),
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (text, record, index) => (
        <Upload
          beforeUpload={(file) => {
            handleEditRow(index, "file", file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Attach</Button>
        </Upload>
      ),
    },
  ];

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
                    name="proceedingName"
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
                  <Form.Item label="Financial Year" name="financialYear">
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Notice/ Communication Reference ID"
                    name="noticeReferenceId"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Assessment Year" name="assessmentYear">
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Document Reference ID"
                    name="documentReferenceId"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Proceeding Status" name="proceedingStatus">
                    <Select style={{ height: "42px" }}>
                      <Option value="open">Open</Option>
                      <Option value="closed">Closed</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Notice Section" name="noticeSection">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Client" name="client">
                    <Input defaultValue="Nav Bharatss" disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Response Due Date" name="responseDueDate">
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Notice Sent Date" name="noticeSentDate">
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
                    name="responseAcknowledgement"
                  >
                    <Upload>
                      <Button icon={<UploadOutlined />}>Attach</Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Notice Letter" name="noticeLetter">
                    <Upload>
                      <Button icon={<UploadOutlined />}>Attach</Button>
                    </Upload>
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
              <Button type="primary" htmlType="submit">
                Save and Create E-Proceeding
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddEproceedingForm;
