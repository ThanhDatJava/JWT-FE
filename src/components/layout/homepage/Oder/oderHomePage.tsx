import React from "react";
import { Table } from "antd";

// Define the type for the order data
interface Order {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

// Fake data for orders
const orders: Order[] = [
  { id: 1, productName: "Sản phẩm A", quantity: 2, price: 150 },
  { id: 2, productName: "Sản phẩm B", quantity: 1, price: 200 },
  { id: 3, productName: "Sản phẩm C", quantity: 5, price: 100 },
];

// Table columns configuration
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    render: (price: number) => `${price} VND`, // Type price as number
  },
  {
    title: "Tổng tiền",
    dataIndex: "total",
    key: "total",
    render: (text: any, record: Order) =>
      `${record.quantity * record.price} VND`, // Type record as Order
  },
];

// OrderHomePage component
const OrderHomePage = () => {
  // Container and title styling
  const containerStyle = {
    margin: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "20px",
  };

  const titleStyle = {
    color: "#333",
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  };

  return (
    <div>
      <h2>Danh sách đơn hàng</h2>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id" // Ensure unique key for each row
      />
    </div>
  );
};

export default OrderHomePage;
