import React from "react";
import { UploadOutlined } from "@ant-design/icons";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Spin, Typography, UploadProps } from "antd";
import { Button, message, Upload } from "antd";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RcFile, UploadChangeParam } from "antd/lib/upload/interface";

import { URL } from "../config/config";
import { postFileService } from "../service/fileService";
import CustomToast from "./CustomToast";
import Title from "antd/es/typography/Title";

const UploadFile: React.FC = () => {
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const props: UploadProps = {
    name: "file",
    action: URL,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    async beforeUpload(file: RcFile) {
      const isLt5M = file.size / 1024 / 1024 <= 10;
      if (!isLt5M) {
        return message.error("File must smaller than 10MB!");
      }
      const formData = new FormData();
      formData.append("picture", file);
      try {
        setIsUploading(true);
        const { data } = await postFileService(formData);
        if (data.data)
          CustomToast({ message: "Successfull", title: data.data });
      } catch (error: any) {
        CustomToast({ message: "Failed", title: error.response.data.message });
      }
      setIsUploading(false);
      return false;
    },
  };

  return (
    <div style={{ padding: "10px", textAlign: "center", width: "100%" }}>
      <Title level={3} type="warning">
        Welcome to file upload portal
      </Title>
      <Upload {...props}>
        <Button icon={<UploadOutlined />} loading={isUploading}>
          Click to Upload
        </Button>
      </Upload>
    </div>
  );
};

export default UploadFile;
