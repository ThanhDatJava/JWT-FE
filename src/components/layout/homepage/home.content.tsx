import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { FaCoffee, FaLeaf } from "react-icons/fa";
import { GiStrawberry } from "react-icons/gi";

import DrinkComponentTest from "./Drink/drinkComponentTest";
import DefaultHomePage from "./DefaultHomePage/defaultHomePage";
import RewardsHomePage from "./Rewards/rewardsHomePage";
import OrderHomePage from "./Oder/oderHomePage";

interface HomePageProps {
  dataMenu: any;
  selectedMenu: any;
}
const HomeContent: React.FC<HomePageProps> = ({ dataMenu, selectedMenu }) => {
  const { Content } = Layout;
  const [selectedItem, setSelectedItem] = useState<string>("");
  useEffect(() => {
    if (selectedItem) {
      const itemInfo = getMenuItemInfo(selectedItem);

      const { drink, menuName } = itemInfo;

      if (drink && menuName) {
        setCategories([
          { label: "Menu", link: "/" },
          { label: menuName, link: `/${menuName.toLowerCase()}` },
          { label: drink, link: `/${drink.toLowerCase()}` },
        ]);
      } else {
        console.error(
          "Missing drink or menuName in selectedItem",
          selectedItem
        );
      }
    }
  }, [selectedItem]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [categories, setCategories] = useState<
    { label: string; link: string }[]
  >([{ label: "Menu", link: "/" }]);

  const mainMenuNames =
    dataMenu?.data && typeof dataMenu.data === "object"
      ? Object.keys(dataMenu.data)
      : [];

  const coffeeDrinks = dataMenu?.data?.Coffee || [];
  const TeaDrinks = dataMenu?.data?.Tea || [];
  const CakeDrinks = dataMenu?.data?.Cake || [];

  const drinksMenu = [coffeeDrinks, TeaDrinks, CakeDrinks];

  const drinkComponents: { [key: string]: React.ElementType } = {
    ...coffeeDrinks.reduce((acc: any, coffeeName: any) => {
      acc[coffeeName] = DrinkComponentTest;
      return acc;
    }, {}),

    ...TeaDrinks.reduce((acc: any, teaName: any) => {
      // Thêm phần cho trà
      acc[teaName] = DrinkComponentTest;
      return acc;
    }, {}),
    ...CakeDrinks.reduce((acc: any, cakeName: any) => {
      // Thêm phần cho trà
      acc[cakeName] = DrinkComponentTest;
      return acc;
    }, {}),
    // Thêm các loại đồ uống khác nếu cần
  };

  const items: MenuProps["items"] = [FaCoffee, FaLeaf, GiStrawberry].map(
    (icon, index) => {
      const menuItems = Array.isArray(drinksMenu[index])
        ? drinksMenu[index]
        : []; // Ensure it's an array

      const key = String(index);

      const label = mainMenuNames[index] || `Category ${index + 1}`;

      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label,
        children: menuItems.map((drink, subIndex) => ({
          key: `${key}_${subIndex}`,
          label: drink,
        })),
      };
    }
  );

  const getMenuItemInfo = (key: string) => {
    const [mainMenuIndex, subMenuIndex] = key.split("_").map(Number);

    if (drinksMenu[mainMenuIndex] && drinksMenu[mainMenuIndex][subMenuIndex]) {
      const drink = drinksMenu[mainMenuIndex][subMenuIndex];
      const menuName = mainMenuNames[mainMenuIndex];

      return { drink, menuName };
    }

    return { drink: null, menuName: null }; // Return null if not found
  };

  const handleMenuClick = (key: string) => {
    const { drink, menuName } = getMenuItemInfo(key);
    if (drink && menuName) {
      setSelectedItem(key);
      setCategories([
        { label: "Menu", link: "/" },
        { label: menuName, link: `/${menuName.toLowerCase()}` },
        { label: drink, link: `/${drink.toLowerCase()}` },
      ]);
    }
  };

  const renderContent = () => {
    if (!selectedItem) {
      return <div>Chào Mừng bạn đến với Thành Đạt Coffee!</div>;
    }

    const { drink, menuName } = getMenuItemInfo(selectedItem);

    const DrinkComponent = drinkComponents[drink];

    // Nếu không có component cho món uống, trả về thông báo lỗi
    if (!DrinkComponent) {
      return <div>Không có thông tin cho món {drink}.</div>;
    }

    return <DrinkComponent drink={drink} />;
  };

  return (
    <>
      {/* {!["Menu", "Rewards", "Order"].includes(selectedMenu) && (
        <div style={{ marginTop: "20px" }}>
          <DefaultHomePage />
        </div>
      )} */}
      {(selectedMenu === "Home" ||
        !["Menu", "Rewards", "Order"].includes(selectedMenu)) && (
        <div style={{ marginTop: "20px" }}>
          <DefaultHomePage />
        </div>
      )}

      {selectedMenu === "Menu" && (
        <Content style={{ padding: "0 48px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {categories.map((category, index) => (
              <Breadcrumb.Item key={index}>
                <a href={category.link}>{category.label}</a>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>

          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                selectedKeys={[selectedItem]}
                defaultOpenKeys={["sub0"]}
                style={{ height: "100%" }}
                items={items}
                onClick={(e) => handleMenuClick(e.key)}
              />
            </Sider>

            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {renderContent()}
            </Content>
          </Layout>
        </Content>
      )}

      {selectedMenu === "Rewards" && <RewardsHomePage />}

      {selectedMenu === "Order" && <OrderHomePage />}
    </>
  );
};

export default HomeContent;
