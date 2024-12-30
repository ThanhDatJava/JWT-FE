"use client";
import { Layout } from "antd";

const HomeFooter = () => {
  const { Footer } = Layout;

  return (
    <>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} Created by @Thành Đạt
      </Footer>
    </>
  );
};

export default HomeFooter;
