"use client";
import React, { useEffect, useState } from "react";
import { Layout, Spin, message } from "antd";

import HomeFooter from "./homepage/home.footer";
import HomeHeader from "./homepage/home.header";
import HomeContent from "./homepage/home.content";
import { HomeContextProvider } from "@/library/home.context";

const HomePage = () => {
  const [dataMenu, setDataMenu] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedMenu, setSelectedMenu] = useState("");

  // Hàm callback để nhận dữ liệu từ HomeHeader
  const handleMenuClick = (menuKey: string) => {
    setSelectedMenu(menuKey); // Cập nhật trạng thái với menu đã chọn
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/get-list-drink`
      );
      const listDrinks = await response.json();
      setDataMenu(listDrinks);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load drinks data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div style={{ padding: 20 }}>
      <HomeContextProvider>
        <Layout>
          <HomeHeader menuClickRender={handleMenuClick} />
          <HomeContent dataMenu={dataMenu} selectedMenu={selectedMenu} />
        </Layout>
        {/* <HomeFooter /> */}
      </HomeContextProvider>
    </div>
  );
};

export default HomePage;
