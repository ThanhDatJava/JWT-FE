"use client";

import { Button, Table } from "antd";

// Define the interface for the data
interface MenuItem {
  key: string;
  name: string;
  price: string;
  drink: string;
}

const ManageMenuPage = () => {
  // Sample data using the defined interface
  const dataSource: MenuItem[] = [
    {
      key: "1",
      name: "Mike",
      price: "$32",
      drink: "Coca",
    },
    {
      key: "2",
      name: "John",
      price: "$42",
      drink: "Pepsi",
    },
  ];

  // Columns for the table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Drink",
      dataIndex: "drink",
      key: "drink",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: MenuItem) => (
        <span>
          <Button
            onClick={() => handleEdit(record)}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Button onClick={() => handleDelete(record)} danger>
            Xóa
          </Button>
        </span>
      ),
    },
  ];

  // Handle "Edit"
  const handleEdit = (record: MenuItem) => {
    console.log("Sửa", record);
    // Add logic for editing, e.g., open modal with record data
  };

  // Handle "Delete"
  const handleDelete = (record: MenuItem) => {
    console.log("Xóa", record);
    // Add logic for deleting, e.g., remove item from dataSource
  };

  return (
    <div>
      <h1>Manage Menu Page</h1>
      <Table dataSource={dataSource} columns={columns} rowKey="key" />
    </div>
  );
};

export default ManageMenuPage;
