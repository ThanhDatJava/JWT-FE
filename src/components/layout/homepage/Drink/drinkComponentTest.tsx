"use client";

import { Card, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Flex, Slider, Switch, Typography } from "antd";
import { sendRequest } from "@/utils/api";

interface IDrink {
  id: string;
  name: string;
  description?: string;
  descriptionMore?: string;
  details?: string;
  imageUrl?: string;
  price?: string;
}

const DrinkComponentTest = (props: any) => {
  const { Meta } = Card;
  const [rows, setRows] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState<IDrink | null>(null); // State to hold drink data
  const [loading, setLoading] = useState(true); // State to track loading status

  const { drink } = props;
  console.log("check drink : ", drink);

  useEffect(() => {
    const fetchDrinkData = async () => {
      setLoading(true);
      const name = drink;

      if (!name) {
        console.error("Invalid drink name:", name);
        setData(null);
        setLoading(false);
        return;
      }

      try {
        const res = await sendRequest<IBackendRes<IDrink>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/get-detail-drink-by-name`,
          method: "POST", // Change method to POST
          body: { name: drink }, // Send name in the body
        });
        console.log("check res ", res);

        if (res && res.data) {
          setData(res.data);
        } else {
          console.error("No data found in the response", res);
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinkData();
  }, [drink]);

  // If data is loading, show loading spinner
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  // If no data found or there is an error, display message
  if (!data) {
    return <div>Error: No drink data found!</div>;
  }

  return (
    <>
      <div style={{ width: "62%" }}>
        <h1>{data.name || "Cà phê Cappuccino"}</h1>
        <Flex gap={16} vertical>
          <Flex gap={10} align="center">
            <Switch
              checked={expanded}
              onChange={() => setExpanded((c) => !c)}
              style={{ flex: "none" }}
            />
            <Slider
              min={1}
              max={20}
              value={rows}
              onChange={setRows}
              style={{ flex: "auto" }}
            />
          </Flex>

          <Typography.Paragraph
            ellipsis={{
              rows,
              expandable: false,
              expanded,
              onExpand: (_, info) => setExpanded(info.expanded),
            }}
            copyable
          >
            {data.description || "Description of the drink will appear here."}
            <div>
              {data.descriptionMore || "Additional details about the drink."}
            </div>
          </Typography.Paragraph>
        </Flex>
      </div>
      <div style={{ marginLeft: "200px" }}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt={data.name || "Cà phê Cappuccino"}
              src={
                data.imageUrl ||
                "https://www.highlandscoffee.com.vn/vnt_upload/product/04_2023/New_product/HLC_New_logo_5.1_Products__CAPPUCINO.jpg"
              }
            />
          }
        >
          <Meta
            title={data.name || "Cà phê Cappuccino"}
            description={`Giá: ${data.price || "65,000 VNĐ"}`}
          />
        </Card>
      </div>
    </>
  );
};

export default DrinkComponentTest;

// import React, { useEffect, useState } from "react";
// import { Spin, Card, Typography, Switch, Slider } from "antd";
// import { sendRequest } from "@/utils/api"; // Đảm bảo đây là đúng đường dẫn

// interface IDrink {
//   id: string;
//   name: string;
//   description?: string;
//   descriptionMore?: string;
//   details?: string;
//   imageUrl?: string;
//   price?: string;
// }

// const DrinkComponentTest = ({ drink }: { drink: string }) => {
//   const [data, setData] = useState<IDrink | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState(false);
//   const [rows, setRows] = useState(2);

//   // useEffect(() => {
//   //   const fetchDrinkData = async () => {
//   //     setLoading(true);
//   //     try {
//   //       const res = await sendRequest<IBackendRes<IDrink>>({
//   //         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/get-detail-drink-by-name`,
//   //         method: "POST",
//   //         body: { name: drink }, // Gửi tên đồ uống vào body
//   //       });

//   //       if (res?.data) {
//   //         setData(res.data);
//   //       } else {
//   //         setData(null);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //       setData(null);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   if (drink) {
//   //     fetchDrinkData();
//   //   }
//   // }, [drink]);
//   useEffect(() => {
//     const fetchDrinkData = async () => {
//       setLoading(true);
//       console.log("Fetching data for drink:", drink); // Debugging drink value
//       try {
//         const res = await sendRequest<IBackendRes<IDrink>>({
//           url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/get-detail-drink-by-name`,
//           method: "POST",
//           body: { name: drink }, // Gửi tên đồ uống vào body
//         });

//         console.log("Received response:", res); // Debugging API response

//         if (res?.data) {
//           setData(res.data);
//         } else {
//           setData(null);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (drink) {
//       fetchDrinkData();
//     }
//   }, [drink]);

//   if (loading) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (!data) {
//     return <div>Error: No drink data found!</div>;
//   }

//   return (
//     <>
//       <div style={{ width: "62%" }}>
//         <h1>{data.name || "Cà phê Cappuccino"}</h1>
//         <Typography.Paragraph
//           ellipsis={{
//             rows,
//             expandable: true,
//             onExpand: (_, info) => setExpanded(info.expanded),
//           }}
//           copyable
//         >
//           {data.description || "Mô tả đồ uống sẽ xuất hiện tại đây."}
//           <div>{data.descriptionMore || "Thông tin chi tiết về đồ uống."}</div>
//         </Typography.Paragraph>
//         <Switch checked={expanded} onChange={() => setExpanded(!expanded)} />
//         <Slider min={1} max={20} value={rows} onChange={setRows} />
//       </div>

//       <div style={{ marginLeft: "200px" }}>
//         <Card
//           hoverable
//           style={{ width: 240 }}
//           cover={
//             <img
//               alt={data.name || "Cà phê Cappuccino"}
//               src={data.imageUrl || "default_image_url"}
//             />
//           }
//         >
//           <Card.Meta
//             title={data.name || "Cà phê Cappuccino"}
//             description={`Giá: ${data.price || "65,000 VNĐ"}`}
//           />
//         </Card>
//       </div>
//     </>
//   );
// };

// export default DrinkComponentTest;
