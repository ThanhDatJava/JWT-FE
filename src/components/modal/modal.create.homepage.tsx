import React, { useState } from "react";
import { Button, Modal, Input, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./modal.homepage.css";
import { ObjectId } from "mongodb";
import { sendRequest } from "@/utils/api";

interface ModalEditHomepageProps {
  fetchData: () => void;
}

const ModalCreateHomepage: React.FC<ModalEditHomepageProps> = ({
  fetchData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // Base64 image data

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    setDescription("");
    setImage("");
    setTitle("");
  };

  // Restrict file uploads to images only
  const beforeUpload = (file: any) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === "done") {
      const file = info.file.originFileObj;
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImage(base64Image); // Store the Base64 string
      };

      if (file) {
        reader.readAsDataURL(file); // Convert file to Base64
      }
    }
  };

  // Submit form data to the backend
  const handleOk = async () => {
    try {
      const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/create-detail-homepage`,
        method: "POST",
        body: {
          title,
          description,
          image, // Send Base64 image
        },
      });

      const errors = [];

      if (!title) errors.push("Homepage details title empty !");
      if (!image) errors.push("Homepage details image empty !");
      if (!description) errors.push("Homepage details description empty !");

      if (errors.length > 0) {
        errors.forEach((error) => message.error(error));
        return;
      }

      if (res.data) {
        fetchData(); // Reload data after update
        setDescription("");
        setImage("");
        setTitle("");
        message.success("Homepage details updated successfully.");
      }
      setIsModalOpen(false); // Close the modal
    } catch (err) {
      message.error("Failed to update the homepage details. Please try again.");
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="custom-button-create"
      >
        Create
      </Button>
      <Modal
        title="Create Homepage Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save Changes"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            backgroundColor: "#28a745",
            borderColor: "#28a745",
            color: "white",
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
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
            {image && (
              <div style={{ marginTop: 10 }}>
                <img
                  src={image}
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

export default ModalCreateHomepage;
