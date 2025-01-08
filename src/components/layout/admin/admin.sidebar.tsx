"use client";

import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
  AppstoreOutlined,
  HomeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import { AdminContext } from "@/library/admin.context";
import type { MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];
const AdminSideBar = () => {
  const router = useRouter();
  const { Sider } = Layout;
  const { collapseMenu } = useContext(AdminContext)!;

  const handleMenuClick = (e: { key: string }) => {
    const routes: Record<string, string> = {
      "Manage home": "/dashboard/homepage/home",
      "Manage Menu": "/dashboard/homepage/menu",
      "Manage Rewards": "/dashboard/homepage/rewards",
      "Manage Order": "/dashboard/homepage/order",
    };

    const route = routes[e.key];
    if (route) {
      router.push(route);
    }
  };

  const items: MenuItem[] = [
    {
      key: "grp",
      label: "Thành Đạt",
      type: "group",
      children: [
        {
          key: "dashboard",
          label: <Link href="/dashboard">Dashboard</Link>,
          icon: <AppstoreOutlined />,
        },
        {
          key: "users",
          label: <Link href="/dashboard/user">Manage Users</Link>,
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
                  key: "Manage home",
                  label: "Manage home",
                },
              ],
            },
            {
              key: "g2",
              type: "group",
              children: [
                {
                  key: "Manage Menu",
                  label: "Manage Menu",
                },
              ],
            },
            {
              key: "g3",
              type: "group",
              children: [
                {
                  key: "Manage Rewards",
                  label: "Manage Rewards",
                },
              ],
            },
            {
              key: "g4",
              type: "group",
              children: [
                {
                  key: "Manage Order",
                  label: "Manage Order",
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
        onClick={handleMenuClick} // Xử lý sự kiện click tại đây
      />
    </Sider>
  );
};

export default AdminSideBar;
