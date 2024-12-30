import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout } from "antd";

const { Content } = Layout;

const HomeContent = () => {
  const [selectedItem, setSelectedItem] = useState<string>(""); // Trạng thái để lưu item được chọn
  const [categories, setCategories] = useState<
    { label: string; link: string }[]
  >([
    { label: "Menu", link: "/" }, // Phần Menu mặc định
  ]);

  // Mảng tên các món nước cho mục chính và mục con
  const drinksMenu = [
    ["Cà phê Phin", "Cà phê Latte", "Cà phê Macchiato", "Cà phê Cappuccino"], // Nhóm 1
    ["Trà xanh", "Trà ô long", "Trà hoa cúc", "Trà thảo mộc"], // Nhóm 2
    ["Sinh tố bơ", "Sinh tố nho", "Sinh tố dâu tây", "Sinh tố việt quất"], // Nhóm 3
  ];

  // Mảng tên món nước cho mục chính (Menu)
  const mainMenuNames = ["Cà phê", "Trà", "Sinh tố"];

  // Hàm gọi khi nhấn vào món nước
  const handleCategoryClick = (category: string, menuName: string) => {
    setCategories([
      { label: "Menu", link: "/" }, // Luôn giữ phần Menu
      { label: menuName, link: `/${menuName.toLowerCase()}` }, // Menu chính (Cà phê, Trà, Sinh tố)
      { label: category, link: `/${category.toLowerCase()}` }, // Món nước cụ thể
    ]);
  };

  // Hàm xử lý khi nhấn vào một món trong menu
  const handleMenuClick = (key: string) => {
    const [mainMenuIndex, subMenuIndex] = key.split("_").map(Number);
    const drink = drinksMenu[mainMenuIndex]?.[subMenuIndex];
    const menuName = mainMenuNames[mainMenuIndex];
    if (drink && menuName) {
      setSelectedItem(key); // Cập nhật item được chọn
      handleCategoryClick(drink, menuName); // Cập nhật breadcrumb
    }
  };

  // Render nội dung dựa trên món được chọn
  const renderContent = () => {
    if (!selectedItem)
      return <div>Chào Mừng bạn đến với Thành Đạt Coffee!</div>;

    const [mainMenuIndex, subMenuIndex] = selectedItem.split("_").map(Number);
    const drink = drinksMenu[mainMenuIndex]?.[subMenuIndex];

    return drink ? <div>{drink}</div> : <div>Không có lựa chọn nào.</div>;
  };

  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        {/* Breadcrumb sẽ chứa 3 mục */}
        <Breadcrumb style={{ margin: "16px 0" }}>
          {categories.map((category, index) => (
            <Breadcrumb.Item key={index}>
              <a href={category.link}>{category.label}</a>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>

        {/* Render nội dung theo item được chọn */}
        {renderContent()}

        {/* Menu với các mục con */}
        <div>
          <button onClick={() => handleMenuClick("0_0")}>Cà phê Phin</button>
          <button onClick={() => handleMenuClick("0_1")}>Cà phê Latte</button>
          <button onClick={() => handleMenuClick("1_0")}>Trà xanh</button>
          <button onClick={() => handleMenuClick("2_3")}>
            Sinh tố việt quất
          </button>
        </div>
      </Content>
    </Layout>
  );
};

export default HomeContent;
