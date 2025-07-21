import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const DailyOverviewChart = () => {
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      tv: "12k",
      amt: 10,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      tv: 1200,
      amt: 20,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      tv: 1200,
      amt: 30,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      tv: 1200,
      amt: 40,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      tv: 1200,
      amt: 50,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      tv: 1200,
      amt: 60,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 4300,
      tv: 1200,
      amt: 70,
    },
    {
      name: "Aug",
      uv: 3490,
      pv: 4300,
      tv: 1200,
      amt: 80,
    },
    {
      name: "Sep",
      uv: 3490,
      pv: 4300,
      tv: 1200,
      amt: 90,
    },
    {
      name: "Oct",
      uv: 3490,
      pv: 4300,
      tv: 1200,
      amt: 100,
    },
    {
      name: "Nov",
      uv: 3490,
      pv: 4300,
      tv: 1200,
      amt: 110,
    },
    {
      name: "Dec",
      uv: 3490,
      pv: 4300,
      tv: 1200,
      amt: 120,
    },
  ];

  const [year, setYear] = useState(2024);

  const items = [
    {
      label: 2023,
      key: "2023",
    },
    {
      label: 2024,
      key: "2024",
    },
    {
      label: 2025,
      key: "2025",
    },
    {
      label: 2026,
      key: "2026",
    },
  ];

  const onClick = ({ key }) => {
    setYear(key);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            fontWeight: "500",
            color: "#555555",
          }}
        >
          Total donors statistics
        </p>
        <Dropdown menu={{ items, onClick }}>
          <p
            style={{
              // width: "79px",
              cursor: "pointer",
              color: "#717171",
              border: "1px solid #E9E9E9",
              borderRadius: "4px",
              padding: "4px 12px",
            }}
            onClick={(e) => e.preventDefault()}
          >
            {year}
            <DownOutlined style={{ paddingLeft: "18px" }} color="#717171" />
          </p>
        </Dropdown>
      </div>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart data={data} barGap={100}>
          <CartesianGrid horizontal vertical={false} />
          <XAxis
            dataKey="name"
            padding="gap"
            minTickGap={2}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <YAxis
            tickCount={15}
            width={40}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <Tooltip />
          <Line
            connectNulls
            type="linear"
            dataKey="uv"
            stroke="#DBB162"
            fill="#8E3C50"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyOverviewChart;
