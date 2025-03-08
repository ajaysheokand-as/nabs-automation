import { Button, Modal, Form, Input, DatePicker } from "antd";
import React, { useState } from "react";
import AddClientLogo from "../../assets/images/ClentVerticalLogo.jpg";
import moment from "moment";

const fieldConfigs = {
  "income-tax": ["client_name", "username", "password", "dob"],
  GST: ["client_name", "username", "password"],
  TDS: ["client_name", "username", "password"],
};

const AddClientModal = ({
  open,
  handleClose,
  handleSubmit,
  type = "",
  title,
}) => {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormSubmit = (values) => {
    if (values.dob) {
      values.dob = values.dob.format("YYYY/MM/DD");
    }
    handleSubmit(values);
    form.resetFields();
    setIsFormValid(false);
  };

  const handleValuesChange = () => {
    setIsFormValid(
      form.isFieldsTouched(true) &&
        !form.getFieldsError().some(({ errors }) => errors.length)
    );
  };

  return (
    <Modal
      title={`Add ${title} Client`}
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      width={700}
    >
      <div className="w-full flex gap-6 p-4">
        {/* Image Section */}
        <div className="flex w-[50%]">
          <img src={AddClientLogo} draggable={false} className="rounded-lg" />
        </div>

        {/* Form Section */}
        <div className="flex-1">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            onValuesChange={handleValuesChange}
          >
            {fieldConfigs[type]?.map((field) => (
              <Form.Item
                key={field}
                label={field
                  .replace("_", " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                name={field}
                rules={[
                  {
                    required: field !== "dob",
                    message: `Please enter ${field}`,
                  },
                ]}
              >
                {field === "dob" ? (
                  <DatePicker format="YYYY/MM/DD" className="w-full" />
                ) : field === "password" ? (
                  <Input.Password
                    placeholder={`Enter ${field
                      .replace("_", " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}`}
                  />
                ) : (
                  <Input
                    placeholder={`Enter ${field
                      .replace("_", " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}`}
                  />
                )}
              </Form.Item>
            ))}

            <div className="text-right mt-4">
              <Button
                type="primary"
                htmlType="submit"
                className="min-w-[100px] w-full"
                disabled={!isFormValid}
              >
                Add Client
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddClientModal;
