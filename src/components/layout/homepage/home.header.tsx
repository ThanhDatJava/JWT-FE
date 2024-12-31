// "use client";

// import { Layout, Menu } from "antd";
// import React from "react";

// import type { MenuProps } from "antd";

// const HomeHeader = (props: any) => {
//   const { session } = props;

//   const { Header } = Layout;

//   const items1: MenuProps["items"] = ["Menu", "Rewards", "Order"].map(
//     (key) => ({
//       key,
//       label: `  ${key}`,
//     })
//   );

//   return (
//     <>
//       <Header style={{ display: "flex", alignItems: "center" }}>
//         <div className="demo-logo" />
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           defaultSelectedKeys={["2"]}
//           items={items1}
//           style={{ flex: 1, minWidth: 0 }}
//         />
//       </Header>
//     </>
//   );
// };

// export default HomeHeader;

"use client";

import { Layout, Menu, Avatar, Dropdown } from "antd";
import React from "react";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import logo from "../../../assets/img/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HomeHeaderProps {
  menuClickRender: (menuKey: string) => void; // Hàm callback để gửi dữ liệu về cha
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ menuClickRender }) => {
  const { Header } = Layout;
  const router = useRouter();

  // Items for the menu
  const items1: MenuProps["items"] = ["Home", "Menu", "Rewards", "Order"].map(
    (key) => ({
      key,
      label: ` ${key}`,
    })
  );

  // Hàm xử lý sự kiện khi click vào menu item
  const handleMenuClick = (e: { key: string }) => {
    // Gọi hàm callback từ props để gửi dữ liệu về component cha
    if (menuClickRender) {
      menuClickRender(e.key); // Gửi key của menu item đã click về cha
    }
  };
  const handleClickLogoHome = () => {
    router.push("/");
  };

  // // Dropdown menu cho User Info
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="logout">
        <a href="/logout">Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div className="demo-logo">
        <Image
          src={logo}
          alt="Logo"
          height={170}
          width={200}
          onClick={handleClickLogoHome}
        />
      </div>
      {/* Ant Design Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["Menu"]}
        items={items1}
        style={{ flex: 1, minWidth: 0 }}
        onClick={handleMenuClick}
      />

      {/* User Info with Dropdown */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 10, color: "white" }}>Welcome</span>

        <Dropdown overlay={userMenu} trigger={["click"]}>
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<DownOutlined />}
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default HomeHeader;
