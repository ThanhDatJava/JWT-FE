"use client";

import React, { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { sendRequest } from "@/utils/api";
import { ObjectId } from "mongodb";
import ModalEditHomepage from "@/components/modal/modal.edit.homepage";
import ModalDeleteHomepage from "@/components/modal/modal.delete.homepage";
import ModalCreateHomepage from "@/components/modal/modal.create.homepage";

interface DataType {
  _id: ObjectId;
  key: string; // Ensure key is a string type
  title: string;
  description: string; // Ensure description is a string
  image: string;
}

interface IBackendRes<T> {
  data: T;
}

const ManageHomePage: React.FC = () => {
  const [dataDetailHomepage, setDataDetailHomepage] = useState<DataType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [titleFilters, setTitleFilters] = useState<any[]>([]);

  // Define the fetchData function inside the component
  const fetchData = async () => {
    try {
      const res = await sendRequest<IBackendRes<DataType[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/get-list-detail-homepage`,
        method: "GET",
      });

      if (res.data && Array.isArray(res.data)) {
        setDataDetailHomepage(res.data);

        const titles: string[] = res.data
          .filter(
            (item) =>
              item.title &&
              typeof item.title === "string" &&
              item.title.trim() !== ""
          )
          .map((item) => item.title);

        if (titles.length > 0) {
          const uniqueTitles = Array.from(new Set(titles));
          const filters = uniqueTitles.map((title) => ({
            text: title,
            value: title,
          }));
          setTitleFilters(filters);
        }
      }

      console.log("API Response:", res.data);
    } catch (err) {
      console.error("Error fetching homepage details:", err);
      setError("Failed to fetch data");
      message.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      filters: titleFilters, // Dynamically added filters
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.title.includes(value as string),
      width: "30%",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="image"
          style={{ width: "100px", height: "auto" }}
        />
      ),
      width: "40%",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <>
          <Button className="btn-modal-edit">
            <ModalEditHomepage record={record} fetchData={fetchData} />
          </Button>
          <Button className="btn-modal-edit">
            <ModalDeleteHomepage record={record} fetchData={fetchData} />
          </Button>
        </>
      ),
      width: "40%",
    },
  ];

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        Manage Homepage
      </h1>
      <div>
        <ModalCreateHomepage fetchData={fetchData} />
      </div>
      <div style={{ width: "70%" }}>
        <Table<DataType>
          columns={columns}
          dataSource={dataDetailHomepage}
          onChange={onChange}
          rowKey="key"
        />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </div>
    </>
  );
};

export default ManageHomePage;
