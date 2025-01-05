import React, { useState } from "react";
import { Button, Modal, Input, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ObjectId } from "mongodb";
import { sendRequest } from "@/utils/api";

interface ModalEditHomepageProps {
  record: {
    title: string;
    description: string;
    image: string;
    _id: ObjectId;
  };
  fetchData: () => void;
}

const ModalDeleteHomepage: React.FC<ModalEditHomepageProps> = ({
  record,
  fetchData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(record.title);
  const [description, setDescription] = useState(record.description);
  const [image, setImage] = useState(record.image);
  const [imageUrl, setImageUrl] = useState(record.image);

  const [_id, set_id] = useState(record._id);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // const handleOk = () => {
  //   console.log("Updated Record hehe:", { _id });
  //   setIsModalOpen(false);
  // };

  const handleOk = async () => {
    console.log("check id", _id);

    try {
      const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/delete-detail-homepage`,
        method: "POST",
        body: {
          _id,
        },
      });

      if (res.data) {
        // Gọi lại hàm fetchData để tải lại dữ liệu mới
        set_id(record._id); // Reset the _id state
        fetchData();
      }

      setIsModalOpen(false);
    } catch (err) {
      message.error("Failed to update the homepage details.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const beforeUpload = (file: any) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === "done") {
      setImageUrl(URL.createObjectURL(info.file.originFileObj)); // Preview the image
      setImage(info.file.response?.url || ""); // Assuming the server returns a URL
    } else if (info.file.status === "uploading") {
      setImageUrl(URL.createObjectURL(info.file.originFileObj)); // Update preview as soon as file is selected
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="custom-button-delete"
      >
        Delete
      </Button>
      <Modal
        title="Edit Homepage Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save Changes"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            backgroundColor: "#dc3545", // Corrected color code
            borderColor: "#dc3545", // Corrected color code
            color: "white", // Text color
          },
        }}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Image">
            <Upload
              name="image"
              listType="picture"
              showUploadList={false} // Don't show file list
              beforeUpload={beforeUpload}
              onChange={handleFileChange}
              action="/upload" // Set this to your server endpoint for image upload if necessary
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
            {imageUrl && (
              <div style={{ marginTop: 10 }}>
                <img
                  src={imageUrl}
                  alt="Image Preview"
                  style={{ width: "100%", maxWidth: 200, height: "auto" }}
                />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalDeleteHomepage;
