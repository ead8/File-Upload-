import React, { useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { deleteFileService, getAllFileService } from "../service/fileService";
import { Image, Space, Spin, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CustomToast from "./CustomToast";
import CustomModal from "./CustomModal";
import File from "../Model/file";
import { URL } from "../config/config";

const CustomTable = () => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<number>(0);
 
  const getFile = async () => {
    setLoading(true);
    try {
      const { data } = await getAllFileService();
      setFileList(data.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getFile();
    return () => {
      setFileList([]);
    };
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {loading ? (
        <Spin />
      ) : (
        <Table
          style={{ width: "90%" }}
          dataSource={fileList}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
          columns={[
            {
              title: "id",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "File",
              render: (value) => {
                return (
                  <Space size={12}>
                    <Image width={200} src={`${URL}/${value.fileName}`} />
                  </Space>
                );
              },
              key: "fileName",
            },
            {
              title: "File Name",
              dataIndex: "fileName",
              key: "fileName",
            },
            {
              title: "File Size in KB",
              dataIndex: "fileSize",
              key: "fileSize",
            },
            {
              title: "Upload Date",
              render: (value) => {
                return <p>{new Date(value.uploadDate).toDateString()}</p>;
              },
              key: "uploadDate",
            },
            {
              title: () => {
                return <p>Delete</p>;
              },
              render: (value) => {
                return (
                  <DeleteOutlined
                    onClick={() => {
                      setOpen(true);
                      setFile(value.id);
                    }}
                  />
                );
              },
              key: "delete",
            },
          ]}
        />
      )}
      <CustomModal
        open={open}
        setOpen={setOpen}
        file={file}
        setFileList={setFileList}
      />
    </div>
  );
};

export default CustomTable;
