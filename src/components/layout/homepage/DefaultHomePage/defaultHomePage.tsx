import React, { useEffect, useState } from "react";
import { Carousel, Image, QRCode } from "antd";
import "./defaultHomePage.css";
import { sendRequest } from "@/utils/api";
import { ObjectId } from "mongodb";

const contentStyle: React.CSSProperties = {
  height: "80vh",
  background: "#ccc",
  display: "flex",
  flexDirection: "column", // Keep content side-by-side in a row
};

interface DataType {
  _id: ObjectId;
  key: string; // Ensure key is a string type
  title: string;
  description: string; // Ensure description is a string
  image: string;
}

const DefaultHomePage: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const res = await sendRequest<IBackendRes<DataType[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/get-list-detail-homepage`,
        method: "GET",
      });
      setData(res.data || []);
    } catch (err) {
      console.error("Error fetching homepage details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Carousel-DefaultHomePage">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Carousel autoplay className="DefaultHomePage-Carousel">
          {data.map((item) => (
            <div key={item.key} className="DefaultHomePage-Carousel-content">
              <div style={contentStyle} className="Carousel-content">
                {/* Image or Video on the left side */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    margin: "0 auto",
                    borderRadius: "10px",
                  }}
                >
                  <Image
                    width="100%" // Ensure image fits container width
                    height="100%" // Ensure image fits container height
                    src={item.image} // Fallback to image if not a video
                    style={{
                      objectFit: "cover", // Ensure the image or video covers the container
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                {/* Text content on the right side */}
                <div
                  className="Carousel-content-right"
                  style={{
                    width: "100%",
                  }}
                >
                  <div className="chilren-right-content">
                    <div className="title">{item.title}</div>
                    <div>{item.description}</div>
                    <QRCode errorLevel="H" value="http://localhost:3000/" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default DefaultHomePage;
