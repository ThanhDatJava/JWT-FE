"use client";
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
  AppstoreOutlined,
  HomeOutlined,
  MailOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import { AdminContext } from "@/library/admin.context";
import type { MenuProps } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];
const AdminSideBar = () => {
  const { Sider } = Layout;
  const { collapseMenu } = useContext(AdminContext)!;

  const items: MenuItem[] = [
    {
      key: "grp",
      label: "Thành Đạt",
      type: "group",
      children: [
        {
          key: "dashboard",
          label: <Link href={"/dashboard"}>Dashboard</Link>,
          icon: <AppstoreOutlined />,
        },
        {
          key: "users",
          label: <Link href={"/dashboard/user"}>Manage Users</Link>,
          icon: <TeamOutlined />,
        },
        {
          key: "sub1",
          label: "Manage Page",
          icon: <HomeOutlined />,
          children: [
            {
              key: "g1",
              type: "group",
              children: [
                {
                  key: "1",
                  label: (
                    <Link href={"/dashboard/homepage/home"}>Manage home</Link>
                  ),
                },
              ],
            },
            {
              key: "g2",
              type: "group",
              children: [
                {
                  key: "2",
                  label: (
                    <Link href={"/dashboard/homepage/menu"}>Manage Menu</Link>
                  ),
                },
              ],
            },
            {
              key: "g3",
              type: "group",
              children: [
                {
                  key: "3",
                  label: (
                    <Link href={"/dashboard/homepage/rewards"}>
                      Manage Rewards
                    </Link>
                  ),
                },
              ],
            },
            {
              key: "g4",
              type: "group",
              children: [
                {
                  key: "4",
                  label: (
                    <Link href={"/dashboard/homepage/oder"}>Manage Oder </Link>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <Sider collapsed={collapseMenu}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={items}
        style={{ height: "100vh" }}
      />
    </Sider>
  );
};

export default AdminSideBar;
