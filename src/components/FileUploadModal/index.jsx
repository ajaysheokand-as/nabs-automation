import React, { useEffect, useState } from "react";
import { Modal, Upload, Button, List, message } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

const FileUploadModal = ({ visible, onClose, onUpload, disabled }) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    const uploadedUrls = await Promise.all(
      fileList.map((file) => onUpload(file))
    );
    onClose(uploadedUrls); // Send uploaded URLs back to parent
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        message.error(
          `${file.name} is not a valid file type. Only PDF, DOC, and DOCX files are allowed.`
        );
        return Upload.LIST_IGNORE;
      }

      setFileList((prev) => [...prev, file]);
      return false;
    },
    fileList,
    onRemove: (file) => {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
  };

  useEffect(() => {
    if (visible === false) {
      setFileList([]);
    }
  }, [visible]);

  return (
    <Modal
      open={visible}
      onCancel={() => onClose([])}
      footer={
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0 || disabled}
        >
          Upload
        </Button>
      }
      title="Upload Files"
    >
      <Upload.Dragger {...uploadProps} multiple>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p>Drag and drop files here or click to select files</p>
        <p>(Only PDF, DOC, and DOCX files are allowed)</p>
      </Upload.Dragger>
      {fileList.length > 0 && (
        <List
          className="mt-4"
          style={{ marginTop: "10px" }}
          bordered
          dataSource={fileList}
          renderItem={(file) => <List.Item>{file.name}</List.Item>}
        />
      )}
    </Modal>
  );
};

export default FileUploadModal;
