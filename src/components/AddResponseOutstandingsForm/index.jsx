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

const AddResponseOutstandingsForm = ({ serviceType }) => {
  const [form] = Form.useForm();
  const { clientId } = useParams();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Form Values:", values);

    const serviceEndpoint =
      serviceType == "gstin"
        ? "gstin"
        : serviceType == "tds"
        ? "tds"
        : "income-tax";

    navigate(`/${serviceEndpoint}/client-view/${clientId}`);
  };

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
                    name="demand_reference_number"
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
                  <Form.Item label="Assessment Year" name="assessmentYear">
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
                    <Input defaultValue="Nav Bharatss" disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Rectification Rights"
                    name="rectificationRights"
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Mode of Service" name="modeOfService">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Response Type" name="responseType">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Outstanding Demand Amount"
                    name="outstandingDemandAmount"
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Notice" name="notice_letter">
                    <Upload>
                      <Button icon={<UploadOutlined />}>Attach</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <div className="flex justify-end mt-4">
              <Button type="primary" htmlType="submit">
                Save and Create Response Outstanding
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddResponseOutstandingsForm;
