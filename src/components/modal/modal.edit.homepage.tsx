// import React, { useState } from "react";
// import { Button, Modal, Input, Form, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import "./modal.homepage.css";
// import { ObjectId } from "mongodb";
// import { sendRequest } from "@/utils/api";

// interface ModalEditHomepageProps {
//   record: {
//     title: string;
//     description: string;
//     image: string;
//     _id: ObjectId;
//   };
//   fetchData: () => void;
// }

// const ModalEditHomepage: React.FC<ModalEditHomepageProps> = ({
//   record,
//   fetchData,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [title, setTitle] = useState(record.title);
//   const [description, setDescription] = useState(record.description);
//   const [image, setImage] = useState(record.image); // Base64 image data
//   const [imageUrl, setImageUrl] = useState(record.image); // Preview URL
//   const [_id, set_id] = useState(record._id);

//   const showModal = () => setIsModalOpen(true);
//   const handleCancel = () => setIsModalOpen(false);

//   // Restrict file uploads to images only
//   const beforeUpload = (file: any) => {
//     const isImage = file.type.startsWith("image/");
//     if (!isImage) {
//       message.error("You can only upload image files!");
//     }
//     return isImage;
//   };

//   // Handle file selection and convert to Base64
//   const handleFileChange = (info: any) => {
//     if (info.file.status === "done") {
//       const file = info.file.originFileObj;
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         const base64Image = reader.result as string;
//         setImageUrl(base64Image); // Preview the image
//         setImage(base64Image); // Store the Base64 string
//       };

//       if (file) {
//         reader.readAsDataURL(file); // Convert file to Base64
//       }
//     } else if (info.file.status === "uploading") {
//       setImageUrl(URL.createObjectURL(info.file.originFileObj)); // Preview image URL
//     }
//   };

//   // Submit form data to the backend
//   const handleOk = async () => {
//     console.log("Image Base64: ", image); // Log the Base64 image
//     try {
//       const res = await sendRequest<IBackendRes<any>>({
//         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/edit-detail-homepage`,
//         method: "POST",
//         body: {
//           title,
//           description,
//           image, // Send Base64 image
//           _id,
//         },
//       });

//       if (res.data) {
//         fetchData(); // Reload data after update
//       }

//       setIsModalOpen(false); // Close the modal
//     } catch (err) {
//       message.error("Failed to update the homepage details.");
//     }
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal} className="custom-button-edit">
//         Edit
//       </Button>
//       <Modal
//         title="Edit Homepage Details"
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okText="Save Changes"
//         cancelText="Cancel"
//         okButtonProps={{
//           style: {
//             backgroundColor: "#ffc107",
//             borderColor: "#ffc107",
//             color: "black",
//           },
//         }}
//       >
//         <Form layout="vertical">
//           <Form.Item label="Title">
//             <Input value={title} onChange={(e) => setTitle(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Description">
//             <Input
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </Form.Item>
//           <Form.Item label="Image">
//             <Upload
//               name="image"
//               listType="picture"
//               showUploadList={false}
//               beforeUpload={beforeUpload}
//               onChange={handleFileChange}
//             >
//               <Button icon={<UploadOutlined />}>Select Image</Button>
//             </Upload>
//             {imageUrl && (
//               <div style={{ marginTop: 10 }}>
//                 <img
//                   src={imageUrl}
//                   alt="Image Preview"
//                   style={{ width: "100%", maxWidth: 200, height: "auto" }}
//                 />
//               </div>
//             )}
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default ModalEditHomepage;

import React, { useState } from "react";
import { Button, Modal, Input, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./modal.homepage.css";
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

const ModalEditHomepage: React.FC<ModalEditHomepageProps> = ({
  record,
  fetchData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(record.title);
  const [description, setDescription] = useState(record.description);
  const [image, setImage] = useState(record.image); // Base64 image data
  const [_id] = useState(record._id);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  // Restrict file uploads to images only
  const beforeUpload = (file: any) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };

  // Handle file selection and convert to Base64
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
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/edit-detail-homepage`,
        method: "POST",
        body: {
          title,
          description,
          image, // Send Base64 image
          _id,
        },
      });

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
      <Button type="primary" onClick={showModal} className="custom-button-edit">
        Edit
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
            backgroundColor: "#ffc107",
            borderColor: "#ffc107",
            color: "black",
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

export default ModalEditHomepage;
