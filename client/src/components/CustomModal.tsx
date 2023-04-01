import React, { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Modal, Spin } from "antd";
import { deleteFileService } from "../service/fileService";
import CustomToast from "./CustomToast";

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface Modal {
  open: boolean;
  setOpen: Function;
  setFileList: Function;
  file: number;
}

const CustomModal = (props: Modal) => {
  const { open, setOpen, setFileList, file } = props;

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data } = await deleteFileService(file);
      if (data) {
        setFileList(data.data);
        CustomToast({ message: data.message, title: "Successfull" });
        setOpen(false);
      }
    } catch (error: any) {
      CustomToast({ message: error.response.message, title: "Failed" });
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Are you sure you wnat to delete"
        open={open}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          {loading && <Spin />}
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;
